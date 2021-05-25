import { makeStyles, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./AuthenticatedSideDrawer.js"
import { http } from '../lib/http';
import { useAuthContext } from '../context/auth-context'
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '9% auto',
    maxWidth: '65%',
    backgroundColor:"#C2F0AA",
    borderRadius:'20px'
  },
  title: {
    margin: "-12% 39%",
    fontSize: '75px',
    paddingBottom: '9%'
  },
  favoriteUsers:{
    fontSize: "30px",
  },
  rmvbtn: {
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
    left: '50%',
    top: 30,
    marginBottom: 50,
  },
  userDiv: {
    margin: '10px 50%',
    width: '350%',
    paddingRight: "60px",    
  },
  page: {
    margin: '10% 0px',
    paddingBottom:'1px',
  },  
}));


export default function SavedUsers() {
  const { user } = useAuthContext();

  const classes = useStyles();
  const [users, setUsers] = React.useState(null)

  React.useEffect(() => {
    const fetchUsers = () => {
      http.get(`/connections/${user.id}`)
      .then(res => {
        setUsers(res.data)
      }).catch((err) => {
        console.log('failed to fetch users', err.toJSON())
      })
    }

    fetchUsers();
  }, [])


  return (
    <div className={classes.page} style={{backgroundImage: 'url("/assets/background.jpg")'}}>
      <SideDrawer />
      <h1 className={classes.title} style={{color: "#375C23"}}>My {user.accountType === 'patient' ? 'Patients': 'Specialists' }</h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item id='saved' className={classes.favoriteUsers}>
              {Array.isArray(users) && users.length === 0 && <p>Nothing to see here!</p>}
              {Array.isArray(users) && users.length > 0 && users.map((search) => <div className={classes.userDiv}><p><b>{search.user_name}</b> - {search.medical_issue} <Button className={classes.rmvbtn}>Remove</Button></p>{search.email}</div>)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

