import { Grid } from "@material-ui/core";
import React from "react";
import { HeartSpinner } from "react-spinners-kit";
import Background from "./Background";

function Loading() {
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
          <HeartSpinner color="#1DA1F2" size={100} />
        </Grid>
      </Grid>
    </Background>
  );
}

export default Loading;
