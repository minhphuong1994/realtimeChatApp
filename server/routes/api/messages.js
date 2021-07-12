const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body; 
  
    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // check if the sender owns the conversation before creating new message
      const conversationData = await Conversation.findByPk(conversationId);
      const conversationOwners = [conversationData.dataValues.user1Id,conversationData.dataValues.user2Id];
      if(conversationOwners.includes(senderId)){
        const message = await Message.create({ senderId, text, conversationId });   
        return res.json({ message, sender });    
      } 
      else{
        return res.sendStatus(403);
      }
      
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.has(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

//Update receiverRead to True from a list of read messages.
// structure of a message is the same as in Message table in DB
router.put("/read", async (req,res,next)=>{
  try{
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;    
    const {readMessages} = req.body   

    // check if the sender belongs to the message before update it
    const conversationData = await Conversation.findByPk(readMessages[0].conversationId);
    const conversationOwners = [conversationData.dataValues.user1Id,conversationData.dataValues.user2Id];
    if(conversationOwners.includes(senderId)){      
      readMessages.forEach( async message => {
        return message = await Message.update( { receiverRead: true },{ where: {id:message.id} });    
      });         
      return res.json({ readMessages });  
    } 
    else{
      return res.sendStatus(403);
    }
  } catch (error){
    next(error);
  }
});

module.exports = router;
