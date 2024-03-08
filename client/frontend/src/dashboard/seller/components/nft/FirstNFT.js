import React from "react";
import { HeartIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

const FirstNFT = ({ NFT }) => {
  // console.log(NFT);
  const formatDate = (dateString) => {
    var date = new Date(dateString);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear()
    );
  };

  const getFormattedPrice = (price) => {
    return ethers.utils.formatEther(price.toString());
  };

  return (
    <div className="w-full flex bg-white p-5 rounded-2xl gap-10">
      <div className="w-1/3">
        <div>
          {NFT.fileType === "image" ? (
            <img
              src={NFT.fileUrl}
              alt=""
              className="w-full h-96 object-cover rounded-2xl"
            />
          ) : (
            <video
              src={NFT.fileUrl}
              alt=""
              className="w-full h-96 object-cover rounded-2xl"
            ></video>
          )}
        </div>
      </div>
      <div className="w-2/3">
        <div className="flex flex-col gap-3 text-gray-800">
          <h3 className="font-bold text-3xl">{NFT.name}</h3>
          <p className="text-gray-500 text-sm">
            Published on {formatDate(NFT.createdAt)}
          </p>

          <div className="flex gap-10 items-center">
            <div className="flex items-center justify-start gap-5">
              <img
                src={NFT.creator.avatar}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold">{NFT.creator.name}</span>
                <span className="text-gray-500 font-medium">
                  @{NFT.creator.username}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-start gap-5">
              <img
                src={NFT.collection.image}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold">{NFT.collection.name}</span>
                <span className="text-gray-500 font-medium">
                  {NFT.collection.totalItems} Items
                </span>
              </div>
            </div>
          </div>

          <p className="py-4 block break-words">
            {NFT.description.substring(0, 200)}...
          </p>

          <div className="flex gap-2">
            <div className="justify-center items-center">
              <div className="bg-gray-100 p-6 px-3 flex rounded-xl gap-10 w-fit">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Price Starts From
                  </span>
                  <span className="flex gap-2">
                    <img
                      src={require("../../../../nftmarketplace/assets/eth.png")}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-bold text-xl">
                      {getFormattedPrice(NFT.weiPrice)} ETH
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Creator Royalty
                  </span>
                  <span className="flex gap-2 items-center">
                    <TrophyIcon className="w-8 h-8 object-contain text-yellow-500" />
                    <span className="font-bold text-xl">{NFT.royalties} %</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="">
              <div className=" gap-2 items-center">
                {NFT.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 font-medium text-sm px-3 p-2 rounded-xl inline-block mr-3 mb-2"
                  >
                    {trait.traitName} : {trait.traitType}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2">
            {/* <button className="rounded-xl text-nft-primary-light bg-purple-200 p-3 flex gap-3 items-center">
              <HeartIcon className="h-6 w-6 fill-nft-primary-light" />
              <span className="font-semibold">{NFT.likes}</span>
            </button> */}

            <div className="flex items-center gap-4">
              <Link
                className="bg-nft-primary-light border border-nft-primary-light text-white font-bold p-4 rounded-xl px-10 hover:opacity-80"
                to={`/marketplace/nft/${NFT.tokenId}`}
                target="_blank"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstNFT;
