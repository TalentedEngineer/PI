const { Router } = require("express");
const {
  allMessages,
  chatHistory,
  sendMessage,
  fetchChatId,
  fetchOrderChatId,
} = require("../controllers/MessageController.js");
const authenticate = require("../middleware/authenticate.js");
const router = Router();

router.use(authenticate);
router.get("/:chatId", allMessages);
router.post("/", sendMessage);
router.post("/chat-history", chatHistory);
router.post("/fetch-chat-id", fetchChatId);
router.post("/fetchOrderChatId", fetchOrderChatId);

module.exports = router;
