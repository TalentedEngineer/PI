const User = require("../models/User.js");
const Chat = require("../models/Chat.js");

const accessChat = async (req, res) => {
  const { userId, sender } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required information" });
  }

  var isChat = await Chat.findOne({
    $and: [
      { users: { $elemMatch: { $eq: sender } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password") //return all users array except password
    .populate("latestMessage"); //return all latestMessage array

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  if (isChat && isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // create a new chat
    var chatData = {
      chatName: "sender",
      users: [sender, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(201).json(FullChat);
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.body.sender } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name avatar email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { accessChat, fetchChats };
