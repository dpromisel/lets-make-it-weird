import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TwitterUser } from "./TwitterAuth";
import UserCard from "./UserCard";

function UserProfile({ user }: { user: TwitterUser }) {
  const navigate = useNavigate();
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
        <UserCard user={user} />
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
