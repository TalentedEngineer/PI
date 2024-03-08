import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import { ethers } from "ethers";
import axios from "axios";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../constants/ContractDetails";
import {
  HeartIcon,
  EyeIcon,
  ShareIcon,
  ArrowPathIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  PresentationChartLineIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
  TagIcon,
  ArrowTrendingUpIcon,
  QueueListIcon,
  ChevronUpIcon,
  CpuChipIcon,
  ListBulletIcon,
  // Square3Stack3DIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowTopRightOnSquareIcon,
  Square3Stack3DIcon,
  PhotoIcon,
  ArrowUpRightIcon,
  FlagIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import PriceHistory from "../components/nft/PriceHistory";
import { Disclosure, Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Web3Modal from "web3modal";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  setIsWalletConnected,
  setWaletAddress,
} from "../../redux/slices/UserSlice";

function NFTDetail() {
  let { itemId } = useParams();
  const navigate = useNavigate();
  const [nftMetaData, setNftMetaData] = useState(null);
  const [nftUsdPrice, setNftUsdPrice] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);
  const [nftLikes, setNftLikes] = useState(0);
  const [isNFTLiked, setIsNFTLiked] = useState(false);
  const [isItemSaved, setIsItemSaved] = useState(null);
  const [likesData, setLikesData] = useState([]);
  const [savedItemData, setSavedData] = useState(null);
  const [collectionNFTs, setCollectionNFTs] = useState([]);

  useEffect(() => {
    if (!itemId) {
      navigate("/explore");
      return;
    }
    fetchNFTDetails(itemId);
    countViews();
  }, [itemId]);

  useEffect(() => {
    fetchNFTPriceHistory(itemId);
    fetchNFTLikes(itemId);
    fetchItemSaved(itemId);
    console.log(nftMetaData, itemId);
    if (nftMetaData && nftMetaData.weiPrice) {
      convertEthToDollars(getFormattedPrice(nftMetaData.weiPrice));
      fetchCollectionNFTs();
    }
  }, [nftMetaData]);

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const [views, setViews] = useState(0);
  const countViews = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/countViews`,
        {
          itemId: itemId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data.error === false) {
        setViews(response.data.totalViews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCollectionNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );
    const { marketplaceContract } = fetchContract(provider);
    const fetchedMarketItems = await marketplaceContract.fetchMarketItems();

    const items = await Promise.all(
      fetchedMarketItems.map(async (i) => {
        const tokenUri = await marketplaceContract.tokenURI(i.itemId);
        const meta = await axios.get(tokenUri);
        if (
          meta.data.collection._id === nftMetaData.collection._id &&
          i.itemId.toString() !== itemId.toString()
        ) {
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

    let temp = items.filter((x) => x !== null);
    temp.reverse().slice(0, 8);
    setCollectionNFTs(temp);
  };

  const fetchNFTDetails = async (itemId) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );
    const { marketplaceContract } = fetchContract(provider);
    const fetchedNFT = await marketplaceContract.getNFTDetails(itemId);
    const act_res = await marketplaceContract.getActivities(itemId);
    setNftActivity(act_res);
    setFilteredNftActivity(act_res);
    const tokenUri = await marketplaceContract.tokenURI(fetchedNFT.itemId);
    const meta = await axios.get(tokenUri);
    // console.log("META NEW", meta);
    setNftMetaData({
      ...meta.data,
      seller: fetchedNFT.seller,
      weiPrice: fetchedNFT.price,
      itemId: Number(fetchedNFT.itemId),
    });
  };

  const fetchNFTPriceHistory = async (itemId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
      );
      const { marketplaceContract } = fetchContract(provider);
      const priceHistory = await marketplaceContract.getPriceHistory(itemId);
      setPriceHistory(priceHistory);
    } catch (error) {
      console.log(error);
      console.error("Error fetching price history:", error.message);
    }
  };

  async function convertEthToDollars(ethAmount) {
    // Get the current Ether to USD exchange rate from CoinGecko API
    const coingeckoApiResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const ethToUsdRate = coingeckoApiResponse.data.ethereum.usd;
    const dollars = ethAmount * ethToUsdRate;
    setNftUsdPrice(dollars);
  }

  const activityIcons = {
    Sale: <ShoppingCartIcon className="w-6 h-6" />,
    List: <TagIcon className="w-6 h-6" />,
    Transfer: <ArrowsRightLeftIcon className="w-6 h-6" />,
    Mint: <SparklesIcon className="w-6 h-6" />,
  };

  const activityFilters = ["All", "Sale", "List", "Transfer", "Mint"];
  const [activityFilter, setActivityFilter] = useState("All");
  const [nftActivity, setNftActivity] = useState([]);
  const [filteredNftActivity, setFilteredNftActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivityFilterChange = (filter) => {
    setActivityFilter(filter);

    if (filter === "All") {
      setFilteredNftActivity(nftActivity);
      return;
    }

    var updatedList = [...nftActivity];
    updatedList = updatedList.filter((item) => item.eventType === filter);
    setFilteredNftActivity(updatedList);
  };

  function timeAgo(timestamp) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const seconds = currentTimestamp - timestamp;

    const interval = Math.floor(seconds / 60);

    if (interval < 1) {
      return "Just now";
    }
    if (interval < 60) {
      return `${interval} ${interval === 1 ? "minute" : "minutes"} ago`;
    }

    const hours = Math.floor(interval / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }

    const years = Math.floor(days / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  const getFormattedPrice = (price) => {
    return ethers.utils.formatEther(price.toString());
  };

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear()
    );
  };

  const dispatch = useDispatch();

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        dispatch(setWaletAddress(accounts[0]));
        dispatch(setIsWalletConnected(true));
      } else {
        dispatch(setIsWalletConnected(false));
        dispatch(setWaletAddress(null));
      }
    } catch (error) {
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const user = useSelector((state) => state.user.user);
  const walletAddress = useSelector((state) => state.user.walletAddress);

  const fetchNFTLikes = async (itemId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/nft/getNFTLikes/${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLikesData(response.data.totalNFTLikes);
      setNftLikes(response.data.totalNFTLikes.length);

      if (user) {
        const userLikes = response.data.totalNFTLikes.filter((like) => {
          return like.userId === user._id;
        });
        if (userLikes.length > 0) {
          setIsNFTLiked(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOrRemoveLike = async (nftId) => {
    if (!user) {
      toast.error("Please login to like this NFT");
      return;
    }

    try {
      if (isNFTLiked) {
        const likeId = likesData.filter((like) => {
          return like.userId === user._id;
        })[0]._id;
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/nft/like/${likeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.jwtToken,
            },
          }
        );
        if (response.data.error === false) {
          const newNFTLikes = likesData.filter((like) => {
            return like._id !== likeId;
          });
          setLikesData(newNFTLikes);
          setIsNFTLiked(false);
          setNftLikes(nftLikes - 1);
          toast.success("NFT unliked successfully");
        }
      } else {
        // add like
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/nft/like`,
          {
            nftId: nftId,
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
          const newNFTLikes = [...likesData, response.data.nftLike];
          setLikesData(newNFTLikes);
          setIsNFTLiked(true);
          setNftLikes(newNFTLikes.length);
          toast.success("NFT liked successfully");
        }
      }
    } catch (error) {
      toast.error("Error liking NFT");
      console.log(error);
    }
  };

  const fetchItemSaved = async (itemId) => {
    if (!user) {
      setIsItemSaved(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/checkSaveItem`,
        {
          itemId: itemId,
          itemType: "nft",
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
        }
      );
      if (response.data.error === false && response.data.isSaved === true) {
        setIsItemSaved(true);
        setSavedData(response.data.savedItem);
      } else {
        setIsItemSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOrRemoveSavedItem = async (itemId) => {
    if (!user) {
      toast.error("Please login to save this NFT");
      return;
    }

    try {
      if (isItemSaved) {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/nft/saveItem/${savedItemData._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.jwtToken,
            },
          }
        );
        if (response.data.error === false) {
          setIsItemSaved(false);
          toast.success("NFT removed from saved");
          setSavedData(null);
        }
      } else {
        // add like
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/nft/saveItem`,
          {
            itemId: itemId,
            itemType: "nft",
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
          setIsItemSaved(true);
          setSavedData(response.data.savedItem);
          toast.success("NFT saved successfully");
        }
      }
    } catch (error) {
      toast.error("Error saving NFT");
      console.log(error);
    }
  };

  const handleCopyToClipboard = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const connectingWithSmartContract = async () => {
    try {
      const w3modal = new Web3Modal();
      const connection = await w3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = await provider.getSigner();

      const { marketplaceContract } = fetchContract(signer);
      return { marketplaceContract };
    } catch (error) {
      // setErrors({ message: "Error connecting with smart contract" });
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

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

  const updateCollectionDetails = async (
    collectionId,
    price,
    seller,
    buyer,
    nftId
  ) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/nft/updateCollectionDetails/${collectionId}`,
        {
          salePrice: price,
          seller,
          buyer,
          nftId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
        }
      );
      console.log(response);
    } catch (error) {
      toast.error("Error updating collection details");
      console.log(error);
    }
  };

  const updateTokenURI = async (marketplaceContract, nft) => {
    const data = JSON.stringify({
      name: nft.name,
      description: nft.description,
      creator: nft.creator,
      currentOwner: { ...user, walletAddress },
      ownershipHistory: [...nft.ownershipHistory, { ...user, walletAddress }],
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
      isRewardItem: nft.isRewardItem,
    });
    const added = await client.add(data);
    const newUrl = `https://nfluencer.infura-ipfs.io/ipfs/${added.path}`;
    await updateCollectionDetails(
      nft.collection._id,
      nft.price,
      nft.currentOwner.walletAddress,
      walletAddress,
      nft.itemId
    );
    await marketplaceContract.updateTokenURI(nft.itemId, newUrl);
  };

  const buyNFT = async (nft) => {
    if (!user) {
      toast.error("Please login and connect your wallet to buy this NFT");
      return;
    }
    setIsLoading(true);
    try {
      const { marketplaceContract } = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.weiPrice.toString(), "wei");
      const transaction = await marketplaceContract.buyMarketItem(nft.itemId, {
        value: price,
      });

      await transaction.wait();
      await updateTokenURI(marketplaceContract, nft);
      console.log("Transaction is completed", transaction);
      toast.success("NFT bought successfully");
      window.location.reload();
    } catch (error) {
      if (error.code) {
        toast.error(error.code);
      }
      if (error.code === 4001) {
        toast.error("Transaction rejected by the user");
      }
      console.log(`Error buying NFT: ${error.code}`);
    }
    setIsLoading(false);
  };

  if (!nftMetaData) {
    return <Loader />;
  } else
    return (
      <>
        <Toaster />
        <Header transparent={true} />

        <div className="container mx-auto my-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2 relative">
              {nftMetaData.fileType === "image" ? (
                <img
                  src={nftMetaData.fileUrl}
                  alt={nftMetaData.name}
                  className="rounded-lg h-auto w-full md:h-full object-cover"
                />
              ) : (
                <video controls width="100%" height="100%">
                  <source src={nftMetaData.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <Link
                class="rounded-xl text-nft-primary-light bg-white p-2 flex gap-1 items-center absolute top-2 right-2 text-sm"
                to={nftMetaData.fileUrl}
                target="_blank"
                title="View Original Media File"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </Link>
              <div className="absolute top-2 left-2">
                <div className="bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 overflow-hidden p-2">
                  <div>
                    <div className="flex rounded-2xl justify-evenly items-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="flex gap-1">
                          <img
                            src={require("../assets/eth.png")}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              {isLoading && (
                <div className="flex w-full absolute h-full top-0 z-40 justify-center items-center m-auto gap-1 flex-col bg-white bg-opacity-30">
                  <div className="w-fit bg-white flex items-center flex-col justify-center p-4 rounded-xl shadow-md">
                    <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-700 font-medium">
                      processing...
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {isNFTLiked ? (
                    <button
                      class="bg-nft-primary-light font-medium p-3 rounded-xl hover:bg-nft-primary-dark text-white flex items-center"
                      onClick={() => addOrRemoveLike(itemId)}
                    >
                      <HeartIcon className="w-5 h-5 fill-white" />
                      <span className="pl-2 font-medium text-white text-sm">
                        {nftLikes} favorites
                      </span>
                    </button>
                  ) : (
                    <button
                      class="bg-gray-100 font-medium p-3 rounded-xl hover:bg-gray-300 text-gray-800 flex items-center"
                      onClick={() => addOrRemoveLike(itemId)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="pl-2 font-medium text-gray-600 text-sm">
                        {nftLikes} favorites
                      </span>
                    </button>
                  )}

                  <button className="flex items-center p-3">
                    <EyeIcon className="w-5 h-5" />
                    <span className="pl-2 font-medium text-gray-600 text-sm">
                      {views}
                    </span>
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    className="rounded-xl border p-3 hover:bg-gray-100"
                    title="Share"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="rounded-xl border p-3 hover:bg-gray-100"
                    title="Refresh metadata"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gra sm:text-4xl">
                {nftMetaData.name}
              </h1>

              <div className="flex items-center text-gray-500 text-sm my-3 mb-7">
                Published on
                <span className="pl-2 font-bold text-gray-600">
                  {formatDate(nftMetaData.createdAt)}
                </span>
              </div>

              <div className="flex items-center mt-7 justify-evenly w-full text-left">
                <div className="text-left w-full">
                  <span className="text-sm mb-4 block">
                    <span className="text-gray-900 font-semibold">
                      Current Owner
                    </span>
                  </span>
                  <a href="s" className="block">
                    <div className="flex items-center gap-3">
                      <img
                        src={nftMetaData.currentOwner.avatar}
                        alt="User"
                        className="rounded-full h-14 w-14 object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <button className="font-bold text-gray-900">
                          {nftMetaData.currentOwner.name}
                        </button>
                        <div className="text-sm text-gray-500">
                          {nftMetaData.currentOwner.walletAddress &&
                            nftMetaData.currentOwner.walletAddress.substring(
                              0,
                              10
                            ) +
                              "..." +
                              nftMetaData.currentOwner.walletAddress.substring(
                                nftMetaData.currentOwner.walletAddress.length -
                                  4,
                                nftMetaData.currentOwner.walletAddress.length
                              )}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="text-left w-full">
                  <span className="text-sm mb-4 block">
                    <span className="text-gray-900 font-semibold">Creator</span>
                  </span>
                  <a href="s" className="block">
                    <div className="flex items-center gap-3">
                      <img
                        src={nftMetaData.creator.avatar}
                        alt="User Imasge"
                        className="rounded-full h-14 w-14 object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <button className="font-bold text-gray-900">
                          {nftMetaData.creator.name}
                        </button>
                        <div className="text-sm text-gray-500">
                          {nftMetaData.creator.walletAddress.substring(0, 10) +
                            "..." +
                            nftMetaData.creator.walletAddress.substring(
                              nftMetaData.creator.walletAddress.length - 4,
                              nftMetaData.creator.walletAddress.length
                            )}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex items-center mt-7 justify-evenly w-full text-left">
                <div className="text-left w-full">
                  <div href="s" className="block">
                    <div className="flex items-center gap-3">
                      <span className="w-14 h-14 rounded-full bg-nft-primary-transparent flex justify-center items-center text-nft-primary-light">
                        <Square3Stack3DIcon className="w-7 h-7" />
                      </span>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-gray-900">
                          Category
                        </span>
                        <div className="text-sm text-gray-500">
                          {nftMetaData.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left w-full">
                  <a href="s" className="block">
                    <Link
                      to={
                        "/marketplace/collection/" + nftMetaData.collection._id
                      }
                      className="flex items-center gap-3"
                    >
                      <img
                        src={nftMetaData.collection.image}
                        alt="User Imasge"
                        className="rounded-full h-14 w-14 object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-gray-900">
                          Collection
                        </span>
                        <div className="text-sm text-gray-500">
                          {nftMetaData.collection.name}
                        </div>
                      </div>
                    </Link>
                  </a>
                </div>
              </div>

              <div className="mt-10 p-6 shadow-md shadow-gray-100 rounded-xl border-2 border-gray-200 bg-gray-50">
                <span className="text-gray-900 text-sm font-medium">
                  Current Price
                </span>
                <div className="flex items-end text-gray-900 text-sm my-3 mb-7 gap-3">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-4xl">
                    {getFormattedPrice(nftMetaData.weiPrice)} ETH
                  </h1>
                  <div className="text-gray-500 text-base">
                    ${nftUsdPrice && nftUsdPrice.toFixed(5)}
                  </div>
                </div>

                <div className="flex gap-4">
                  {nftMetaData &&
                  user &&
                  nftMetaData.currentOwner.walletAddress === walletAddress ? (
                    <button
                      class="bg-nft-primary-light border-nft-primary-light text-white font-medium p-4 rounded-xl hover:bg-nft-primary-dark w-full flex items-center justify-center gap-2 opacity-50"
                      disabled
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                      Buy Now
                    </button>
                  ) : (
                    <button
                      class="bg-nft-primary-light border-nft-primary-light text-white font-medium p-4 rounded-xl hover:bg-nft-primary-dark w-full flex items-center justify-center gap-2"
                      onClick={() => buyNFT(nftMetaData)}
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                      Buy Now
                    </button>
                  )}

                  {isItemSaved ? (
                    <button
                      className="bg-nft-primary-transparent rounded-xl p-4 font-semibold text-nft-primary-light w-full hover:bg-nft-primary-light hover:text-white duration-300 transition-colors flex items-center justify-center gap-2 group"
                      onClick={() => addOrRemoveSavedItem(itemId)}
                    >
                      <BookmarkIcon className="w-6 h-6 fill-nft-primary-light group-hover:fill-white" />
                      <span>Saved</span>
                    </button>
                  ) : (
                    <button
                      className="bg-nft-primary-transparent rounded-xl p-4 font-semibold text-nft-primary-light w-full hover:bg-nft-primary-light hover:text-white duration-300 transition-colors flex items-center justify-center gap-2"
                      onClick={() => addOrRemoveSavedItem(itemId)}
                    >
                      <BookmarkIcon className="w-6 h-6" />
                      <span>Save for later</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-16 mt-12">
            <div className="md:w-1/2">
              <div className="relative overflow-x-auto border-2 border-gray-100 shadow-lg shadow-gray-100 p-5 rounded-xl text-gray-800 ">
                <div>
                  <div className="text-lg font-extrabold pb-4 pt-2 flex gap-3 border-b">
                    <QueueListIcon className="w-6 h-6 inline-block" />
                    <span>Description</span>
                  </div>

                  <div className="my-5 px-4 pb-2 pt-4 text-base text-gray-500">
                    <div className="flex gap-1">
                      <span className="text-gray-500 font-medium">By</span>
                      <span className="font-semibold text-nft-primary-light">
                        {nftMetaData.currentOwner.name}
                      </span>
                    </div>
                    <p className="font-normal text-sm">
                      {nftMetaData.description}
                    </p>
                  </div>
                </div>

                <div>
                  <Disclosure defaultOpen={true}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center border-t pt-4 pb-4">
                          <div className="text-lg font-extrabold flex gap-3">
                            <UserGroupIcon className="w-6 h-6 inline-block" />
                            <span>Ownership History</span>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-4 w-4 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                          <div className="flex flex-col">
                            {nftMetaData.ownershipHistory
                              .reverse()
                              .map((history, index) => {
                                return (
                                  <div key={index}>
                                    <div className="w-full flex items-center gap-5">
                                      <a href="s" className="block">
                                        <div className="flex items-center gap-4">
                                          <img
                                            src={history.avatar}
                                            alt={history.name}
                                            className="rounded-full h-10 w-10 object-cover"
                                          />
                                          <div className="flex flex-col items-start">
                                            <button className="font-bold text-gray-900">
                                              {history.name}
                                            </button>

                                            <div className="text-sm text-gray-500">
                                              {history.walletAddress.substring(
                                                0,
                                                10
                                              ) +
                                                "..." +
                                                history.walletAddress.substring(
                                                  history.walletAddress.length -
                                                    4,
                                                  history.walletAddress.length
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </a>

                                      {nftMetaData.ownershipHistory.length ===
                                      index + 1 ? (
                                        <span className="text-sm rounded-md p-1 px-3 bg-green-200 text-green-800">
                                          Creator
                                        </span>
                                      ) : index === 0 ? (
                                        <span className="text-sm rounded-md p-1 px-3 bg-green-200 text-green-800">
                                          Owner
                                        </span>
                                      ) : (
                                        <span className="text-sm rounded-md p-1 px-3 bg-gray-200 text-gray-800">
                                          Buyer
                                        </span>
                                      )}
                                    </div>
                                    {nftMetaData.ownershipHistory.length !==
                                      index + 1 && (
                                      <div class="border-l-2 my-1 border-dotted h-5 border-gray-400 ml-5"></div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>

                <div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center border-t pt-4 pb-4">
                          <div className="text-lg font-extrabold flex gap-3">
                            <CpuChipIcon className="w-6 h-6 inline-block" />
                            <span>Traits</span>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-4 w-4 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                          <div className="grid grid-cols-4 items-center gap-2">
                            {nftMetaData.traits.map((attribute, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center flex-col gap-0.5 justify-center bg-gray-100 p-3 rounded-md w-full"
                                >
                                  <span className="text-xs text-gray-400 font-medium uppercase">
                                    {attribute.traitType}
                                  </span>
                                  <span className="font-semibold text-base text-gray-800">
                                    {attribute.traitName}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>

                <div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center border-b border-t pt-4 pb-4">
                          <div className="text-lg font-extrabold flex gap-3">
                            <ListBulletIcon className="w-6 h-6 inline-block" />
                            <span>Details</span>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-4 w-4 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-700">
                                Contract Address
                              </span>
                              <span className="font-medium text-nft-primary-light">
                                0x0000...b719
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-700">
                                Token ID
                              </span>
                              <span className="font-normal text-sm text-gray-700">
                                {itemId}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-700">
                                Token Standard
                              </span>
                              <span className="font-normal text-sm text-gray-700">
                                ERC-721
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-700">
                                Chain
                              </span>
                              <span className="font-normal text-sm text-gray-700">
                                Ethereum
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-700">
                                Creator Earnings
                              </span>
                              <span className="font-normal text-sm text-gray-700">
                                {nftMetaData.royalties}%
                              </span>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex">
              <div className="w-full border-2 border-gray-100 shadow-lg shadow-gray-100 p-5 rounded-xl h-fit">
                <div className="text-lg font-extrabold pb-4 pt-2 flex gap-3 border-b">
                  <ArrowTrendingUpIcon className="w-6 h-6 inline-block" />
                  <span>Price History</span>
                </div>
                <div className="w-full flex-grow" style={{ height: "87%" }}>
                  <PriceHistory data={priceHistory} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-16 mt-12">
            <div className="w-full">
              <div className="relative overflow-x-auto border-2 border-gray-100 shadow-lg shadow-gray-100 p-5 pb-0 rounded-xl ">
                <div className="flex justify-between items-center border-b pb-3">
                  <div className="text-lg font-extrabold pb-4 pt-2 flex gap-3">
                    <PresentationChartLineIcon className="w-6 h-6 inline-block" />
                    <span>Item Activity</span>
                  </div>
                  <div className="flex gap-3 flex-row justify-start flex-wrap">
                    {activityFilters.map((filter, index) => {
                      return (
                        <button
                          key={index}
                          className={`rounded-xl p-3 px-5 text-sm font-medium items-center cursor-pointer ${
                            activityFilter === filter
                              ? "bg-nft-primary-light text-white border border-nft-primary-light"
                              : "text-gray-500 hover:bg-gray-100 border border-gray-200"
                          }`}
                          onClick={() => handleActivityFilterChange(filter)}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <table className="w-full text-sm text-start">
                  <thead className="text-sm text-gray-500 ">
                    <tr className="border-b">
                      <th
                        scope="col"
                        className="text-start font-semibold py-6 pb-3 pt-3"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="text-start font-semibold py-6 pb-3 pt-3"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-start font-semibold py-6 pb-3 pt-3"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="text-start font-semibold py-6 pb-3 pt-3"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="text-start font-semibold py-6 pb-3 pt-3"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-base">
                    {filteredNftActivity
                      .slice()
                      .reverse()
                      .map((activity, index) => {
                        return (
                          <tr
                            className={
                              index + 1 < nftActivity.length && "border-b"
                            }
                            key={index}
                          >
                            <td className="pb-5 pt-5">
                              <div className="flex items-center text-sm gap-3">
                                {activityIcons[activity.eventType]}
                                <span className="text-base">
                                  {activity.eventType}
                                </span>
                              </div>
                            </td>
                            <td className="pb-5 pt-5 font-medium">
                              {activity.eventType !== "Transfer" &&
                                getFormattedPrice(activity.price) + " ETH"}
                            </td>
                            <td className="pb-5 pt-5 font-semibold text-nft-primary-light">
                              {activity.eventType === "Mint" ? (
                                <span className="opacity-60">Null Address</span>
                              ) : (
                                activity.from.substring(0, 6) +
                                "..." +
                                activity.from.substring(
                                  activity.from.length - 4,
                                  activity.from.length
                                )
                              )}
                            </td>
                            <td className="pb-5 pt-5 font-semibold text-nft-primary-light">
                              {activity.to.substring(0, 6) +
                                "..." +
                                activity.to.substring(
                                  activity.to.length - 4,
                                  activity.to.length
                                )}
                            </td>
                            <td className="pb-5 pt-5">
                              {timeAgo(activity.timestamp)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="py-11 mt-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-gra sm:text-2xl">
              More from this collection
            </h1>

            {collectionNFTs.length > 0 && (
              <div className="flex flex-wrap justify-start">
                {collectionNFTs.map((nft, index) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 p-2"
                    key={index}
                  >
                    <div className="w-full h-full decoration-transparent rounded-xl shadow-xl transition-colors duration-300 relative group">
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
                        <div className="flex justify-between items-center -mt-8 z-50">
                          <div className="flex -space-x-3">
                            {nft.ownershipHistory.map((history, index) => (
                              <img
                                key={index}
                                className="w-12 h-12 rounded-full border-2 object-cover border-white z-50"
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
                                to={
                                  "/marketplace/collection/" +
                                  nft.collection._id
                                }
                                className="text-nft-primary-light font-semibold"
                              >
                                <span>{nft.collection.name}</span>
                                <ArrowUpRightIcon className="w-4 h-4 inline-block" />
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-500 text-sm mt-2 justify-between">
                            <div>
                              <span className="block text-xs text-center mb-1">
                                Traits
                              </span>
                              <div className="text-gray-800 font-semibold">
                                {nft.traits.map((trait, index) => (
                                  <span
                                    key={index}
                                    className="text-gray-800 font-normal bg-gray-100 p-1 rounded-md inline-block mr-1 mb-1 px-1.5"
                                  >
                                    {trait.traitType} : {trait.traitName}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-1 text-sm mt-4 text-center">
                          <Link
                            className="bg-nft-primary-light font-medium p-4 rounded-xl hover:bg-nft-primary-dark w-full text-white"
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
                                    src={require("../assets/eth.png")}
                                    alt=""
                                    className="w-5 h-5 object-contain"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {collectionNFTs.length === 0 && (
              <div className="flex justify-center items-center h-64">
                <span className="text-gray-500">
                  No More NFTs in this collection
                </span>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </>
    );
}

export default NFTDetail;
