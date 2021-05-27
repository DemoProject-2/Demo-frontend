import React, { useEffect, useState } from "react";
import { Fade, makeStyles } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UnauthenticatedSideDrawer from './UnauthenticatedSideDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '32vw',
    width: '43vw',
    alignContent: "center",
    border:'10px solid #375C23'
  },
  image: {
    width: 328,
    height: 328,
    alignContent: "center"
  },
  img: {
    margin: 'auto',
    display: 'block',
    alignContent: "center",
    maxHeight: '270%',
    maxWidth: '340%',
  },
  paper_container: {
    paddingLeft: '15vw',
    alignContent: "center"
  }, 
  subheading: {
    margin: '35% 35px',
    color:"#375C23"
  }

}));

export default function Home() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className="page-container" style={{ backgroundImage: "url(/assets/background.jpg)" }}>
      <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <div>
          <UnauthenticatedSideDrawer />
          <div className={classes.paper_container}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Grid Item className={classes.image}>
                    <img className={classes.img} alt="complex" src="/assets/logo.png" />
                  </Grid>
                  <h1 className={classes.subheading}>Your Mental Health Helper for Branching Out and Meet A Specialist For You</h1>
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
}

