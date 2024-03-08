const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalItems: {
      type: Number,
      default: 0,
    },
    totalItemsSold: {
      type: Number,
      default: 0,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    creatorWalletAddress: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
