import React, {useEffect,useRef} from "react";
import { Box, makeStyles, } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";



const useStyles = makeStyles(() => ({
  chatbox: {
    overflowY: "scroll",
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const { messages, otherUser, userId } = props;


  useEffect(()=>{  
    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  },[messages.length])
  
  let current = null;
  let next = null;


  return (
    <Box className={classes.chatbox}>
      {messages.map((message,index) => {
        const time = moment(message.createdAt).format("h:mm");     
        let marker = false;
        if(message.senderId === userId){
          if(messages.length-1>index){
            current = message.receiverRead;
            next = messages[index+1].receiverRead;
            marker = current && !next;         
          }
          else{
            marker = message.receiverRead;
          }       
        }
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} marker={marker}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
        })}
        <div ref={scrollRef}></div> 
    </Box>
  );
};

export default Messages;
