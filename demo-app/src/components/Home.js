import React, { useEffect, useState } from "react";
import { Fade, makeStyles } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./SideDrawer.js"
import SideDrawer2 from "./SideDrawer2.js"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
     height: '27vw',
     width:'43vw'
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
  paper_container: {
    paddingLeft: '15vw'
  }

}));

export default function Home(){
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  let isSignedIn = window.localStorage.getItem("token") in [null, ""]; //? false : true;
  if (isSignedIn===true) { //set to true
 return(
  <div className="page-container" style={{ backgroundImage: "url(/assets/background.jpg)" }}>
      <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
    <div>
    <SideDrawer />
    <div className={classes.paper_container}>
    <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item className={classes.image}>
              <img className={classes.img} alt="complex" src="/assets/logo.png" />
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
      </div>
      </div>
     </Fade>
  </div>
  )
}else{
  return(
    <div className="page-container" style={{ backgroundImage: "url(/assets/background.jpg)" }}>
        <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <div>
        <SideDrawer2 />
      <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid Item className={classes.image}>
                <img className={classes.img} alt="complex" src="/assets/logo.png" />
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
            </Grid>
          </Grid>
        </Paper>
        </div>
       </Fade>
    </div>
    )

}
}

