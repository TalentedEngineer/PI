// const mongoose = require("mongoose");

const mongoose = require("mongoose");

const cancelOrderSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestInitiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    cancelReason: {
      type: String,
    },
    cancelStatus: {
      type: String,
      // enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const OrderCancel = mongoose.model("OrderCancel", cancelOrderSchema);
module.exports = OrderCancel;
