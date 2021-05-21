import React from "react";
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { BrowserRouter as Router, Link } from "react-router-dom";
import DehazeSharpIcon from '@material-ui/icons/DehazeSharp';

import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
} from "@material-ui/core";
const drawerWidth = 240;

const TypographyStyle = withStyles({
  root: {
    color: "#375C23",
  }
})(Typography);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

// function logout(e){
//   let isSignedIn = window.localStorage.getItem("token") in [null, ""];
//   isSignedIn=false
//   console.log(isSignedIn)
// };

export default function SideDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

return(
  <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      style={{background:"#C2F0AA"}}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
    <Toolbar>
        <Typography variant="h6" noWrap className={classes.title} >
        </Typography>
        <IconButton
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <DehazeSharpIcon />
        </IconButton>
      </Toolbar>
      </AppBar>
      <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      {/* <Typography paragraph>
      Possible name : Mentality.com
      </Typography> */}
    </main>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon style={{color:'#375C23'}}/> : <ChevronRightIcon style={{color:'#375C23'}}/>}
        </IconButton>
      </div>
      <Divider />
      <TypographyStyle>
      {['Home'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to='/'
          >
            <ListItemIcon><PersonOutlineIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {['My Account'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to='/my-account'
          >
            <ListItemIcon><PersonOutlineIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {['My Notes'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to='/my-notes'
          >
            <ListItemIcon><EventNoteIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
       {/* {['Saved'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to="/saved-doctors"
          >
            <ListItemIcon><PeopleOutlineIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
       {['Find Specialist'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to='/search'
          >
            <ListItemIcon><FindInPageRoundedIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
       {['Chat'].map((text, index) => (
          <ListItem 
          button key={text}
          component={Link} to='/chat'
          >
            <ListItemIcon><FindInPageRoundedIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      <Divider />
      <List>
      {['Log Out'].map((text, index) => (
          <ListItem 
          button key={text}
          //component={Link} to='/sign-in'
          component={Link} to='/sign-in'
          >
            <ListItemIcon><ExitToAppRoundedIcon style={{color:'#375C23'}}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      </TypographyStyle>

      </Drawer>

    </div>
  );
}