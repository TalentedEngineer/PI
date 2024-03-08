import React, { useEffect, useState } from "react";
import { TrophyIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  FlagIcon,
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../../constants/ContractDetails";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Menu } from "@headlessui/react";

const PurchasedNFTs = ({ user }) => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resellError, setResellError] = useState(null);
  const [resellModalOpen, setresellModalOpen] = useState(false);
  const [resellNFTItem, setresellNFTItem] = useState(null);
  const [newPrice, setNewPrice] = useState("");

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
      const data = await marketplaceContract.fetchPurchasedNFTs();

      console.log("purchased", data);

      let items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await marketplaceContract.tokenURI(i.itemId);
          const meta = await axios.get(tokenUri);
          console.log("meta", meta.data);
          if (meta.data.isRewardItem === false) {
            return {
              ...meta.data,
              likes: i.likes.toString(),
              itemId: i.itemId.toString(),
              weiPrice: i.price,
            };
          }
          return null;
        })
      );

      items = items.filter((item) => item !== null);

      console.log("purchased", items);

      items.reverse();
      setNFTs(items);
    } catch (error) {
      console.log(`Error fetching NFTs: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNFTs();
    // console.log(nfts);
  }, []);

  const resellNFT = async (nftItem) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const { marketplaceContract } = fetchContract(signer);
      const priceFormatted = ethers.utils.parseUnits(
        newPrice.toString(),
        "ether"
      );
      let listingPrice = await marketplaceContract.getListingPrice();

      listingPrice = listingPrice.toString();
      let transaction = await marketplaceContract.resellToken(
        nftItem.itemId,
        priceFormatted,
        {
          value: listingPrice,
        }
      );
      await transaction.wait();
      fetchNFTs();
      toast.success("NFT listed successfully");
    } catch (error) {
      if (error.code) {
        toast.error(error.code);
      }
      if (error.code === 4001) {
        toast.error("Transaction rejected by the user");
      }
      console.log(`Error listing NFT: ${error}`);
    }
  };

  const getFormattedPrice = (price) => {
    return ethers.utils.formatEther(price.toString());
  };

  const handleCopyToClipboard = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const loader = (
    <div className="flex w-full justify-center items-center m-auto gap-1 flex-col my-10">
      <div className="border-t-gray-700 border-2 w-7 h-7 flex items-center justify-center rounded-full animate-spin"></div>
    </div>
  );

  const [nftLikes, setNFTLikes] = useState([]);

  const fetchLikes = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/getLikes`,
        {
          nftIds: nfts.map((nft) => nft.itemId),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNFTLikes(response.data.totalNFTLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const countNFTLikes = (nft) => {
    if (nftLikes.length === 0) {
      return 0;
    }
    const nftLike = nftLikes.filter(
      (like) => like.nftId.toString() === nft.itemId.toString()
    );
    return nftLike.length;
  };

  const checkIfUserLikedNFT = (nft) => {
    if (nftLikes.length === 0 || !user) {
      return false;
    }
    const nftLike = nftLikes.filter(
      (like) =>
        like.nftId.toString() === nft.itemId.toString() &&
        like.userId.toString() === user._id.toString()
    );
    return nftLike.length > 0;
  };

  useEffect(() => {
    if (nfts.length > 0) fetchLikes();
  }, [nfts]);

  const addOrRemoveLike = async (nft) => {
    if (!user) {
      toast.error("Please login to like this NFT");
      return;
    }

    try {
      const nftLike = nftLikes.filter(
        (like) =>
          like.nftId.toString() === nft.itemId.toString() &&
          like.userId.toString() === user._id.toString()
      );

      if (nftLike.length > 0) {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/nft/like/${nftLike[0]._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.jwtToken,
            },
          }
        );
        if (response.data.error === false) {
          const newNFTLikes = nftLikes.filter(
            (like) => like._id.toString() !== nftLike[0]._id.toString()
          );
          setNFTLikes(newNFTLikes);
          toast.success("Like removed successfully");
        }
        return;
      } else {
        // add like
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/nft/like`,
          {
            nftId: nft.itemId,
            userId: user._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.jwtToken,
            },
          }
        );
        if (response.data.error === false) {
          const newNFTLikes = [...nftLikes, response.data.nftLike];
          setNFTLikes(newNFTLikes);
          toast.success("NFT liked successfully");
        }
      }
    } catch (error) {
      toast.error("Error liking NFT");
      console.log(error);
    }
  };

  if (loading) {
    return loader;
  }

  return (
    <>
      <Toaster />
      {nfts.length > 0 ? (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800 mb-7">
              Purchased NFTs
            </h2>
            <button className="text-nft-primary-light font-medium text-sm block">
              View All
            </button>
          </div>

          <div className="flex flex-wrap justify-start">
            {nfts.map((nft, index) => (
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 p-2"
                key={index}
              >
                <div className="w-full h-full decoration-transparent rounded-xl shadow-xl transition-colors duration-300 relative group bg-white">
                  <div
                    className="h-auto bg-gray-100 overflow-hidden rounded-xl"
                    style={{ height: "300px" }}
                  >
                    {nft.fileType === "image" ? (
                      <img
                        src={nft.fileUrl}
                        alt={nft.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <video controls width="100%" height="100%">
                        <source src={nft.fileUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  <div className="p-2">
                    <div className="flex justify-between items-center -mt-8 z-20">
                      <div className="flex -space-x-3">
                        {nft.ownershipHistory.map((history, index) => (
                          <img
                            key={index}
                            className="w-12 h-12 rounded-full border-2 object-cover border-white z-20"
                            src={history.avatar}
                            alt="User Imageas"
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <Menu as="div" className="relative text-left">
                          <div>
                            <Menu.Button className="font-black text-xl bg-white rounded-full w-12 h-12 z-50 shadow-lg hover:bg-gray-100 text-gray-700">
                              <span>···</span>
                            </Menu.Button>
                          </div>

                          <Menu.Items className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-xl bg-white shadow-xl focus:outline-none  p-1 border border-gray-50">
                            <Menu.Item>
                              <button
                                className="text-gray-600 p-3 rounded-xl hover:bg-gray-100 text-sm w-full text-left flex gap-2 items-center font-medium"
                                onClick={() => {
                                  handleCopyToClipboard(
                                    `${window.location.origin}/nft/${nft.itemId}`
                                  );
                                  toast.success("Link copied to clipboard");
                                }}
                              >
                                <ClipboardDocumentListIcon className="w-5 h-5" />
                                <span>Copy Link</span>
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                to={nft.fileUrl}
                                target="_blank"
                                className="text-gray-600 p-3 rounded-xl hover:bg-gray-100 text-sm w-full text-left flex gap-2 items-center font-medium"
                              >
                                <PhotoIcon className="w-5 h-5" />
                                <span>Open Original</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button className="text-gray-600 p-3 rounded-xl hover:bg-gray-100 text-sm w-full text-left flex gap-2 items-center font-medium">
                                <FlagIcon className="w-5 h-5" />
                                <span>Report</span>
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="text-xl font-bold tracking-tight text-black">
                        {nft.name}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-2 justify-between">
                        <div>
                          <span className="block text-xs text-center">
                            Price
                          </span>
                          <span className="font-bold text-sm text-black">
                            <span className="text-gray-500 pr-1 font-medium">
                              {getFormattedPrice(nft.weiPrice)}
                            </span>
                            ETH
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs text-center">
                            Collection
                          </span>
                          <Link
                            to={`/marketplace/collection/${nft.collection._id}`}
                            target="_blank"
                            className="text-nft-primary-light font-semibold"
                          >
                            <span>{nft.collection.name}</span>
                            <ArrowUpRightIcon className="w-4 h-4 inline-block" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-sm mt-4 text-center">
                      <button
                        className="bg-nft-primary-light border border-nft-primary-light text-white font-medium p-4 rounded-xl hover:opacity-80 w-full"
                        onClick={() => {
                          setresellNFTItem(nft);
                          setresellModalOpen(true);
                        }}
                      >
                        Resell NFT
                      </button>
                      <Link
                        className="bg-gray-200 font-medium p-4 rounded-xl hover:bg-gray-300 w-full text-gray-800"
                        to={`/marketplace/nft/${nft.itemId}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="absolute top-2 left-2">
                    <div className="bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 text-black overflow-hidden p-2">
                      <div>
                        <div className="flex rounded-2xl justify-evenly items-center">
                          <div className="flex flex-col gap-1 items-center">
                            <span className="flex gap-1">
                              <img
                                src={require("../../../../nftmarketplace/assets/eth.png")}
                                alt=""
                                className="w-5 h-5 object-contain"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`rounded-xl p-2 flex gap-1 items-center absolute top-2 right-2 text-sm font-semibold ${
                      checkIfUserLikedNFT(nft)
                        ? "bg-nft-primary-light text-white"
                        : "text-nft-primary-light bg-white"
                    }`}
                    onClick={() => addOrRemoveLike(nft)}
                  >
                    <HeartIcon className="w-5 h-5" />
                    <span
                      className={!checkIfUserLikedNFT(nft) && "text-gray-700"}
                    >
                      {nftLikes && countNFTLikes(nft)}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
            {nfts.map((nft, index) => (
              <div
                className="decoration-transparent shadow-sm shadow-gray-100 rounded-xl transition-all duration-300 p-0 block hover:scale-105 transform bg-white"
                key={index}
              >
                <div className="relative shadow-lg rounded-2xl shadow-gray-200 text-gray-800">
                  <div className="rounded-2xl overflow-hidden">
                    <div className="h-64 w-full relative">
                      {nft.fileType === "image" ? (
                        <img
                          src={nft.fileUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={nft.fileUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        ></video>
                      )}

                      <div className="absolute bottom-0 w-full p-4">
                        <div className="bg-white rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 text-black p-4 overflow-hidden">
                          <div>
                            <div className="flex rounded-2xl justify-evenly items-center">
                              <div className="flex flex-col gap-1 items-center">
                                <span className="text-sm font-medium">
                                  Price
                                </span>
                                <span className="flex gap-1">
                                  <img
                                    src={require("../../../../nftmarketplace/assets/eth.png")}
                                    alt=""
                                    className="w-5 h-5 object-contain"
                                  />
                                  <span className="font-semibold text-sm">
                                    {getFormattedPrice(nft.weiPrice)} ETH
                                  </span>
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 items-center">
                                <span className="text-sm font-medium">
                                  Creator Royalty
                                </span>
                                <span className="flex gap-1 items-center">
                                  <TrophyIcon className="w-5 h-5 object-contain text-gray-800 fill-gray-800" />
                                  <span className="font-semibold text-sm">
                                    {nft.royalties} %
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="text-lg text-gray-800 font-semibold">
                          {nft.name}
                        </div>

                        <button className="rounded-xl text-nft-primary-light bg-white p-2 flex gap-1 items-center absolute top-2 right-2 text-sm">
                          <HeartIcon className="h-5 w-5 fill-nft-primary-light" />
                          <span className="font-semibold">12</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center justify-start gap-2 mb-5">
                          <img
                            src={nft.currentOwner.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 font-semibold">
                              {nft.currentOwner.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-start gap-2 mb-5">
                          <img
                            src={nft.collection.image}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 font-semibold">
                              {nft.collection.name.substring(0, 13)}...
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <button
                          className="bg-nft-primary-light border border-nft-primary-light text-white font-medium p-3 rounded-xl hover:opacity-80 w-full"
                          onClick={() => {
                            setresellNFTItem(nft);
                            setresellModalOpen(true);
                          }}
                        >
                          Resell NFT
                        </button>
                        <Link
                          className="bg-gray-200 font-medium p-3 rounded-xl hover:opacity-80 w-full text-gray-800"
                          to={`/marketplace/nft/${nft.itemId}`}
                          target="_blank"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className="flex items-center gap-4 justify-center">
            <button className="bg-nft-primary-light border border-nft-primary-light text-white font-bold p-3 rounded-xl px-10 hover:opacity-80">
              View All
            </button>
          </div> */}

          <div
            className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
              resellModalOpen ? "flex" : "hidden"
            }`}
          >
            <div className="w-1/3 bg-white p-4 rounded-xl shadow-xl h-fit mt-16 relative">
              <h2 className="block font-bold text-xl text-gray-800">
                Resell Your NFT
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Please note that you will be charged for listing your NFT.
              </p>
              <button
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
                onClick={() => setresellModalOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <div className="relative">
                <span className="absolute top-2 left-2">
                  <img
                    src={require("../../../../nftmarketplace/assets/eth.png")}
                    alt=""
                    className="w-5"
                  />
                </span>
                <input
                  type="number"
                  className="w-full outline-none text-sm placeholder:text-gray-400 placeholder:font-medium font-semibold px-2 pl-10 p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border rounded-xl bg-gray-100"
                  placeholder="Enter New Price"
                  value={newPrice}
                  min={0}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>

              <div className="text-red-500 text-sm mt-2">{resellError}</div>

              <button
                className="w-full bg-nft-primary-light text-white p-3 mt-5 rounded-xl hover:opacity-80"
                onClick={() => {
                  setresellModalOpen(false);
                  resellNFT(resellNFTItem);
                }}
              >
                Resell NFT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
              Purchased NFTs
            </h2>
            <Link
              to="/dashboard/newnft"
              className="bg-nft-primary-light text-white w-fit p-3 rounded-full text-sm hover:opacity-80 flex items-center gap-2"
            >
              <span>Explore NFTs Now</span>
              <ArrowUpRightIcon className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchasedNFTs;
