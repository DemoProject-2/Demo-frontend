import { makeStyles, Button } from "@material-ui/core";
import "./Home.css"
// import SideDrawer from "./AuthenticatedSideDrawer.js"
import { AuthContext } from '../context/auth-context'
import React from "react";
import AuthenticatedSideDrawer from "./AuthenticatedSideDrawer.js";
import { http } from "../lib/http";
import Grid from '@material-ui/core/Grid';
// import { useFormFields } from "../lib/customHooks";
import "./AccountProfile.css"
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
    paddingLeft: '5%',
    margin: '-16% 35%'
  },
  userInfo: {
    paddingTop:'30px',
    fontSize: "50px",
    paddingLeft: '5%',
    margin: '15% 35%'
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
    top: -750,
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
  },
  notesdiv: {
    margin:'-9% 6%'
  },
  notefont:{
    fontSize:'300%',
    textDecoration: 'underline',
    paddingBottom: "40px"
  },
  notelist:{
    fontSize:'300%',
    paddingLeft:'60px',
    paddingTop:'30px'
  },
  listBorder: {
    backgroundColor: '#C2F0AA',
    borderRadius:'120px'
  },
  page: {
    margin:'-28px'
  },
  page:{
    paddingTop: '6%'
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
    <div className={classes.page}>
    <div >
      <AuthenticatedSideDrawer />
      <div>
      <img className={classes.userIcon} alt="user icon" src="/assets/userIcon.jpg" />
      <h1 className={classes.welcome}>{user.user_name}'s Page</h1><br />
      <h3 className={classes.userInfo}>Name: {user.first_name} {user.last_name}<h4 className={'uppercase'}>{user.account_type} for {user.medical_issue}</h4></h3>
      <div className={classes.EditAccountInfodiv}><Button className={classes.editbtn}>Edit Account Info</Button></div>
      </div>
      <div className={classes.notesdiv}>
        <h1 className={classes.notefont}>Upcoming Appointments: </h1>
        {Array.isArray(reminders) && reminders.map(rem =><div className={classes.listBorder}> <div className={classes.notelist} key={rem.id}><div><b>Note Title : </b>{rem.title}</div><div><b>Appointment Details : </b>{rem.content}</div></div><br /><br /></div>)}
      </div>
    </div>
    </div>
  )
}

