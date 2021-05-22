import React from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import { http } from '../lib/http';
import UnauthenticatedSideDrawer from './UnauthenticatedSideDrawer'

const useStyles = makeStyles((theme) => ({
  searchfield: {
    "&:hover": {
      borderColor: "rgba(223,225,229,0)",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    "&:focus": {
      borderColor: "rgba(223,225,229,0)",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    backgroundColor: "#00000000",
    display: "flex",
    border: " 1px solid #dfe1e5",
    borderRadius: "24px",
    height: "44px",
    margin: "20px auto 20px",
    width: "300px",
    outline: "none",
    textIndent: "30px",
    textDecoration: "none",
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '50%',
    maxWidth: '50%',
    paddingTop: '3vw',
  },
  signIn: {
    "&:hover": {
      borderColor: "#375C23",
      boxShadow: "0 1px 6px #375C23",
      backgroundColor: '#375C23',
    },
    color: "#f6f8f9",
    background: '#375C23',
    padding: "10px 15px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    top: 20,
    marginBottom: 40,
  },
  paper: {
    padding: "20px",
    minHeight: "500px",
    maxHeight: "70vh",
    width: 380,
    margin: "20px auto",
  },
  buttonPadding: {
    paddingLeft: '12vw'
  }
}));

//Dummy User: username:JohnSkelington password:JSkel123
export default function SignIn() {
  const classes = useStyles();

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    http.post('/login', {
      user_name: username,
      password
    })
      .then(function (res) {
        console.log(res)
        //redirect to home page
      })
      .catch(function (err) {
        setErrorMessage(err?.response?.data?.message)
      })
  }

  return (
    <>
      <UnauthenticatedSideDrawer />
      <Grid>
        <Paper elevation={10} className={classes.paper}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            alignContent="center"
            wrap="nowrap"
          >
            <img className={classes.img} alt="complex" src="/assets/logo.png" />
          </Grid>
          <form>
            {errorMessage && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
            <input
              margin="small"
              size="small"
              name="username"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              className={classes.searchfield}
            />
            <input
              margin="small"
              size="small"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className={classes.searchfield}
              type="password"
            />
            <div className={classes.buttonPadding}>
              <Button
                type="submit"
                className={classes.signIn}
                variant="contained"
                size="small"
                onClick={handleSubmit}
              >
                Login
          </Button>
            </div>
            <Typography
              variant="subtitle2"
              className={classes.signUp}
            >
              Don't have an account?
          <a href="/register">Sign Up</a>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

