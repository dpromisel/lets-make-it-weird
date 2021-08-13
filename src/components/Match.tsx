import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "../providers/AuthProvider";
import { getMutuals, userSwipe } from "../Twitter";
import { getTempStorage } from "../util";
import { useQueryClient } from "react-query";
import { Link, Navigate } from "react-router-dom";
import Background from "./Background";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ClearIcon from "@material-ui/icons/Clear";
function Match() {
  const { user, hasShared } = useContext(AuthContext);
  const [index, setIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    "match",
    async () => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret && user.screen_name) {
        return await getMutuals(token, secret, user.screen_name);
      }
    },
    { onSuccess: (d) => setCount(d.likes.length + d.dislikes.length) }
  );

  const swipe = useMutation(
    async (action: "like" | "dislike") => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        await userSwipe(token, secret, data.unswiped[index].toString(), action);
      }
    },
    {
      onSettled: () => {
        // queryClient.invalidateQueries("match");
        if (index < data.unswiped.length - 1) {
          setIndex(index + 1);
        } else if (index > 0) {
          setIndex(index - 1);
        }
        setCount(count + 1);
      },
    }
  );

  console.log(count, data?.unswiped.length);

  if (data) {
    if (count > 10 && !hasShared) {
      return <Navigate to="/share" />;
    } else if (data?.unswiped.length > 0) {
      return (
        <Background>
          <Grid
            direction="column"
            container
            // spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh" }}
          >
            <Grid item>
              <div style={{ fontSize: "80px" }} className="font-face-gm">
                <span style={{ color: "#FF7A00" }}>Hot </span>
                <span style={{ color: "#F22FA5" }}>or </span>
                <span style={{ color: "#1DA1F2" }}>Not </span>
              </div>
            </Grid>
            <Grid item>
              <MutualProfile
                userId={data.unswiped[index].toString()}
                onFail={() => {
                  if (index < data.unswiped.length - 1) {
                    setIndex(index + 1);
                  } else if (index > 0) {
                    setIndex(index - 1);
                  }
                }}
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              style={{ width: "100vw", paddingTop: 10 }}
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Fab
                  aria-label="like"
                  onClick={() => swipe.mutate("dislike")}
                  style={{ backgroundColor: "#F229A2" }}
                >
                  <ClearIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Fab
                  aria-label="like"
                  onClick={() => swipe.mutate("like")}
                  style={{ backgroundColor: "#F229A2" }}
                >
                  <FavoriteIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Background>
      );
    } else {
      return (
        <Background>
          <> Hmmm not seeing any mutuals... </>
        </Background>
      );
    }
  } else {
    return (
      <Background>
        <> Loading... </>
      </Background>
    );
  }
}

export default Match;
