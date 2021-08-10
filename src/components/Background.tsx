import { Button } from "@material-ui/core";
import { login } from "../Twitter";
import BackgroundPng from "../background.png";
import "../App.css";

function Background({ children }: { children: JSX.Element }) {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${BackgroundPng})`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
