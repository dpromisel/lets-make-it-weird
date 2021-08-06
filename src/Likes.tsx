import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "./providers/AuthProvider";
import { getMutuals } from "./TwitterAuth";
import { getTempStorage } from "./util";
import { Link } from "react-router-dom";

function Likes() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery("match", async () => {
    const token = getTempStorage("access_token");
    const secret = getTempStorage("access_secret");

    if (token && secret && user.screen_name) {
      return await getMutuals(token, secret, user.screen_name);
    }
  });

  if (data && data?.unswiped.length > 0) {
    return (
      <Grid
        direction="row"
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          container
          spacing={4}
        >
          <Grid item>
            <Link to="/match"> Continue Matching </Link> <br />
          </Grid>
          <Grid item>
            <Link to="/dislikes">{data?.dislikes.length} Dislikes</Link>
          </Grid>
        </Grid>

        {data.likes.map((id: any) => (
          <Grid item>
            <MutualProfile
              userId={id.toString()}
              onFail={() => console.log("failed")}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <> Loading... </>;
  }
}

export default Likes;
