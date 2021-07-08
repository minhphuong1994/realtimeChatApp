import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  let current = null;
  let next = null;
  return (
    <Box>
      {messages.map((message,index,arr) => {
        const time = moment(message.createdAt).format("h:mm");
        let marker = false;
        if(message.senderId === userId){
          if(arr.length-1>index){
            current = message.receiverRead;
            next = arr[index+1].receiverRead;
            marker = current === true && next === false ? true:false;         
          }
          else{
            marker = message.receiverRead? true:false;
          }       
        }
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} marker={marker}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
