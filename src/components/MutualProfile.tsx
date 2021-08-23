import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getRelationship, getUserData, TwitterUser } from "../Twitter";
import UserCard from "./user/CustomCard";
import { getTempStorage } from "../util";

function MutualProfile({
  userId,
  onFail,
}: {
  userId: string;
  onFail: () => void;
}) {
  const { data } = useQuery(["relationship", userId], async () => {
    if (userId) {
      const token = getTempStorage("access_token");
      const secret = getTempStorage("access_secret");

      if (token && secret) {
        const data = await getRelationship(token, secret, userId);
        if (data.mutuals && data.target) {
          return data;
        } else {
          onFail();
        }
      }
    }
  });

  if (data) return <UserCard user={data.target} />;
  else return null;
}

export default MutualProfile;
