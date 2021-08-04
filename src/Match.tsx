import { Button, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "./providers/AuthProvider";
import { getMutuals } from "./TwitterAuth";
import { getTempStorage } from "./util";

function Match() {
  const { user } = useContext(AuthContext);
  const [mutuals, setMutuals] = useState<number[]>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const func = async () => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret && user.screen_name) {
        const data = await getMutuals(token, secret, user.screen_name);
        if (data) {
          setMutuals(data.intersect);
        }
      }
    };

    func();
  }, []);

  if (mutuals.length > 0) {
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
          <MutualProfile
            userId={mutuals[index].toString()}
            onFail={() => {
              if (index < mutuals.length - 1) {
                setIndex(index + 1);
              } else if (index > 0) {
                setIndex(index - 1);
              }
            }}
          />
        </Grid>

        <Grid
          item
          container
          direction="row"
          style={{ width: "100vw" }}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                if (index > 0) setIndex(index - 1);
              }}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                if (index < mutuals.length - 1) setIndex(index + 1);
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <> Hmmm not seeing any mutuals... it's possible we're loading them. </>
    );
  }
}

export default Match;
