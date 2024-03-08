const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    languages: {
      type: String,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    validationToken: {
      type: String,
    },
    emailValidated: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    jwtToken: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
