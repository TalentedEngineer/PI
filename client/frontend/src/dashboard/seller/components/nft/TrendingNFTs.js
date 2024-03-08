import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const TrendingNFTs = () => {
  const [trendingNFTs, setTrendingNFTs] = React.useState([
    {
      id: 1,
      name: "Dream World #50",
      price: "5.32",
      currency: "BTC",
      image: require("../../../../website/assets/trend1.jpg"),
      owner: {
        name: "John Doe",
      },
      loss: {
        value: 2500,
        currency: "USD",
      },
      currentBid: {
        value: 3.423,
        currency: "ETH",
      },
    },
    {
      id: 2,
      name: "Dream World #50",
      price: "5.32",
      currency: "BTC",
      image: require("../../../../website/assets/trend2.jpg"),
      owner: {
        name: "John Doe",
      },
      loss: {
        value: 2500,
        currency: "USD",
      },
      currentBid: {
        value: 3.423,
        currency: "ETH",
      },
    },
    {
      id: 3,
      name: "Dream World #50",
      price: "5.32",
      currency: "BTC",
      image: require("../../../../website/assets/trend3.webp"),
      owner: {
        name: "John Doe",
      },
      loss: {
        value: 2500,
        currency: "USD",
      },
      currentBid: {
        value: 3.423,
        currency: "ETH",
      },
    },
  ]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
          Trending NFTs
        </h2>

        <button className="text-nft-primary-light font-medium text-sm block">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {trendingNFTs.map((nft, index) => (
          <div
            className="decoration-transparent shadow-sm shadow-gray-100 rounded-xl transition-all duration-300 p-0 block hover:scale-105 transform bg-white"
            key={index}
          >
            <div className="relative shadow-lg rounded-xl shadow-gray-200 text-gray-800">
              <div className="max-w-sm rounded-xl overflow-hidden p-2">
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white hover:bg-nft-primary-light text-gray-500 rounded-full group">
                    <HeartIcon className="w-4 h-4 group-hover:stroke-white group-hover:fill-white" />
                  </button>
                </div>

                <img
                  src={nft.image}
                  alt="Card Imagea"
                  className="h-44 w-full object-cover rounded-xl"
                />

                <div className="flex flex-col justify-between gap-6 py-3 pb-0">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 items-center text-gray-500 text-sm">
                        <span>{nft.owner.name}</span>
                        <span>
                          <CheckBadgeIcon className="w-4 h-4 text-nft-primary-dark" />
                        </span>
                      </div>
                      <div className="flex items-center -space-x-3">
                        <img
                          src={require("../../../../website/assets/man.jpg")}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border-2 border-white"
                        />
                        <img
                          src={require("../../../../website/assets/authbg.jpg")}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                    </div>

                    <div className="text-lg text-gray-800 font-semibold">
                      {nft.name}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
                      <div>
                        <span>Price</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-yellow-100 p-1">
                            <img
                              src={require("../../../../nftmarketplace/assets/bitcoin.png")}
                              alt=""
                              className="w-4 h-4 object-contain"
                            />
                          </div>
                          <div className="flex gap-1">
                            <span className="font-semibold text-gray-800">
                              {nft.price}
                            </span>
                            <span>{nft.currency}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-gray-500 text-xs">
                            - {nft.loss.currency} {nft.loss.value}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <div>
                        <span>Current Bid</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-gray-100 p-1">
                          <img
                            src={require("../../../../nftmarketplace/assets/eth.png")}
                            alt=""
                            className="w-4 h-4 object-contain"
                          />
                        </div>
                        <div className="flex gap-1">
                          <span className="font-semibold text-gray-800">
                            {nft.currentBid.value}
                          </span>
                          <span>{nft.currentBid.currency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="bg-nft-primary-light text-white w-full p-3 rounded-xl text-sm hover:opacity-80">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNFTs;
