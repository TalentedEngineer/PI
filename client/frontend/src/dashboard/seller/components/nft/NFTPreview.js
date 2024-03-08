import React from "react";
import { HeartIcon, TrophyIcon } from "@heroicons/react/24/outline";

const NFTPreview = ({
  name,
  price,
  royalties,
  preview,
  traits,
  isVideoFile,
  category,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 sticky top-0">
      <div className="decoration-transparent hover:bg-purple-50  rounded-2xl shadow-sm shadow-gray-100 p-3 px-4 border transition-colors duration-300">
        <div className="w-80">
          <div className="font-extrabold text-lg pb-3 mb-0">NFT Preview</div>

          <div className="flex justify-between items-center mb-5">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 object-cover border-white"
                src={require("../../../../nftmarketplace/assets/user1.jpeg")}
                alt="User Imageas"
              />
              <img
                className="w-8 h-8 rounded-full border-2 object-cover border-white"
                src={require("../../../../nftmarketplace/assets/user2.jpeg")}
                alt="User Imageas"
              />
              <img
                className="w-8 h-8 rounded-full border-2 object-cover border-white"
                src={require("../../../../nftmarketplace/assets/user3.webp")}
                alt="User Imageas"
              />
            </div>
            <div className="flex items-center justify-center">
              <button className="font-bold text-xl hover:bg-gray-200 rounded-full w-7 h-7">
                <span>···</span>
              </button>
            </div>
          </div>

          <div
            className="h-auto rounded-xl bg-gray-100 overflow-hidden"
            style={{ height: "300px" }}
          >
            {preview && (
              <div className="w-full h-full flex justify-center items-center">
                {isVideoFile ? (
                  <video controls width="100%" height="100%">
                    <source src={preview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={preview}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
          </div>
          <div className="py-2 pt-3">
            <h3 className="text-lg font-bold tracking-tight text-gray-800">
              {name}
            </h3>

            <div className="flex items-center justify-between my-2">
              <div>
                <div className="flex items-center text-gray-500 text-sm gap-2">
                  <img
                    src={require("../../../../nftmarketplace/assets/eth.png")}
                    alt="sd"
                    className="h-5 w-5 object-contain"
                  />
                  <span>
                    from
                    <span className="font-bold text-sm text-gray-800 ml-2">
                      {price} ETH
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                </span>
                <span className="textsm font-semibold">{royalties}%</span>
              </div>

              <div>
                <span className="block bg-nft-primary-light text-white p-1 px-2 font-normal text-sm rounded-full">
                  {category}
                </span>
              </div>
            </div>

            {traits.map((t, index) => (
              <div
                className="p-1 px-2 border-gray-200 border inline-block rounded-full mr-1 mb-1 text-xs font-medium"
                key={index}
              >
                <div className="flex gap-1">
                  <span>{t.traitType}</span>
                  <span>:</span>
                  <span>{t.traitName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPreview;
