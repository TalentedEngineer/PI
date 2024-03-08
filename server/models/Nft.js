const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    fileType: { type: String, required: true },
    price: { type: String, required: true },
    etherPrice: { type: String, required: true },
    currency: { type: String, required: true },
    category: { type: String, required: true },
    royalties: { type: Number, required: true },
    traits: { type: Array, required: true },
    collectionData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    }, // Add collection field
    from: { type: String, required: true },
    to: { type: String, required: true },
    tokenId: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionHash: { type: String, required: true },
    gasUsed: { type: String, required: true },
    effectiveGasPrice: { type: String, required: true },
    blockHash: { type: String, required: true },
    nftUrl: { type: String, required: true },
    walletAddress: { type: String },
    isRewardItem: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const NFT = mongoose.model("NFT", nftSchema);

module.exports =  NFT;
