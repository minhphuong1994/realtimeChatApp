import React from "react";
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
    let amount = null;
    if(conversation){
        const unreadMessages = conversation.messages.filter(item => item.senderId === otherUserId && 
            item.receiverRead === false);
        amount = unreadMessages.length;
    }

    return amount >0? (
        <Box>           
            <Typography className={classes.counter}>
                {amount}
            </Typography>           
        </Box>): null;
}

export const needUpdateMessages = (conversation, otherUserId)=>{
    let result = conversation.messages.filter(item => item.senderId === otherUserId && 
        item.receiverRead === false);
    
    result.forEach(message => {message.receiverRead = true});
    return result
}

export default UnreadMessages;