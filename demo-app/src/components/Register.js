import React from "react";
//import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { register } from "../services/auth";
import { BrowserRouter as Router, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormFields } from "../lib/customHooks";
import {
  Grid,
  Paper,
  makeStyles,
  TextField,
  Button,
  Typography,
  Collapse,
  Container,
} from "@material-ui/core";
import SideDrawer2 from "./SideDrawer2.js"
import { AuthContext } from '../context/auth-context'

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    minHeight: "500px",
    height: "70vh",
    width: "100vh",
    margin: "0 auto",
  },
  signUp: {
    "&:hover": {
      borderColor: "#375C23",
      boxShadow: "0 1px 6px #adcaec",
      backgroundColor: "#C2F0AA",
      color: "#375C23"
    },
    color: "#f6f8f9",
    background: "#375C23",
    padding: "12px 18px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    left:230,
    top: 30,
    marginBottom: 50,
  },
  justify: {
    color:  "#375C23",
    paddingLeft:"13vw",
    paddingTop: "2vw"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '50%',
    maxWidth: '50%', 
    paddingTop: '3vw',
  }
}));

export default function Register({ setLoggedIn, loggedIn }) {
  const { _setToken, _setUser } = React.useContext(AuthContext)
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useFormFields({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email: "",
    medical_issue: "",
    account_type: "",
  });

//   const handleRegister = (event) => {
//     event.preventDefault();
//     register(business);
//     history.push("/profile/home");
//     setLoggedIn(true);
//   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
  let firstName=user.first_name

  let lastName=user.last_name

  let userName=user.user_name

  let passWord=user.password

  let eMail=user.email
 
  let medicalIssue=user.medical_issue

  let accountType=user.account_type
  
  axios.post('http://localhost:3030/users/register',{ //here add link from route to register a user
    first_name:firstName,
    last_name:lastName,
    user_name:userName,
    email:eMail,
    password:passWord,
    medical_issue:medicalIssue,
    account_type:accountType
  })
  .then(function(res){
    console.log(res)
  })
  .catch(function(err){
    console.log(err)
  })

  try {
  // const { data } = await axios.post('http://localhost:3030/users/register', {
  //   first_name: "erwins",
  //   last_name: "saget",
  //   user_name: "erwezy",
  //   email: "erwins1223@gmail.com",
  //   password: "password",
  //   medical_issue: "neurosis",
  //   account_type: "patient"
  //   })

    _setToken('aklsdjflaksjflasf')
    _setUser({ id: 1, first_name: "erwins"})    
  } catch (err) {
    console.log('err', err.message)
  }
}
  

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <SideDrawer2 />
      <Container className={classes.container}>
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <Paper elevation={20} className={classes.paper}>
          <img className={classes.img} alt="complex" src="/assets/logo.png" />
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
            >
              <img
                className={classes.logo}
                src="/assets/BizWiz landing logo.PNG"    /////add logo
                alt=""
              />
            </Grid>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <p className={classes.justify}><input 
                type="radio" 
                value="Specialist" 
                onClick={setUser} 
                name="account_type" />
                <t>Specialist</t>
              <input 
                type="radio" 
                value="Regular User" 
                onClick={setUser} 
                name="account_type" />
                <t>Looking for a Specialist</t><br/></p>
              <Grid container justify="space-around" spacing={1}>
                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    placeholder="First Name"
                    name="first_name"
                    defaultValue={user.first_name}
                    onChange={setUser}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    placeholder="Last Name"
                    name="last_name"
                    defaultValue={user.last_name}
                    onChange={setUser}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    className={classes.inputUsername}
                    placeholder="Username"
                    name="user_name"
                    defaultValue={user.user_name}
                    onChange={setUser}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    placeholder="Password"
                    type="password"
                    name="password"
                    defaultValue={user.password}
                    onChange={setUser}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    placeholder="E-mail"
                    name="email"
                    defaultValue={user.email}
                    onChange={setUser}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="small"
                    size="small"
                    placeholder="Related Mental Health Concern"
                    name="medical_issue"
                    defaultValue={user.medical_issue}
                    onChange={setUser}
                  />
                </Grid>
              </Grid>

            <Button
            type="submit"
            className={classes.signUp}
            variant="contained"
            size="small"
            component = {Link} to = "/sign-in"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
              <Typography 
              justify="center"
              alignItems="center"
              alignContent="center"
              variant="subtitle2">
              <a href="/sign-in">Have an account? Sign In</a>
              </Typography>
            </form>
          </Paper>
        </Collapse>
      </Container>
    </div>
  );
}