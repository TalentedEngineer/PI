import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../constants/ContractDetails";

const TopCreators = () => {
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [TopCreators, setTopCreators] = useState([]);

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const fetchNFTs = async () => {
    setIsNFTLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );

    const { marketplaceContract } = fetchContract(provider);
    const fetchedMarketItems = await marketplaceContract.fetchMarketItems();
    const tempcollections = [];

    let items = await Promise.all(
      fetchedMarketItems.map(async (i) => {
        const tokenUri = await marketplaceContract.tokenURI(i.itemId);
        const meta = await axios.get(tokenUri);
        if (meta.data.collection) {
          tempcollections.push(meta.data.collection);
        }
        return {
          ...meta.data,
          likes: i.likes.toString(),
          itemId: Number(i.itemId),
          weiPrice: i.price,
        };
      })
    );

    const creatorDetails = {};

    items.forEach((nft) => {
      const creatorName = nft.creator.name;
      if (creatorDetails[creatorName]) {
        creatorDetails[creatorName].count++;
      } else {
        creatorDetails[creatorName] = {
          count: 1,
          walletAddress: nft.creator.walletAddress,
          image: nft.creator.avatar,
        };
      }
    });

    const creatorDetailsArray = Object.entries(creatorDetails).map(
      ([name, details]) => ({ name, ...details })
    );

    creatorDetailsArray.sort((a, b) => b.count - a.count);
    setTopCreators(creatorDetailsArray.slice(0, 9));
    setIsNFTLoading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-28">
        <div className="text-center mb-10">
          <div className="flex items-center justify-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl mr-4">
              Top Creators
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {TopCreators.map((creator) => (
              <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
                <img
                  src={creator.image}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="font-semibold">{creator.name}</span>
                    <span className="text-sm text-gray-500">
                      {creator.walletAddress.substring(0, 7) +
                        "..." +
                        creator.walletAddress.substring(
                          creator.walletAddress.length - 7,
                          creator.walletAddress.length
                        )}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Total Items</span>
                    <span className="text-sm text-gray-500">
                      {creator.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
