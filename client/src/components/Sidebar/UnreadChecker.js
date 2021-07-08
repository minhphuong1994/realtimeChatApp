import React, {useState, useEffect} from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    counter: {
        backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 80%)",
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFFFFF",
        borderRadius: 14,
        padding: "2px 8px", 
    }
}));



const UnreadMessages = (props) =>{
    const classes = useStyles();
    const conversation = props.conversation || {};
    const {otherUserId} = props;
    const [unreadMessages, setUnreadMessages] = useState(0);    

    useEffect(()=>{
        if(conversation){        
            setUnreadMessages(unreadMessageCounter(conversation.messages, otherUserId));
        }      
    },[conversation])

    // console.log(unreadMessages)
    return unreadMessages > 0 && (
        <Box>           
            <Typography className={classes.counter}>
                {unreadMessages}
            </Typography>           
        </Box>
    )
}

export const unreadMessageCounter = (messages, otherUserId) =>{
    const temp = messages.reduce((counter,message)=>{
        return counter += (message.senderId === otherUserId && message.receiverRead === false) ? 1 : 0;
    },0);
    return temp
}


export const needUpdateMessages = (conversation, otherUserId)=>{
    let result = conversation.messages.filter(item => item.senderId === otherUserId && 
        item.receiverRead === false);
    
    result.forEach(message => {message.receiverRead = true});
    return result
}

export default UnreadMessages;
