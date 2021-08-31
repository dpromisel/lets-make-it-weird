import { Button, CircularProgress, Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { checkIfShared } from "../Twitter";
import { getTempStorage } from "../util";
import Background from "./Background";
import HeartRight from "../heart_r.png";
import HeartLeft from "../heart_left.png";

function Share() {
  const text = "Mic check mic check @shotsonclub";
  const qc = useQueryClient();
  const { hasShared } = useContext(AuthContext);

  useQuery(
    ["shared"],
    async () => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");
      if (token && secret) {
        await checkIfShared(token, secret);
      }
    },
    {
      onSettled: () => qc.invalidateQueries("user"),
    }
  );

  if (hasShared) {
    return <Navigate to="/swipe" />;
  }

  return (
    <Background>
      <Grid
        container
        direction="column"
        style={{ height: "100vh", backgroundColor: "black" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <h2 style={{ color: "white", fontSize: "28px" }}>
            You've swiped through your first 5 mutuals.
          </h2>
        </Grid>
        <Grid item>
          <p style={{ fontSize: "80px" }} className="font-face-gm">
            <span style={{ color: "#C2F743" }}>Want </span>
            <span style={{ color: "#1DA1F2" }}>to </span>
            <span style={{ color: "#F22FA5" }}>unlock </span>
            <span style={{ color: "#FF7A00" }}>more</span>
            <span style={{ color: "#FFE600" }}>?</span>
          </p>
        </Grid>

        <Grid
          item
          container
          direction="row"
          style={{ width: "100vw" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img src={HeartLeft} style={{ marginTop: "50px" }} />
          </Grid>
          <Grid item>
            <Button
              style={{ backgroundColor: "#1DA1F2", color: "white" }}
              variant="contained"
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${text}`);
              }}
            >
              Share to Twitter
            </Button>
          </Grid>

          <Grid item>
            <img src={HeartRight} style={{ marginTop: "50px" }} />
          </Grid>
        </Grid>
      </Grid>
      {/* <header className="App-header">
        <h2>You're out of swipes, share to twitter to continue!.</h2>
        
        <br />

        <Button
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          variant="contained"
          onClick={() => refreshShared.mutate()}
        >
          Ok I Shared
        </Button>

        {refreshShared.isLoading && <CircularProgress />}
      </header> */}
    </Background>
  );
}

export default Share;
