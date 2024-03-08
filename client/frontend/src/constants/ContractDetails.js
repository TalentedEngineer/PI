// 0x5FbDB2315678afecb367f032d93F642f64180aa3

import nftMarketplace from "./Marketplace.json";
import nft from "./NFT.json";

export const NFTMarketplaceContractAddress =
  process.env.REACT_APP_MARKETPLACE_SMART_CONTRACT_ADDRESS;
export const NFTMarketplaceContractABI = nftMarketplace.abi;

export const NFTContractAddress =
  process.env.REACT_APP_NFT_SMART_CONTRACT_ADDRESS;
export const NFTContractABI = nft.abi;
