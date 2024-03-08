import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormStep } from "../../../../redux/slices/NewGigSlice";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../../constants/ContractDetails";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { create as ipfsHttpClient } from "ipfs-http-client";

const NFTTab = ({
  offerReward,
  setOfferReward,
  selectedNFT,
  setSelectedNFT,
}) => {
  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.gig.formStep);
  const [isLoading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState([]);

  const [errors, setErrors] = useState({});
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [NFTStatusMessage, setNFTStatusMessage] = useState("");

  const projectId = process.env.REACT_APP_INFURA_API_KEY;
  const projectSecretKey = process.env.REACT_APP_INFURA_API_KEY_SECRET;
  const encoder = new TextEncoder();
  const data = encoder.encode(`${projectId}:${projectSecretKey}`);
  const auth = `Basic ${btoa(String.fromCharCode.apply(null, data))}`;

  const client = ipfsHttpClient({
    host: process.env.REACT_APP_INFURA_HOST,
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const handlePrev = () => {
    dispatch(setFormStep(formStep - 1));
  };

  const validateForm = () => {
    const errors = {};

    if (nfts.length === 0) {
      setOfferReward(false);
      errors.message = "";
      dispatch(setFormStep(formStep + 1));
      return;
    }

    if (offerReward) {
      if (!selectedNFT) {
        errors.message = "Please select an NFT reward for your Gig";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const connectingWithSmartContract = async () => {
    try {
      const w3modal = new Web3Modal();
      const connection = await w3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = await provider.getSigner();

      // et the crypto wallet address
      // const address = await signer.getAddress();

      const { marketplaceContract } = fetchContract(signer);
      return { marketplaceContract };
    } catch (error) {
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

  const updateIsRewradItem = async (marketplaceContract, itemId) => {
    await marketplaceContract.updateIsRewardItem(itemId, true);
    updateTokenURI(marketplaceContract, selectedNFT);
  };

  const updateTokenURI = async (marketplaceContract, nft) => {
    const data = JSON.stringify({
      name: nft.name,
      description: nft.description,
      creator: nft.creator,
      currentOwner: nft.currentOwner,
      ownershipHistory: nft.ownershipHistory,
      fileUrl: nft.fileUrl,
      fileType: nft.fileType,
      price: nft.price,
      currency: "ETH",
      category: nft.category,
      traits: nft.traits,
      collection: nft.collection,
      royalties: nft.royalties,
      createdAt: nft.createdAt,
      updatedAt: new Date().toISOString(),
      isRewardItem: true,
    });
    const added = await client.add(data);
    const newUrl = `https://nfluencer.infura-ipfs.io/ipfs/${added.path}`;
    await marketplaceContract.updateTokenURI(nft.tokenId, newUrl);
  };

  const handleSubmit = async () => {
    setIsProcessLoading(true);
    if (validateForm()) {
      try {
        const { marketplaceContract } = await connectingWithSmartContract();
        await updateTokenURI(marketplaceContract, selectedNFT);
        setIsProcessLoading(false);

        // await updateIsRewradItem(marketplaceContract, selectedNFT.tokenId);
        dispatch(setFormStep(formStep + 1));
      } catch (error) {
        setIsProcessLoading(false);
        console.log(`Error updating isRewardItem: ${error}`);

        if (error.code === 4001) {
          setErrors({
            message: "You have rejected the transaction",
          });
          return;
        }

        if (error.code) {
          setErrors({
            message: error.message.split("(error=")[0],
          });
          return;
        }

        setErrors({
          message: "Error updating isRewardItem",
        });
      }
    }
    setIsProcessLoading(false);
  };

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const { marketplaceContract } = fetchContract(signer);
      const data = await marketplaceContract.fetchItemsCreated();

      let items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await marketplaceContract.tokenURI(i.itemId);
          const meta = await axios.get(tokenUri);
          if (meta.data.isRewardItem === false) {
            return {
              ...meta.data,
              likes: i.likes.toString(),
              tokenId: i.itemId.toString(),
              weiPrice: i.price,
            };
          }
          return null;
        })
      );

      items = items.filter((i) => i !== null);
      console.log(items);
      items.reverse();
      setNFTs(items);
    } catch (error) {
      console.log(`Error fetching NFTs: ${error}`);
    }
    setLoading(false);
  };

  const handleOfferRewardToggle = async (e) => {
    setOfferReward(e.target.checked);
    if (e.target.checked === true) {
      fetchNFTs();
    } else {
      setNFTs([]);
      setSelectedNFT(null);
    }
  };

  const handleNFTSelect = (nft) => {
    if (selectedNFT && selectedNFT.tokenId === nft.tokenId) {
      setSelectedNFT(null);
    } else {
      setSelectedNFT(nft);
    }
  };

  return (
    <div id="description">
      <div className="p-4 text-3xl border-b mb-6 pt-2 text-gray-800 font-normal border-gray-100">
        <h2>NFT Reward</h2>
      </div>

      <div className="flex justify-between">
        <div className="text-gray-600 p-4 md:w-2/3 w-full">
          <div className="flex justify-between items-center">
            <div className="font-bold text-sm mb-2 block">
              Offer NFT Reward with the Gig
            </div>
            <div className="flex items-center gap-2 relative">
              {isLoading && (
                <div className="absolute w-14 h-10 bg-white right-0 z-50 bg-opacity-60"></div>
              )}

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={offerReward}
                  onChange={(e) => handleOfferRewardToggle(e)}
                  disabled={isLoading}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nft-primary-light"></div>
              </label>
            </div>
          </div>

          {offerReward && nfts && (
            <>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 w-full">
                {nfts.map((nft, index) => (
                  <button
                    className={`flex gap-2 w-full flex-row border text-gray-800 rounded-xl p-3 text-md font-bold items-center hover:bg-gray-100 ${
                      selectedNFT && selectedNFT.tokenId === nft.tokenId
                        ? "bg-nft-primary-transparent ring-2 ring-nft-primary-light"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleNFTSelect(nft)}
                  >
                    <img
                      src={nft.fileUrl}
                      alt={nft.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="text-left text-sm flex items-start justify-start flex-col gap-3">
                      <div>{nft.name}</div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-gray-500 font-normal">
                            Price
                          </span>
                          <span className="text-xs font-medium text-gray-800">
                            {nft.price} ETH
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-xs text-gray-500 font-normal">
                            Collection
                          </span>
                          <span className="text-xs font-medium text-gray-800">
                            {nft.collection.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {nfts.length === 0 && (
                <div className="w-full h-full flex justify-center items-center text-sm font-semibold">
                  No NFTs found in your Crypto Wallet Account.
                </div>
              )}
            </>
          )}

          {errors.message && (
            <div className="text-red-500 text-sm mt-2">{errors.message}</div>
          )}
        </div>

        <div className="p-4 md:w-1/3 md:block hidden">
          <div className="flex justify-center items-center sticky top-0">
            <div className=" bg-purple-200 w-full p-3 rounded-xl">
              <div className="text-center -mt-8">
                <span className="rounded-full bg-nft-primary-light p-2 inline-block">
                  <LightBulbIcon className=" w-7 h-7 text-white" />
                </span>
              </div>

              <div>
                <h2 className="text-center font-semibold mb-3 text-gray-600">
                  Start Defining Your Gig
                </h2>
                <div>
                  <ul className="list-disc px-7 pb-0 pt-0 text-md text-gray-600">
                    <li className="mb-2">Choose a catchy title.</li>
                    <li className="mb-2">
                      Choose a category and subcategory that best describe
                    </li>
                    <li className="mb-2">
                      Add metadata tags to help buyers find your gig in
                    </li>
                    <li className="mb-2">
                      Add tags that describe your gig. Use letters and numbers.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-2/3 p-4 pb-0">
        {/* {!isProcessLoading && (
          <div className="items-center flex justify-center text-sm w-full text-gray-500">
            <span className="border-t-gray-100 border-2 animate-spin h-4 w-4 rounded-full border-gray-500"></span>
            <span className="ml-2">{NFTStatusMessage}</span>
          </div>
        )} */}

        <div className="flex w-full justify-between mt-5">
          <div>
            <button className="rounded-xl px-6 py-3 bg-gray-200 text-gray-800 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors border border-gray-300">
              Cancel
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
              onClick={handleSubmit}
              disabled={isProcessLoading}
            >
              {isProcessLoading ? (
                <div className="flex items-center gap-2">
                  <span className="border-t-gray-100 border-2 animate-spin h-4 w-4 rounded-full border-gray-500"></span>
                  <span>Processing...</span>
                </div>
              ) : (
                "Save and Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTTab;
