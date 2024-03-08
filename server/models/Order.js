// const mongoose = require("mongoose");

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
    },
    paymentIntent: {
      type: String,
    },
    paymentIntentClientSecret: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDays: {
      type: Number,
    },
    orderEndDate: {
      type: Date,
    },
    isRequirementSent: {
      type: Boolean,
      default: false,
    },
    isDeliverySubmitted: {
      type: Boolean,
      default: false,
    },
    isDeliveryAccepted: {
      type: Boolean,
      default: false,
    },
    isOrderCancelled: {
      type: Boolean,
      default: false,
    },
    isDisputeOpened: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
