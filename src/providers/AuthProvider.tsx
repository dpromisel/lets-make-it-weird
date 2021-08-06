import React, { createContext, useEffect, useState } from "react";
import { getTempStorage } from "../util";
import { getAccessCredentials, getUserData, TwitterUser } from "../TwitterAuth";
import LogRocket from "logrocket";

type ContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<{
  user: TwitterUser;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

const oauth_token = new URLSearchParams(window.location.search).get(
  "oauth_token"
);
const oauth_verifier = new URLSearchParams(window.location.search).get(
  "oauth_verifier"
);

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserWithStorage = async () => {
    setLoading(true);
    const token = getTempStorage("access_token");
    const secret = getTempStorage("access_secret");
    const userId = getTempStorage("user_id");

    if (token && secret && userId) {
      const userData = await getUserData(token, secret, userId);
      if (userData) {
        LogRocket.identify(userData.id_str, {
          screen_name: userData.screen_name,
        });
        setUser(userData);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const func = async () => {
      if (oauth_token && oauth_verifier) {
        setLoading(true);

        window.history.pushState({}, null, "/");
        const secret = getTempStorage("twitter_secret");
        if (secret) {
          const ac = await getAccessCredentials(
            oauth_token,
            secret,
            oauth_verifier
          );

          if (ac) {
            await getUserWithStorage();
          }
        }
        setLoading(false);
      }
    };

    func();
  }, [oauth_token, oauth_verifier]);

  useEffect(() => {
    getUserWithStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
