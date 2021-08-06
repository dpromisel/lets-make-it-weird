import { Button, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { useIsFetching } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dislikes from "./Dislikes";
import Likes from "./Likes";
import Login from "./Login";
import Match from "./Match";
import { AuthContext } from "./providers/AuthProvider";
import UserProfile from "./UserProfile";

function App() {
  const { user, loading } = useContext(AuthContext);
  const isLoading = useIsFetching();
  return (
    <BrowserRouter>
      {isLoading !== 0 && <LinearProgress />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              {loading ? (
                <div> Loading.... </div>
              ) : user ? (
                <UserProfile user={user} />
              ) : (
                <Login />
              )}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
