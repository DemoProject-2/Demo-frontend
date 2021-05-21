import { makeStyles } from "@material-ui/core";
import "./Home.css"
import SideDrawer from "./SideDrawer.js"
import {
  Grid,
  Card,
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import ReactDOM from 'react-dom';

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

}));


export default function Home(){
  const classes = useStyles();
  axios.get("https://mental-health-database.herokuapp.com/users/all-users")//add link to get single user that is logged in
    .then(res =>{
      console.log(res)
      const users=res.data
      const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b><p>{user.password}</p></Card><br/></Grid>)
      console.log(usersList)
      ReactDOM.render(<div>{usersList}</div>,document.getElementById('user_info'))
    })
 return(
    <div>
    <SideDrawer />
    <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid Item>
            <h1 Item>Welcome to Your Page!</h1><br />
            <Grid Item id='user_info'>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
      </div>
  )
}

