const mongoose = require("mongoose");

const chatroomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
