import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserData, TwitterUser } from "./TwitterAuth";
import UserCard from "./UserCard";
import { getTempStorage } from "./util";

function MutualProfile({
  userId,
  onFail,
}: {
  userId: string;
  onFail: () => void;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const func = async () => {
      if (userId) {
        const token = getTempStorage("access_token");
        const secret = getTempStorage("access_secret");

        if (token && secret) {
          const data = await getUserData(token, secret, userId);
          if (data) {
            setUser(data);
          } else {
            onFail();
          }
        }
      }
    };
    func();
  }, [userId]);
  return <UserCard user={user} />;
}

export default MutualProfile;
