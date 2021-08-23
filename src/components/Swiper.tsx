import { Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "../providers/AuthProvider";
import { getRelationship, userSwipe } from "../Twitter";
import { getTempStorage } from "../util";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Background from "./Background";
import Match from "./Match";
import SwiperView from "./SwiperView";

function Swiper({
  profileIds,
  swipes,
}: {
  profileIds: string[];
  swipes: number;
}) {
  const navigate = useNavigate();
  const { hasShared } = useContext(AuthContext);
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(swipes);
  const [match, setMatch] = useState<boolean>(true);

  const safeIncrement = () => {
    if (index < profileIds.length - 1) {
      setIndex(index + 1);
    } else if (index > 0) {
      setIndex(index - 1);
    }
  };

  const { data } = useQuery(["relationship", profileIds[index]], async () => {
    if (profileIds[index]) {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        const data = await getRelationship(token, secret, profileIds[index]);
        if (data.mutuals && data.target) {
          return data;
        } else {
          safeIncrement();
        }
      }
    }
  });

  const swipe = useMutation(
    async (action: "like" | "dislike") => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        await userSwipe(token, secret, profileIds[index].toString(), action);
      }
    },
    {
      onSettled: (a, b, v) => {
        if (v === "like") {
          navigate("/swipe/match");
        } else {
          safeIncrement();
        }
        setCount(count + 1);
      },
    }
  );

  return (
    <Routes>
      <Route
        path="/match"
        element={<Match match={data?.target} moveOn={safeIncrement} />}
      />
      <Route
        path="/"
        element={
          data ? (
            count > 10 && !hasShared ? (
              <Navigate to="/share" />
            ) : (
              <SwiperView user={data.target} swipe={swipe.mutate} />
            )
          ) : (
            <Background>
              <> </>
            </Background>
          )
        }
      />
    </Routes>
  );
}

export default Swiper;
