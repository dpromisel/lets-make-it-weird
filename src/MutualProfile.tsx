import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
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
  const { data } = useQuery(["profile", userId], async () => {
    if (userId) {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        const data = await getUserData(token, secret, userId);
        if (data) {
          return data;
        } else {
          onFail();
        }
      }
    }
  });

  if (data) return <UserCard user={data} />;
  else return null;
}

export default MutualProfile;
