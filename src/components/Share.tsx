import { Button, CircularProgress } from "@material-ui/core";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Navigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { checkIfShared } from "../Twitter";
import { getTempStorage } from "../util";
import Background from "./Background";

function Share() {
  const text = "Mic check mic check @shotsonclub";
  const qc = useQueryClient();
  const { hasShared } = useContext(AuthContext);

  const refreshShared = useMutation(
    async () => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");
      if (token && secret) {
        await checkIfShared(token, secret);
      }
    },
    {
      onSettled: () => qc.invalidateQueries("user"),
    }
  );

  if (hasShared) {
    return <Navigate to="/match" />;
  }

  return (
    <Background>
      <header className="App-header">
        <h2>You're out of swipes, share to twitter to continue!.</h2>
        <Button
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          variant="contained"
          onClick={() =>
            window.open(`https://twitter.com/intent/tweet?text=${text}`)
          }
        >
          Share to Twitter
        </Button>
        <br />

        <Button
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          variant="contained"
          onClick={() => refreshShared.mutate()}
        >
          Ok I Shared
        </Button>

        {refreshShared.isLoading && <CircularProgress />}
      </header>
    </Background>
  );
}

export default Share;
