const { Server } = require("socket.io");
const Message = require("../models/Message.js");
const Chat = require("../models/Chat.js");
const Notification = require("../models/Notification.js");

const socketSetup = (server, clientURL) => {
  const io = new Server(server, {
    cors: {
      origin: clientURL,
    },
  });

  const saveMessage = async (data) => {
    if (data.chatType === "order") {
      const message = new Message({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text,
        chat: data.chatId,
        chatType: data.chatType,
      });

      await message.save();

      return message;
    } else {
      const message = new Message({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text,
        chat: data.chatId,
        chatType: "single",
      });

      await message.save();
      return message;
    }
  };

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("message", async (data) => {
      try {
        const message = await saveMessage(data);
        const chat = await Chat.findByIdAndUpdate(message.chat, {
          latestMessage: message._id,
        });

        if (message && chat) {
          io.emit("message", message);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      io.emit("user-disconnected", socket.id);
    });

    // for notification watch for notification model
    socket.on("notification", async (data) => {
      try {
        const notification = new Notification({
          sender: data.sender,
          receiver: data.receiver,
          type: data.type,
          content: data.content,
          orderId: data.orderId,
        });

        await notification.save();

        io.emit("notification", data);
      } catch (error) {
        console.log(error);
      }
    });

    // const notificationStream = Notification.watch();

    // notificationStream.on("change", (data) => {
    //   console.log(data);
    //   io.emit("notification", data);
    // });
  });
};

module.exports = socketSetup;
