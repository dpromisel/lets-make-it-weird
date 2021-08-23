import { Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "../providers/AuthProvider";
import {
  getMutuals,
  getRelationship,
  TwitterUser,
  userSwipe,
} from "../Twitter";
import { getTempStorage } from "../util";
import { Navigate, Route, Routes } from "react-router-dom";
import Background from "./Background";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ClearIcon from "@material-ui/icons/Clear";
import Match from "./Match";
import UserCard from "./user/CustomCard";

function SwiperView({
  user,
  swipe,
}: {
  user: TwitterUser;
  swipe: (swipe: "like" | "dislike") => void;
}) {
  return (
    <Background>
      <Grid
        direction="column"
        container
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
          <UserCard user={user} />
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
              onClick={() => swipe("dislike")}
              style={{ backgroundColor: "#F229A2" }}
            >
              <ClearIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              aria-label="like"
              onClick={() => swipe("like")}
              style={{ backgroundColor: "#F229A2" }}
            >
              <FavoriteIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Background>
  );
}

export default SwiperView;
