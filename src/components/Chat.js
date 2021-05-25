import { makeStyles, Button } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideDrawer from "./AuthenticatedSideDrawer.js"

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
let socket;
//edit connection port to work with either heroku or localhost
const CONNECTION_PORT = "localhost:3030";

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
  sendbtn: {
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
  welcome: {
    fontSize: "25px",
    paddingLeft: '10%',
    margin: '11% 1%'
  },
}));

export default function Home() {
  const classes = useStyles();

  //for chat room functionality
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  return (
    <div>
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
                      type="text"
                      placeholder="Name..."
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                    <input
                      type="text"
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
                <div className="chatContainer">
                  <div className="messages">
                    {messageList.map((val, key) => {
                      return (
                        <div
                          className="messageContainer"
                          id={val.author == userName ? "You" : "Other"}
                        >
                          <div className="messageIndividual">
                            {val.author}: {val.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="messageInputs">
                    <input
                      type="text"
                      placeholder="Message..."
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    {/* have the sendMessage clear the messageInputs div */}
                    <Button className={classes.sendbtn} onClick={sendMessage}>Send</Button>
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

