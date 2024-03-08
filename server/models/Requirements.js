const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
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
    // requirements is an object with key value pairs
    requirements: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Requirement = mongoose.model("Requirement", requirementSchema);
module.exports = Requirement;
