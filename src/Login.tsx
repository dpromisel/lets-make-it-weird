import { Button } from "@material-ui/core";
import { login } from "./TwitterAuth";
import Background from "./background.png";
import "./App.css";

function AuthTwitter() {
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
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
    </div>
  );
}

export default AuthTwitter;
