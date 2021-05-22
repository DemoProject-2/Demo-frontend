import { makeStyles, Button } from "@material-ui/core";
import "./Home.css"
import SideDrawer from "./SideDrawer.js"
import {
  Grid,
  Card,
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import ReactDOM from 'react-dom';
import { AuthContext } from '../context/auth-context'
import React from "react";
import { useFormFields } from "../lib/customHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 'auto',
    maxWidth: 580,
  },
  image: {
    width: 328,
    height: 328,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '110%',
    maxWidth: '180%',
  },
  welcome: {
    paddingLeft:'10%',
    margin:'11% 1%'
  },
  userInfo: { 
    paddingLeft:'10%',
    margin:'-11% 1%'
  },
  userIcon: {
    paddingLeft:'10%',
    margin:'-9% 1%'
  },
  EditAccountInfodiv: {
    paddingLeft:'30vw',
    margin: '-25% 1%'
  },
  editbtn: {
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
    top: 20,
    marginBottom: 50,
    left:'46vw',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '1vw',
    maxWidth: 580,
    paddingTop:'3vw',
    paddingBottom:'2vw',
    paddingLeft:'9vw'
  },
  image: {
    width: 328,
    height: 328,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '110%',
    maxWidth: '180%',
  },
  notebtn: {
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
    left:'10vw',
    top: 30,
    marginBottom: 50,
  },
  note_container: {
    margin:'50vw 40px'
  },
  page_padding: {
    paddingTop:'3vw'
  }
}));

let notes=[]
export default function AccountProfile(){
  const { user, token } = React.useContext(AuthContext)
  const classes = useStyles();
  console.log(user)
  const [note, setNote] = useFormFields({
    content:""
})

 return(
    <div>
    <SideDrawer />
            <img className={classes.userIcon}src= "/assets/userIcon.jpg"/>
            <h1 className={classes.welcome}>{user.user_name}'s Page</h1><br />
            <h3 className={classes.userInfo}>Related Mental Health concern: {user.medical_issue}</h3>
            <div className={classes.EditAccountInfodiv}><Button className={classes.editbtn}>Edit Account Info</Button></div>
          
      </div>
  )
}

