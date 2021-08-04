import { Button, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "./providers/AuthProvider";
import { getMutuals } from "./TwitterAuth";
import { getTempStorage } from "./util";

function Match() {
  const { user } = useContext(AuthContext);
  const [mutuals, setMutuals] = useState<number[]>([
    1864578115, 2808425972, 1611103723, 3353374996, 750874892967485400,
    336099421, 701186094436589600, 1754323310, 832721837519839200, 4899078796,
    1656640214, 305349168, 2568044770, 3392340275, 2226268581,
    797426175408795600, 3045561447, 2904589173, 2276458255, 1126181258,
  ]);
  const [index, setIndex] = useState<number>(0);

  //   useEffect(() => {
  //     const func = async () => {
  // const token = getTempStorage("access_token");
  // const secret = getTempStorage("access_secret");

  // if (token && secret && user.screen_name) {
  //         const data = await getMutuals(token, secret, user.screen_name);
  //         if (data) {
  //           setMatches(data.intersect);
  //         }
  //       }
  //     };

  //     func();
  //   }, []);

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
