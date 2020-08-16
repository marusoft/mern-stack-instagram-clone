import React from "react";
import NavBar from "./Components/Navbar";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/UI/Home";
import Login from "./Components/UI/Signin";
import Signup from "./Components/UI/Signup";
import Profile from "./Components/UI/Profile";
import CreatePost from "./Components/UI/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
