import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Match from "./Match";
import { AuthContext } from "./providers/AuthProvider";
import UserProfile from "./UserProfile";

function App() {
  const { user, loading } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              {loading ? (
                <div> Loading... </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
