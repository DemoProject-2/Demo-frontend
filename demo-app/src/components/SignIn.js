// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { login } from "../services/auth.js";
import SideDrawer2 from "./SideDrawer2.js"
// import { useFormFields } from "../lib/customHooks";
// import { AccountCircle, LockRounded } from "@material-ui/icons";
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useFormFields} from "../lib/customHooks";
import axios from 'axios';

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
  buttonPadding:{
    paddingLeft: '12vw'
  }
}));

//Dummy User: username:JohnSkelington password:JSkel123
export default function SignIn() {
  const classes = useStyles();
  const[user, setUser]=useFormFields({
    username:'',
    password:'',

  });

const handleSubmit = e =>{
e.preventDefault()
let userName=JSON.stringify(user.username)
userName=userName.replace(/['"]+/g, '')
console.log(userName)

let passWord=JSON.stringify(user.password)
passWord=passWord.replace(/['"]+/g, '')
console.log(passWord)

if(userName&&passWord){//add link to find user with username and password
  axios.get('https://localhost:3030/users/sign-in')
    .then(function(res){
      console.log(res)
      //redirect to home page
    })
    .catch(function(err){
      console.log(err)
    })
}}

  return(
    <body id='body'>
      <SideDrawer2 />
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
          <input 
            margin="small"
            size="small"
            name="username"
            id='searchField'
            defaultValue={user.username}
            placeholder="Username"
            onChange={setUser}
            className={classes.searchfield}
          />
          <input 
            margin="small"
            size="small"
            name="password"
            id='searchField'
            defaultValue={user.password}
            placeholder="Password"
            onChange={setUser}
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
            Sign In
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
      </body>
  )
}

