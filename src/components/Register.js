import React from "react";
import { Link } from "react-router-dom";
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
import UnauthenticatedSideDrawer from '../components/UnauthenticatedSideDrawer';
import { AuthContext } from '../context/auth-context'
import { http } from '../lib/http';

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
    left: 230,
    top: 30,
    marginBottom: 50,
  },
  justify: {
    color: "#375C23",
    paddingLeft: "13vw",
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
  const { setUser: setAuthUser } = React.useContext(AuthContext)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let firstName = user.first_name

    let lastName = user.last_name

    let userName = user.user_name

    let passWord = user.password

    let eMail = user.email

    let medicalIssue = user.medical_issue

    let accountType = user.account_type
    if (!firstName || !lastName || !userName || !passWord || !eMail || !medicalIssue) {
      alert('Fields Invalid Please Correct Issue and Try Again')
    }
    else {
      http.post('/register', { //here add link from route to register a user
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email: eMail,
        password: passWord,
        medical_issue: medicalIssue,
        account_type: accountType
      })
        .then(({ data }) => {
          setAuthUser(data.user)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }


  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <UnauthenticatedSideDrawer />
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
                value="specialist"
                onClick={setUser}
                name="account_type" />
                <t>Specialist</t>
                <input
                  type="radio"
                  value="patient"
                  onClick={setUser}
                  name="account_type" />
                <t>Looking for a Specialist</t><br /></p>
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
                component={Link} to="/login"
                onClick={handleSubmit}
              >
                Login
          </Button>
              <Typography
                justify="center"
                alignItems="center"
                alignContent="center"
                variant="subtitle2">
                <a href="/login">Have an account? Login</a>
              </Typography>
            </form>
          </Paper>
        </Collapse>
      </Container>
    </div>
  );
}