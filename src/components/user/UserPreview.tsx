import { Button, Grid, Icon } from "@material-ui/core";
import { useNavigate } from "react-router";
import { Tweet, TwitterUser } from "../../Twitter";
import CustomCard from "./CustomCard";
import Background from "../Background";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import useWindowDimensions from "../../useWindowDimensions";
function UserPreview({ user }: { user: TwitterUser }) {
  const navigate = useNavigate();
  const breakpoint = 700;
  const { width } = useWindowDimensions();

  if (width < breakpoint) {
    return (
      <Background>
        <Grid
          direction="column"
          container
          justifyContent="center"
          alignItems="center"
          style={{
            width: "100vw",
            padding: "10px",
            backgroundColor: "black",
          }}
        >
          <Grid item>
            <p
              style={{ fontSize: "50px", lineHeight: "50px" }}
              className="font-face-gm"
            >
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

          <Grid
            item
            style={{
              marginTop: -20,
            }}
          >
            <CustomCard user={user} />
          </Grid>
          <Grid item>
            {" "}
            <Button
              variant="contained"
              onClick={() => navigate("/swipe")}
              endIcon={<ArrowRightAltIcon />}
              style={{
                backgroundColor: "#1DA1F2",
                color: "white",
                textTransform: "none",
                marginTop: 20,
              }}
            >
              Lookin' cute.
            </Button>
          </Grid>
        </Grid>
      </Background>
    );
  } else
    return (
      <Background>
        <Grid
          direction="column"
          container
          justifyContent="center"
          alignItems="center"
          style={{
            height: "100vh",
          }}
        >
          <Grid
            item
            direction="row"
            container
            justifyContent="center"
            alignItems="center"
            spacing={width > breakpoint ? 10 : 0}
          >
            <Grid item xs={12} md={6}>
              <p
                style={{ fontSize: width > breakpoint ? "100px" : "50px" }}
                className="font-face-gm"
              >
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
            <Grid
              item
              xs={12}
              md={6}
              direction="column"
              container
              // spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <CustomCard user={user} />
              </Grid>
              <Grid item>
                {" "}
                <Button
                  variant="contained"
                  onClick={() => navigate("/swipe")}
                  endIcon={<ArrowRightAltIcon />}
                  style={{
                    backgroundColor: "#1DA1F2",
                    color: "white",
                    textTransform: "none",
                    marginTop: 20,
                  }}
                >
                  Lookin' cute.
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Background>
    );
}

export default UserPreview;
