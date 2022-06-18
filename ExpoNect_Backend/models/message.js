const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ChatRoom",
  },
  importer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Importer",
  },
  exporter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exporter",
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

exports.Message = mongoose.model("Message", messageSchema);
