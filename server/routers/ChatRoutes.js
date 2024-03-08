const { Router } = require("express");
const { accessChat, fetchChats } = require("../controllers/ChatController.js");
const authenticate = require("../middleware/authenticate.js");
const router = Router();

router.use(authenticate);
router.post("/",accessChat);
router.get("/",fetchChats);

module.exports = router;
