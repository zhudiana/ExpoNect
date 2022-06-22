const { ChatRoom } = require("../models/chatroom");
const express = require("express");
const router = express.Router();

router.post(`/`, async (req, res) => {
  const { name } = req.body;

  const chatroomExists = await ChatRoom.findOne({ name });

  const chatroom = new ChatRoom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created",
  });
});

module.exports = router;
