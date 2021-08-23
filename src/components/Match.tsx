import { Avatar, Button, Grid } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { TwitterUser } from "../Twitter";
import Background from "./Background";
import HeartRight from "../heart_r.png";
import HeartLeft from "../heart_left.png";
import useWindowDimensions from "../useWindowDimensions";
import { Navigate, useNavigate } from "react-router";

function Match({ match, moveOn }: { match: TwitterUser; moveOn: () => void }) {
  const { width } = useWindowDimensions();
  const breakpoint = 700;

  if (match)
    if (width > breakpoint) {
      return <DesktopMatch match={match} moveOn={moveOn} />;
    } else return <MobileMatch match={match} moveOn={moveOn} />;
  else return <Navigate to="/swipe" />;
}

function DesktopMatch({
  match,
  moveOn,
}: {
  match: TwitterUser;
  moveOn: () => void;
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Background>
      <Grid
        container
        direction="column"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          {" "}
          <p
            style={{ fontSize: "80px", lineHeight: "80px" }}
            className="font-face-gm"
          >
            <span style={{ color: "#FFE600" }}>It's </span>
            <span style={{ color: "#FF7A00" }}>a </span>
            <span style={{ color: "#F22FA5" }}>match</span>
            <span style={{ color: "#1DA1F2" }}>!</span>
          </p>
        </Grid>
        <Grid item direction="row" container justifyContent="center">
          <Grid item>
            <img src={HeartLeft} style={{ marginTop: "50px" }} />
          </Grid>
          <Grid item>
            <Avatar
              src={user.profile_image_url.replace(/_normal\./, ".")}
              style={{ height: "30vh", width: "auto" }}
            />
          </Grid>
          <Grid item>
            {" "}
            <Avatar
              src={match.profile_image_url.replace(/_normal\./, ".")}
              style={{ height: "30vh", width: "auto" }}
            />
          </Grid>
          <Grid item>
            <img src={HeartRight} style={{ marginTop: "50px" }} />
          </Grid>
        </Grid>
        <Grid item>
          {" "}
          <h1> Lmao. Check Your DMs. </h1>{" "}
        </Grid>
        <Grid item>
          {" "}
          <Button
            variant="contained"
            onClick={() => {
              moveOn();
              navigate("/swipe");
            }}
            style={{
              backgroundColor: "#1DA1F2",
              color: "white",
              textTransform: "none",
              marginTop: 20,
            }}
          >
            Keep Swipin'
          </Button>
        </Grid>
      </Grid>
    </Background>
  );
}

function MobileMatch({
  match,
  moveOn,
}: {
  match: TwitterUser;
  moveOn: () => void;
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Background>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {" "}
          <p
            style={{ fontSize: "60px", lineHeight: "10px" }}
            className="font-face-gm"
          >
            <span style={{ color: "#FFE600" }}>It's </span>
            <span style={{ color: "#FF7A00" }}>a </span>
            <span style={{ color: "#F22FA5" }}>match</span>
            <span style={{ color: "#1DA1F2" }}>!</span>
          </p>
        </Grid>

        <Grid item>
          <Avatar
            src={user.profile_image_url.replace(/_normal\./, ".")}
            style={{ height: "auto", width: "50vw" }}
          />
        </Grid>
        <Grid item>
          {" "}
          <Avatar
            src={match.profile_image_url.replace(/_normal\./, ".")}
            style={{ height: "auto", width: "50vw" }}
          />
        </Grid>

        <Grid item>
          {" "}
          <h1> Lmao. Check Your DMs. </h1>{" "}
        </Grid>

        <Grid item>
          {" "}
          <Button
            variant="contained"
            onClick={() => {
              moveOn();
              navigate("/swipe");
            }}
            style={{
              backgroundColor: "#1DA1F2",
              color: "white",
              textTransform: "none",
              marginTop: 20,
            }}
          >
            Keep swipin'
          </Button>
        </Grid>
      </Grid>
    </Background>
  );
}

export default Match;
