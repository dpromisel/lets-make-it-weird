import { Button } from "@material-ui/core";
import { login } from "../Twitter";
import "../App.css";
import Background from "./Background";

function AuthTwitter() {
  return (
    <Background>
      <header className="App-header">
        <h1>let's makie it weird.</h1>
        <h2>swipe right on your twitter mutuals.</h2>
        <Button
          variant="contained"
          onClick={() => login()}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
        >
          authenticate twitter
        </Button>
      </header>
    </Background>
  );
}

export default AuthTwitter;
