import { Button, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { useIsFetching } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dislikes from "./components/Dislikes";
import Likes from "./components/Likes";
import Login from "./components/Login";
import Match from "./components/Match";
import { AuthContext } from "./providers/AuthProvider";
import UserProfile from "./components/user/UserProfile";
import Share from "./components/Share";
import UserPreview from "./components/user/UserPreview";

function App() {
  const { user, tweets } = useContext(AuthContext);
  const isLoading = useIsFetching();
  return (
    <BrowserRouter>
      {isLoading !== 0 && <LinearProgress />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              {user ? <UserPreview user={user} /> : <Login />}
            </div>
          }
        />
        <Route
          path="/match"
          element={<div className="app">{user ? <Match /> : <Login />}</div>}
        />
        <Route
          path="/likes"
          element={<div className="app">{user ? <Likes /> : <Login />}</div>}
        />
        <Route
          path="/dislikes"
          element={<div className="app">{user ? <Dislikes /> : <Login />}</div>}
        />
        <Route
          path="/share"
          element={<div className="app">{user ? <Share /> : <Login />}</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
