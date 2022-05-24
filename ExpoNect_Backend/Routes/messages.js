const { Message } = require("../models/message");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const messageList = await Message.find();

  if (!messageList) {
    res.status(500).json({ success: false });
  }
  res.send(messageList);
});

module.exports = router;
