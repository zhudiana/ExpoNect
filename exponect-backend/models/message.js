const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({});

exports.Message = mongoose.model("Message", messageSchema);
