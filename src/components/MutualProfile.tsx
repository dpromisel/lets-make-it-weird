import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getUserData, TwitterUser } from "../Twitter";
import UserCard from "./user/CustomCard";
import { getTempStorage } from "../util";

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
        if (data?.user) {
          return data;
        } else {
          onFail();
        }
      }
    }
  });

  if (data) return <UserCard user={data.user} tweets={data.tweets} />;
  else return null;
}

export default MutualProfile;
