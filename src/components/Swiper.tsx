import { Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const [next, setNext] = useState<number>(1);
  const [count, setCount] = useState<number>(swipes);
  const queryClient = useQueryClient();

  const incrementCur = () => {
    setIndex(next);
    incrementNext();
  };

  const incrementNext = () => {
    if (next < profileIds.length - 1) {
      setNext(next + 1);
    } else if (next > 0) {
      setNext(next - 1);
    }
  };

  const queryRelationship = async (id: string, onFail: () => void) => {
    if (id) {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        const data = await getRelationship(token, secret, id);
        if (data.mutuals && data.target) {
          return data;
        } else {
          onFail();
        }
      }
    }
  };

  useEffect(() => {
    const prefetchTodos = async () => {
      // The results of this query will be cached like a normal query
      await queryClient.prefetchQuery(["relationship", profileIds[next]], () =>
        queryRelationship(profileIds[next], incrementNext)
      );
    };

    prefetchTodos();
  }, [next]);

  const { data } = useQuery(
    ["relationship", profileIds[index]],
    () => queryRelationship(profileIds[index], incrementCur),
    { refetchOnWindowFocus: false, refetchOnReconnect: false }
  );

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
        element={<Match match={data?.target} moveOn={incrementCur} />}
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
