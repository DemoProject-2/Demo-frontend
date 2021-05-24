import { makeStyles } from "@material-ui/core";
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
    margin: '15% auto',
    maxWidth: 580,
  },
  title: {
    margin: "-8% 10%"
  }

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
    <div>
      <SideDrawer />
      <h1 className={classes.title}>My {user.accountType === 'patient' ? 'Specialists' : 'Patients' }</h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item id='saved'>
              {Array.isArray(users) && users.length === 0 && <p>Nothing to see here!</p>}
              {Array.isArray(users) && users.length > 0 && users.map((search) => <div><b>{search.user_name}</b>{search.medical_issue}</div>)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

