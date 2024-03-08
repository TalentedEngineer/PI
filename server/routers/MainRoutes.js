const express = require("express");
const multer = require("multer");
const userRoutes = require("../routers/UserRoutes.js");
const chatRoutes = require("../routers/ChatRoutes.js");
const messageRoutes = require("../routers/MessageRoutes.js");
const gigRoutes = require("../routers/GigRoutes.js");
const nftRoutes = require("../routers/NftRoutes.js");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use("/user", upload.single("avatar"), userRoutes);
router.use("/chat", chatRoutes);
router.use("/message", messageRoutes);
// router.use("/gig", upload.single("images"), gigRoutes);
router.use("/gig", gigRoutes);
router.use("/nft", nftRoutes);

module.exports = router;
