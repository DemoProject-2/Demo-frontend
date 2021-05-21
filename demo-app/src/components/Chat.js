import { makeStyles } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./SideDrawer.js"

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
 return(
    <div>
    <SideDrawer />
    <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item>
                Chat
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
      </div>
  )
}

