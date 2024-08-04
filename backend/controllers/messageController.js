const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const { getReciverSocketid, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;

    const reciverId = req.params.id;
    const { message } = req.body;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);

    const reciversocketid = getReciverSocketid(reciverId);
    if (reciversocketid) {
      io.to(reciversocketid).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (e) {
    console.log(e);
  }
};
const getMessage = async (req, res) => {
  try {
    const reciverId = req.params.id;

    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMessage, getMessage };
