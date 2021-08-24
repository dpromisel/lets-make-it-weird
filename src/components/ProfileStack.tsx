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

function ProfileStack() {
  const { user, hasShared } = useContext(AuthContext);
  const [count, setCount] = useState<number>(0);

  const { data } = useQuery(
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

  if (data) {
    if (count > 10 && !hasShared) {
      return <Navigate to="/share" />;
    } else if (data?.unswiped.length > 0) {
      return (
        <Swiper
          profileIds={data.unswiped}
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
