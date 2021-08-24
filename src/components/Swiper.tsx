import { Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../providers/AuthProvider";
import { getRelationship, TwitterUser, userSwipe } from "../Twitter";
import { getTempStorage } from "../util";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Background from "./Background";
import Match from "./Match";
import SwiperView from "./SwiperView";

function Swiper({
  profiles,
  swipes,
  fetchMore,
}: {
  profiles: {
    target: TwitterUser;
    mutuals: boolean;
    likesBack: boolean;
    canDm: boolean;
  }[];
  swipes: number;
  fetchMore: () => void;
}) {
  const navigate = useNavigate();
  const { hasShared } = useContext(AuthContext);
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(swipes);

  useEffect(() => {
    setIndex(0);
  }, [profiles]);

  useEffect(() => {
    if (!profiles[index]) {
      incrementCur();
    }
  }, [index]);

  const incrementCur = () => {
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    } else {
      fetchMore();
    }
  };

  const swipe = useMutation(
    async (action: "like" | "dislike") => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        await userSwipe(token, secret, profiles[index].target.id_str, action);
      }
    },
    {
      onSettled: (a, b, v) => {
        if (v === "like") {
          navigate("/swipe/match");
        } else {
          incrementCur();
        }
        setCount(count + 1);
      },
    }
  );

  return (
    <Routes>
      <Route
        path="/match"
        element={<Match match={profiles[index].target} moveOn={incrementCur} />}
      />
      <Route
        path="/"
        element={
          profiles[index].target ? (
            count > 10 && !hasShared ? (
              <Navigate to="/share" />
            ) : (
              <SwiperView user={profiles[index].target} swipe={swipe.mutate} />
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
