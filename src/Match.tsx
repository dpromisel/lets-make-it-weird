import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "./providers/AuthProvider";
import { getMutuals, userSwipe } from "./TwitterAuth";
import { getTempStorage } from "./util";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

function Match() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data } = useQuery("match", async () => {
    const token = getTempStorage("access_token");
    const secret = getTempStorage("access_secret");

    if (token && secret && user.screen_name) {
      return await getMutuals(token, secret, user.screen_name);
    }
  });

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
        queryClient.invalidateQueries("match");
      },
    }
  );

  if (data && data?.unswiped.length > 0) {
    return (
      <Grid
        direction="column"
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Link to="/likes">{data?.likes.length} Likes</Link> <br />
          <Link to="/dislikes">{data?.dislikes.length} Dislikes</Link>
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
          style={{ width: "100vw" }}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Button variant="contained" onClick={() => swipe.mutate("dislike")}>
              No Thanks!
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => swipe.mutate("like")}>
              Like
            </Button>
          </Grid>
        </Grid>
        {swipe.isLoading && (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    );
  } else {
    return (
      <> Hmmm not seeing any mutuals... it's possible we're loading them. </>
    );
  }
}

export default Match;
