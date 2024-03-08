import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../../constants/ContractDetails";
import { useSelector } from "react-redux";

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

    const items = await Promise.all(
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
    // console.log("TopCreators: ", creatorDetailsArray);
    setIsNFTLoading(false);
  };

  // router.post("/getWalletSales", getWalletSales);
  const [creatorSales, setCreatorSales] = useState([]);

  const fetchCreatorSales = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/getAllCreatorsSales`,
        {
          creators: TopCreators.map((creator) => creator.walletAddress),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCreatorSales(response.data.totalSales);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    if (TopCreators.length > 0) fetchCreatorSales();
  }, [TopCreators]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
          Top Creators
        </h2>

        <button className="text-nft-primary-light font-medium text-sm block">
          View All
        </button>
      </div>

      <div className="rounded-xl p-0 bg-white">
        <div className="shadow-lg rounded-xl shadow-gray-200">
          {TopCreators.map((creator, index) => (
            <div
              className="flex justify-between items-center text-sm p-2 text-gray-800 hover:bg-gray-100 cursor-pointer py-3"
              key={index}
            >
              <div className="flex h-full gap-2">
                <div>
                  <img
                    src={creator.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between h-fulls">
                  <span className="font-semibold">{creator.name}</span>
                  <span className="text-gray-500 text-xs">
                    {creator.count} Items
                  </span>
                </div>
              </div>
              <div className="h-full">
                <div className="flex flex-col justify-between h-full gap-1">
                  <span className="font-semibold">
                    {Number(creatorSales[creator.walletAddress] || 0).toFixed(
                      4
                    )}{" "}
                    ETH
                  </span>
                  <span className="text-gray-500 text-xs">Total ETH</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
