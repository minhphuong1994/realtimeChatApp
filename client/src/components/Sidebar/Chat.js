import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { useDispatch } from "react-redux";
import UnreadMessages, { needUpdateMessages} from "./UnreadChecker";
import { updateReadMessages } from "../../store/utils/thunkCreators";
import { updateConvoMessages } from "../../store/conversations";


const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};


const Chat = (props)=>{
  const { classes } = props;
  const otherUser = props.conversation.otherUser;
  const dispatch = useDispatch();

  const handleClick = async (conversation) => {
    dispatch(setActiveChat(conversation.otherUser.username));
    //update unread to read and send to server list of recent read messages
    const recentReadMessages = needUpdateMessages(conversation, otherUser.id);  
    if(recentReadMessages.length > 0){
      const {readMessages} = await updateReadMessages(recentReadMessages);  
      dispatch(updateConvoMessages(conversation.id,readMessages));
    }
  };

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      <UnreadMessages conversation={props.conversation} otherUserId={otherUser.id}/>
    </Box>
  );
}

export default withStyles(styles)(Chat);

