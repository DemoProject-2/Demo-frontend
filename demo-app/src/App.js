import React from "react";
import Home from "./components/Home.js"
import SignIn from "./components/SignIn.js"
import AccountProfile from "./components/AccountProfile.js"
import Register from "./components/Register.js"
import Search from "./components/Search.js"
import Chat from "./components/Chat.js"
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Notes from "./components/Notes.js";
import { AuthContext } from './context/auth-context'
import SideDrawer from './components/SideDrawer.js'
import SideDrawer2 from './components/SideDrawer2.js'
import SavedUsers from './components/SavedUsers'
function AuthenticatedApp() {
  return (
    <Router>
      <SideDrawer></SideDrawer>
      <Switch>
        <Route path='/notes'>
          <Notes />
        </Route>
       <Route path='/saved'>
          <SavedUsers />
        </Route>
        <Route path ="/search">
          <Search />
        </Route>
        <Route path="/my-account">
          <AccountProfile />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

function UnauthenticatedApp() {
  return (
    <Router>
      <SideDrawer2></SideDrawer2>
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default function App() {
  const { user, token } = React.useContext(AuthContext)
  
  return (
    <div>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

