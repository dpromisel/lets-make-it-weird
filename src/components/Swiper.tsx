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
  incrementCount,
}: {
  profiles: {
    target: TwitterUser;
    mutuals: boolean;
    likesBack: boolean;
    canDm: boolean;
  }[];
  swipes: number;
  fetchMore: () => void;
  incrementCount: () => void;
}) {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIndex(0);
    const hasProfile = profiles.some((prof: any) => prof !== false);
    if (!hasProfile) {
      if (!error) {
        fetchMore();
      }
      setError(true);
    } else {
      setError(false);
    }
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
        incrementCount();
      },
    }
  );

  if (error) {
    return (
      <Background>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <h1> Looks like we're having some load issues... </h1>
            <h2>
              {" "}
              The <i> nerds </i> have been notified. Please refresh or try again
              later.{" "}
            </h2>
          </Grid>
        </Grid>
      </Background>
    );
  }

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
            <SwiperView user={profiles[index].target} swipe={swipe.mutate} />
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
