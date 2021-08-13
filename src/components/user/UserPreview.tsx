import { Button, Grid, Icon } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tweet, TwitterUser } from "../../Twitter";
import CustomCard from "./CustomCard";
import Background from "../Background";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
function UserPreview({ user }: { user: TwitterUser }) {
  const navigate = useNavigate();
  return (
    <Background>
      <Grid
        direction="column"
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
        }}
      >
        <Grid item direction="row" container spacing={10}>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: "100px" }} className="font-face-gm">
              <span style={{ color: "#F22FA5" }}>This </span>
              <span style={{ color: "#FF7A00" }}>is </span>
              <span style={{ color: "#C2F743" }}>what </span>
              <span style={{ color: "#1DA1F2" }}>you </span>
              <span style={{ color: "#9F1BC4" }}>will </span>
              <span style={{ color: "#FFE600" }}>look </span>
              <span style={{ color: "#FF7A00" }}>like </span>
              <span style={{ color: "#FFE600" }}>to </span>
              <span style={{ color: "#F22FA5" }}>others</span>
              <span style={{ color: "#1DA1F2" }}>. </span>
            </p>
          </Grid>
          <Grid item xs={12} md={6} direction="column" container spacing={3}>
            <Grid item>
              <CustomCard user={user} />
            </Grid>
            <Grid item>
              {" "}
              <Button
                variant="contained"
                onClick={() => navigate("/match")}
                endIcon={<ArrowRightAltIcon />}
                style={{
                  backgroundColor: "#1DA1F2",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Lookin' cute.
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Background>
  );
}

export default UserPreview;
