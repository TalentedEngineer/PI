const Chat = require("../models/Chat.js");
const Message = require("../models/Message.js");
const User = require("../models/User.js");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required information" });
  }

  var newMessage = {
    sender: req.body.sender,
    content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const chatHistory = async (req, res) => {
  try {
    const { sender, receiver, chatId, chatType } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: true, message: "Chat not found" });
    }

    if (chatType === "order") {
      const messages = await Message.find({ chat: chat._id, chatType: "order" })
        .sort({ createdAt: 1 })
        .populate("sender");

      return res.status(200).json({ messages });
    }

    const messages = await Message.find({ chat: chat._id, chatType: "single" })
      .sort({ createdAt: 1 })
      .populate("sender");

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const fetchChatId = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const existingChat = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
    });

    if (existingChat) {
      return res.json({ chatId: existingChat._id });
    }

    const newChat = new Chat({
      users: [senderId, receiverId],
    });
    await newChat.save();

    res.json({ chatId: newChat._id });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "An error occurred while fetching chat ID.",
    });
  }
};

const fetchOrderChatId = async (req, res) => {
  try {
    const { senderId, receiverId, type, order } = req.body;

    const existingChat = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
      type,
      order: order,
    });

    if (existingChat) {
      return res.json({ chatId: existingChat._id });
    }

    const newChat = new Chat({
      users: [senderId, receiverId],
      type,
      order: order,
    });
    await newChat.save();

    res.json({ chatId: newChat._id });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "An error occurred while fetching chat ID.",
    });
  }
};

module.exports = { allMessages, sendMessage, chatHistory, fetchChatId, fetchOrderChatId };
