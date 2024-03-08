import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import { Menu } from "@headlessui/react";
import {
  HeartIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  FlagIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../../constants/ContractDetails";
import Loader from "../../../../utils/Loader";

const IncentiveNFTs = () => {
  const [nfts, setNFTs] = useState([]);
  const [isNFTLoading, setIsNFTLoading] = useState(false);
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
        console.log("INC", meta);
        if (
          meta.data.isRewardItem === true &&
          meta.data.currentOwner._id === user._id &&
          meta.data.creator._id !== user._id
        ) {
          if (meta.data.collection) {
            tempcollections.push(meta.data.collection);
          }
          return {
            ...meta.data,
            likes: i.likes.toString(),
            itemId: Number(i.itemId),
            weiPrice: i.price,
          };
        }

        return null;
      })
    );

    items = items.filter((item) => item !== null);

    items.reverse();
    setNFTs(items);
    console.log(items);
    setIsNFTLoading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const user = useSelector((state) => state.user.user);

  const handleCopyToClipboard = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };
  const getFormattedPrice = (price) => {
    return ethers.utils.formatEther(price.toString());
  };
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

  useEffect(() => {
    fetchLikes();
  }, [nfts]);

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

  const countNFTLikes = (nft) => {
    if (nftLikes.length === 0) {
      return 0;
    }
    const nftLike = nftLikes.filter(
      (like) => like.nftId.toString() === nft.itemId.toString()
    );
    return nftLike.length;
  };

  if (isNFTLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      {nfts.length > 0 ? (
        <div className="container mx-auto mt-15">
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-800 block text-left mb-2">
                Incentive NFTs
              </h2>
            </div>

            <div className={`flex flex-wrap justify-start`}>
              {nfts.map((nft, index) => (
                <div
                  className={`
                    : "w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                `}
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
                        <Link
                          className="bg-nft-primary-light border-nft-primary-light text-white font-medium p-4 rounded-xl hover:bg-nft-primary-dark w-full"
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
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
              Incentive NFTs
            </h2>
            <Link
              to="/services"
              target="_blank"
              className="bg-nft-primary-light text-white w-fit p-3 rounded-full text-sm hover:opacity-80 flex items-center gap-2"
            >
              <span>Explore Services</span>
              <ArrowUpRightIcon className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default IncentiveNFTs;
