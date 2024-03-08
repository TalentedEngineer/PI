const mongoose = require("mongoose");

const nftViewSchema = new mongoose.Schema(
  {
    nftId: { type: String, required: true },
    totalViews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const NFTView = mongoose.model("NFTView", nftViewSchema);
module.exports = NFTView;
