import { Button, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { useIsFetching } from "react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dislikes from "./components/Dislikes";
import Likes from "./components/Likes";
import Login from "./components/Login";
import { AuthContext } from "./providers/AuthProvider";
import Share from "./components/Share";
import UserPreview from "./components/user/UserPreview";
import Swiper from "./components/Swiper";
import ProfileStack from "./components/ProfileStack";
import Loading from "./components/Loading";

function App() {
  const { user, isFetching } = useContext(AuthContext);

  if (isFetching) return <Loading />;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/swipe" /> : <Login />}
          />

          <Route
            path="/preview"
            element={user ? <UserPreview user={user} /> : <Login />}
          />

          <Route path="/swipe" element={user ? <ProfileStack /> : <Login />} />
          <Route
            path="/swipe/*"
            element={user ? <ProfileStack /> : <Login />}
          />
          <Route path="/likes" element={user ? <Likes /> : <Login />} />
          <Route path="/dislikes" element={user ? <Dislikes /> : <Login />} />
          <Route path="/share" element={user ? <Share /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
