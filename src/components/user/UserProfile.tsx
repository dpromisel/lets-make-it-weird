import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tweet, TwitterUser } from "../../Twitter";
import UserCard from "./UserCard";
import Background from "./background.png";
import CustomCard from "./CustomCard";

function UserProfile({ user, tweets }: { user: TwitterUser; tweets: Tweet[] }) {
  const navigate = useNavigate();
  return (
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
      <Grid item>
        {/* <UserCard user={user} /> */}
        <CustomCard user={user} tweets={tweets} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => navigate("/match")}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
        >
          looks good to me
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
