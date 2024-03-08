const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const http = require("http");
const mainRouter = require("./routers/MainRoutes.js");
const setupSocket = require("./utils/socketSetup.js");

const app = express();

// app config
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use("/api", mainRouter);

// socket
const server = http.createServer(app);
setupSocket(server, process.env.CLIENT_URL);

// Start the server, Connect to MongoDB
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch((error) => console.error("MongoDB connection error:", error.message));
