import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import MessageLinkDisplay from "./MessageLinkDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  avatar: {
    height: 15,
    width: 15,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, marker } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <MessageLinkDisplay styleName={classes.text} message={text} />
      </Box>
      {
        marker && <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}/>
      }
      
    </Box>
  );
};

export default SenderBubble;
