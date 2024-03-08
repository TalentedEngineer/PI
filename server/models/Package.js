const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    deliveryTime: {
      type: Number,
    },
    revisions: {
      type: Number,
    },
    support: {
      type: Boolean,
    },
    extraDeliveryTime: {
      type: Number,
    },
    extraDeliveryPrice: {
      type: Number,
    },
    extraRevisions: {
      type: Number,
    },
    extraRevisionPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
