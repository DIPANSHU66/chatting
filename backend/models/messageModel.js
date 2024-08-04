const mongoose = require("mongoose");
const messageModel = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},{timestamps:true});
module.exports = mongoose.model("Message", messageModel);
