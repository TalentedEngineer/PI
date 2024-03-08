// const mongoose = require("mongoose");

const mongoose = require("mongoose");

const conflictSchema = new mongoose.Schema(
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
    disputeInitiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    disputeSubject: {
      type: String,
    },
    disputeDescription: {
      type: String,
    },
    disputeResponseSubject: {
      type: String,
    },
    disputeResponseDescription: {
      type: String,
    },
    disputeStatus: {
      type: String,
      default: "open",
    },
    disputeResolution: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Conflict = mongoose.model("Conflict", conflictSchema);
module.exports = Conflict;
