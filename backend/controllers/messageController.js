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
const deleteMessage = async (req, res) => {
  try {
    const { reciverId, senderId, _id: messageId } = req.body; // Assuming these are sent in the request body

    if (!reciverId || !senderId || !messageId) {
      return res
        .status(400)
        .json({ message: "Missing required parameters", success: false });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Conversation not found", success: false });
    }

    const messageIndex = conversation.messages.findIndex(
      (msg) => msg._id.toString() === messageId
    );

    if (messageIndex === -1) {
      return res
        .status(404)
        .json({ message: "Message not found", success: false });
    }

    conversation.messages.splice(messageIndex, 1);

    await conversation.save();

    return res
      .status(200)
      .json({ message: "Message deleted successfully", success: true });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};


module.exports = { sendMessage, getMessage,deleteMessage };
