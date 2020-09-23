import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./Components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Components/UI/Home";
import Login from "./Components/UI/Signin";
import Signup from "./Components/UI/Signup";
import Profile from "./Components/UI/Profile";
import CreatePost from "./Components/UI/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch({type:'USER', payload:user});
      history.push('/');
    }
    else{
      history.push('/signin');
    }
  }, []);
  return (
    <Switch>
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
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
