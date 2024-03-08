const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    keywords: {
      type: Array,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
    },
    packages: {
      basic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
      standard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
      premium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    },
    images: {
      type: Array,
    },
    video: {
      type: String,
    },
    hasVideo: {
      type: Boolean,
    },
    requirements: {
      type: Array,
    },
    faqs: {
      type: Array,
    },
    offer3Packages: {
      type: Boolean,
    },
    offerReward: {
      type: Boolean,
    },
    rewardNFT: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("Gig", gigSchema);
module.exports = Gig;
