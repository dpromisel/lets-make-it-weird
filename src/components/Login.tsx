import { Button, Grid } from "@material-ui/core";
import { login } from "../Twitter";
import "../App.css";
import Background from "./Background";
import HeartRight from "../heart_r.png";
import HeartLeft from "../heart_left.png";
import useWindowDimensions from "../useWindowDimensions";

function AuthTwitter() {
  const { width } = useWindowDimensions();
  const breakpoint = 700;

  return (
    <Background>
      <Grid
        container
        direction="column"
        style={
          {
            // sheight: "100vh",
          }
        }
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          style={{ width: "100vw" }}
          justifyContent="center"
          alignItems="center"
        >
          {width > breakpoint && (
            <Grid item>
              <img src={HeartLeft} style={{ marginTop: "50px" }} />
            </Grid>
          )}
          <Grid item>
            <p
              style={{ fontSize: "80px", lineHeight: "80px" }}
              className="font-face-gm"
            >
              <span style={{ color: "#FFE600" }}>Let's </span>
              <span style={{ color: "#FF7A00" }}>make </span>
              <span style={{ color: "#C2F743" }}>it </span>
              <span style={{ color: "#F22FA5" }}>weird</span>
              <span style={{ color: "#1DA1F2" }}>.</span>
            </p>
          </Grid>
          {width > breakpoint && (
            <Grid item>
              <img src={HeartRight} style={{ marginTop: "50px" }} />
            </Grid>
          )}
        </Grid>

        <Grid item>
          <h2
            style={{
              color: "white",
              fontSize: "25px",
              marginTop: "-100px",
              padding: 80,
            }}
          >
            {" "}
            Hot or not for your{" "}
            <span style={{ color: "#1DA1F2" }}> Twitter </span> mutuals.
          </h2>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => login()}
            style={{
              backgroundColor: "#1DA1F2",
              color: "white",
              textTransform: "none",
              borderRadius: "100px",
              marginTop: "-50px",
            }}
          >
            I guess I'm ready
          </Button>
        </Grid>
      </Grid>
      {/* </header> */}
    </Background>
  );
}

export default AuthTwitter;
