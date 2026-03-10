const express = require("express");
const router = express.Router();

const Chat = require("../models/Chat");
const getAIResponse = require("../services/aiService");
const authMiddleware = require("../middleware/authMiddleware");

/* SEND MESSAGE */

router.post("/", authMiddleware, async (req, res) => {

  const { message, userId } = req.body;

  const reply = await getAIResponse(message);

  const chat = new Chat({
    userId,
    message,
    reply
  });

  await chat.save();

  res.json({ reply });

});


/* GET CHAT HISTORY */

router.get("/:userId", authMiddleware, async (req, res) => {

  const chats = await Chat.find({
    userId: req.params.userId
  });

  res.json(chats);

});

module.exports = router;