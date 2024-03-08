const mongoose = require("mongoose");

// { orderId, buyerId, sellerId, deliveryDescription, deliveryFile, gigId }

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
    },
    deliveryDescription: {
      type: String,
      // required: true,
    },
    deliveryFile: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
