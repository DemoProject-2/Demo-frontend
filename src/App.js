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
import AuthenticatedSideDrawer from './components/AuthenticatedSideDrawer.js'
import UnauthenticatedSideDrawer from './components/UnauthenticatedSideDrawer'
import SavedUsers from './components/SavedUsers'

function AuthenticatedApp() {
  return (
    <Router>
      <AuthenticatedSideDrawer></AuthenticatedSideDrawer>
      <Switch>
        <Route path='/notes'>
          <Notes />
        </Route>
        <Route path='/saved'>
          <SavedUsers />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <AccountProfile />
        </Route>
      </Switch>
    </Router>
  )
}

function UnauthenticatedApp() {
  return (
    <Router>
      <UnauthenticatedSideDrawer></UnauthenticatedSideDrawer>
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path="/login">
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
  const { user } = React.useContext(AuthContext)

  return (
    <div>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

