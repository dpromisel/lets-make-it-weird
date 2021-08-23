import React, { createContext, useEffect, useState } from "react";
import { getTempStorage, setTempStorage } from "../util";
import {
  checkIfShared,
  getAccessCredentials,
  getUserData,
  Tweet,
  TwitterUser,
} from "../Twitter";
import LogRocket from "logrocket";
import { useMutation, useQuery, useQueryClient } from "react-query";

type ContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<{
  user: TwitterUser;
  tweets: Tweet[];
  hasShared: boolean;
}>({
  user: null,
  tweets: [],
  hasShared: false,
});

const oauth_token = new URLSearchParams(window.location.search).get(
  "oauth_token"
);
const oauth_verifier = new URLSearchParams(window.location.search).get(
  "oauth_verifier"
);

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [hasShared, setHasShared] = useState(true);

  const { refetch } = useQuery("user", async () => {
    const token = getTempStorage("access_token");
    const secret = getTempStorage("access_secret");
    const userId = getTempStorage("user_id");

    if (token && secret && userId) {
      const { tweets, user, hasShared } = await getUserData(
        token,
        secret,
        userId
      );
      if (user) {
        LogRocket.identify(user.id_str, {
          screen_name: user.screen_name,
        });
        setUser(user);
        setHasShared(hasShared);
        if (tweets) {
          setTweets(tweets);
        }
      }
    }
  });

  useEffect(() => {
    const func = async () => {
      if (oauth_token && oauth_verifier) {
        window.history.pushState({}, null, "/");
        const secret = getTempStorage("twitter_secret");
        if (secret) {
          const ac = await getAccessCredentials(
            oauth_token,
            secret,
            oauth_verifier
          );

          if (ac) {
            await refetch();
          }
        }
      }
    };

    func();
  }, [oauth_token, oauth_verifier]);

  return (
    <AuthContext.Provider value={{ user, tweets, hasShared }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
