import { Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import MutualProfile from "./MutualProfile";
import { AuthContext } from "../providers/AuthProvider";
import { getMutuals } from "../Twitter";
import { getTempStorage } from "../util";
import { Navigate } from "react-router-dom";
import Background from "./Background";
import Swiper from "./Swiper";
import { HeartSpinner } from "react-spinners-kit";

function ProfileStack() {
  const { user, hasShared } = useContext(AuthContext);
  const [count, setCount] = useState<number>(0);

  const { data, refetch, isLoading } = useQuery(
    "match",
    async () => {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret && user.screen_name) {
        return await getMutuals(token, secret, user.screen_name);
      }
    },
    {
      onSuccess: (d) => {
        if (d) setCount(d.likes.length + d.dislikes.length);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (isLoading) {
    return (
      <Background>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <HeartSpinner color="#1DA1F2" size={100} />
          </Grid>
        </Grid>
      </Background>
    );
  }
  if (data) {
    if (count > 10 && !hasShared) {
      return <Navigate to="/share" />;
    } else if (data?.unswiped.length > 0) {
      return (
        <Swiper
          profiles={data.relationships}
          fetchMore={refetch}
          swipes={data.likes.length + data.dislikes.length}
        />
      );
    } else {
      return (
        <Background>
          <> Hmmm not seeing any mutuals... </>
        </Background>
      );
    }
  } else {
    return (
      <Background>
        <> Loading... </>
      </Background>
    );
  }
}

export default ProfileStack;
