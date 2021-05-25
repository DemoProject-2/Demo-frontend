import { makeStyles, Button } from "@material-ui/core";
import "./Home.css"
// import SideDrawer from "./AuthenticatedSideDrawer.js"
import { AuthContext } from '../context/auth-context'
import React from "react";
import AuthenticatedSideDrawer from "./AuthenticatedSideDrawer.js";
import { http } from "../lib/http";
import Grid from '@material-ui/core/Grid';
// import { useFormFields } from "../lib/customHooks";

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
    fontSize: "70px",
    paddingLeft: '10%',
    margin: '11% 1%'
  },
  userInfo: {
    fontSize: "40px",
    paddingLeft: '10%',
    margin: '-11% 1%'
  },
  userIcon: {
    height: "30%",
    width: "30%",
    paddingLeft: '10%',
    margin: '-5% 1%'
  },
  EditAccountInfodiv: {
    paddingLeft: '30vw',
    margin: '0% 1%'
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
    padding: "20px 20px",
    fontSize: "25px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    top: 20,
    marginBottom: 50,
    left: '46vw',
  },
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   margin: '1vw',
  //   maxWidth: 580,
  //   paddingTop: '3vw',
  //   paddingBottom: '2vw',
  //   paddingLeft: '9vw'
  // },
  // image: {
  //   width: 328,
  //   height: 328,
  // },
  // img: {
  //   margin: 'auto',
  //   display: 'block',
  //   maxHeight: '110%',
  //   maxWidth: '180%',
  // },
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
    left: '10vw',
    top: 30,
    marginBottom: 50,
  },
  note_container: {
    margin: '50vw 40px'
  },
  page_padding: {
    paddingTop: '3vw'
  }
}));

export default function AccountProfile() {
  const { user } = React.useContext(AuthContext)
  const classes = useStyles();
  // const [note, setNote] = useFormFields({
  //   content: ""
  // })
  const [reminders, setReminders] = React.useState(null)

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await http.get('/notes/noteType')
        setReminders(data.notes)
      } catch (err) {
        console.log(err)
      }
    }

    fetchNotes()
  }, [])
  return (
    <div>
      <AuthenticatedSideDrawer />
      <img className={classes.userIcon} alt="user icon" src="/assets/userIcon.jpg" />
      <h1 className={classes.welcome}>{user.user_name}'s Page</h1><br />
      <h3 className={classes.userInfo}>Name: {user.first_name} {user.last_name}<h4>Related Mental Health concern: {user.medical_issue}</h4></h3>
      <div className={classes.EditAccountInfodiv}><Button className={classes.editbtn}>Edit Account Info</Button></div>
      <Grid item id='notes'>
        {Array.isArray(reminders) && reminders.map(rem => <div className={classes.noteDiv} key={rem.id}><div>{rem.title}</div><div>{rem.content}</div> </div>)}
      </Grid>
    </div>
  )
}

