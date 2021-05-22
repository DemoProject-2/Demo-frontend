import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./AuthenticatedSideDrawer.js"
import axios from 'axios';
import ReactDOM from 'react-dom';

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
  const classes = useStyles();
  axios.get(``)
    .then(res => {
      const users = res.data
      const usersList = users.map((search) => <div><b>{search.user_name}</b>{search.medical_issue}</div>)
      if (users.length > 0) {
        ReactDOM.render(<div>{usersList}</div>, document.getElementById('saved'))
      }
      else {
        ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('saved'))
      }
    })
  return (
    <div>
      <SideDrawer />
      <h1 className={classes.title}>Saved Users</h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item id='saved'>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

