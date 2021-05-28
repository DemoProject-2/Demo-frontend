//check and go over the chat app on the desktop and make sure everything is as it was

import { makeStyles, Button } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./AuthenticatedSideDrawer.js"

import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '200px auto',
    maxWidth: 1000,
    height:800,
    padding:'50px'
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
  sendbtn: {
    "&:hover": {
      borderColor: "#375C23",
      boxShadow: "0 1px 6px #adcaec",
      backgroundColor: "#C2F0AA",
      color: "#375C23"
    },
    color: "#f6f8f9",
    background: "#375C23",
    padding: "22px 28px",
    fontSize: "30px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    left: '14vw',
    top: 130,
    marginBottom: 50,
  },
  welcome: {
    fontSize: "39px",
    paddingLeft: '10%',
    margin: '10% 1%',
    color: '#375C23'
  },
  room: {
    "&:hover": {
      borderColor: "green",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    "&:focus": {
      borderColor: "rgba(223,225,229,0)",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    backgroundColor: "#00000000",
    display: "flex",
    border: " 1px solid #dfe1e5",
    borderRadius: "24px",
    height: "80px",
    width: "890px",
    fontSize: "30px",
    outline: "none",
    textIndent: "30px",
    textDecoration: "none",
  },
name: {
  "&:hover": {
    borderColor: "green",
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
  },
  "&:focus": {
    borderColor: "rgba(223,225,229,0)",
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
  },
  backgroundColor: "#00000000",
  display: "flex",
  border: " 1px solid #dfe1e5",
  borderRadius: "24px",
  height: "80px",
  width: "890px",
  outline: "none",
  fontSize: "30px",
  textIndent: "30px",
  textDecoration: "none",
},
mainDiv: {
  height: 2000,
  margin: '-50px 0px'
},
padding:{
  padding: '1vw'
},
messagebtn: {
  "&:hover": {
    borderColor: "#375C23",
    boxShadow: "0 1px 6px #adcaec",
    backgroundColor: "#C2F0AA",
    color: "#375C23"
  },
  color: "#f6f8f9",
  background: "#375C23",
  padding: "22px 28px",
  fontSize: "30px",
  lineHeight: "16px",
  height: "auto",
  borderWidth: "0",
  margin: '-97% 3%',
  borderRadius: "20px",
  left: '28vw',
  top: 20,
  marginBottom: 50,
},
welcome: {
  fontSize: "39px",
  paddingLeft: '10%',
  margin: '10% -10%',
  color: '#375C23'
},
sendmsg:{
  "&:hover": {
    borderColor: "green",
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
  },
  "&:focus": {
    borderColor: "rgba(223,225,229,0)",
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
  },
  backgroundColor: "#00000000",
  display: "flex",
  margin:"250px 0px",
  border: " 1px solid #dfe1e5",
  borderRadius: "24px",
  height: "90px",
  width: "620px",
  outline: "none",
  textIndent: "30px",
  textDecoration: "none",
  fontSize: "24px"
},
messageIndividual:{
  fontSize: '25px'
}
}));

let socket;

export default function Home() {
  //edit connection port to work with either heroku or localhost

  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const url = process.env.NODE_ENV === 'production' ? 'https://mental-health-database.herokuapp.com' : 'http://localhost:3030'
  useEffect(() => {
    socket = io(url);
    return () => {
      socket.disconnect();
    }
  },[])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  },[messageList]);
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    
    console.log()
    socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
    console.log("Test")
  };
  return (
    <div className={classes.mainDiv} style={{backgroundImage: 'url("/assets/background.jpg")'}}>
      <SideDrawer />
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid Item>
              <h1 className={classes.welcome}>Personal Chat Room</h1><br />
              {!loggedIn ? (
                <div className="logIn">
                  <div className="inputs">
                    <input
                    className={classes.name}
                      type="text"
                      placeholder="Name..."
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                    <div className={classes.padding}/>
                    <input
                      type="text"
                      className={classes.room}
                      placeholder="Room..."
                      onChange={(e) => {
                        setRoom(e.target.value);
                      }}
                    />
                  </div>
                  <Button className={classes.sendbtn} onClick={connectToRoom}>Enter Chat</Button>
                </div>
              ) : (
                //set this div to be able to be a scroll box
                <div className={classes.chatContainer}>
                  <div className={classes.messages}>
                    {messageList.map((val, key) => {
                      return (
                        <div
                          className="messageContainer"
                          id={val.author === userName ? "You" : "Other"}
                        >
                          <div className={classes.messageIndividual}>
                            {val.author}: {val.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="messageInputs">
                    <input
                      className={classes.sendmsg}
                      type="text"
                      placeholder="Message..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    {/* have the sendMessage clear the messageInputs div */}
                    <Button className={classes.messagebtn} onClick={sendMessage}>Send</Button>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

