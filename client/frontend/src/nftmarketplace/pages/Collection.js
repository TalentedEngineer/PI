import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { Menu } from "@headlessui/react";
import {
  HeartIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  FlagIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsWalletConnected,
  setWaletAddress,
} from "../../redux/slices/UserSlice";
import { ethers } from "ethers";
import axios from "axios";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../constants/ContractDetails";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../utils/Loader";
import Web3Modal from "web3modal";
import { create as ipfsHttpClient } from "ipfs-http-client";

const Collection = () => {
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
  //
  const { collectionId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [nftLikes, setNFTLikes] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState({});
  const [collectionCreator, setCollectionCreator] = useState({});
  const [loading, setLoading] = useState(true);
  const [isBuyingLoading, setIsBuyingLoading] = useState(false);

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const fetchNFTs = async (collectionId) => {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );

    const { marketplaceContract } = fetchContract(provider);
    const fetchedMarketItems = await marketplaceContract.fetchMarketItems();

    const items = await Promise.all(
      fetchedMarketItems.map(async (i) => {
        const tokenUri = await marketplaceContract.tokenURI(i.itemId);
        const meta = await axios.get(tokenUri);
        if (meta.data.isRewardItem === false) {
          if (meta.data.collection._id === collectionId) {
            return {
              ...meta.data,
              likes: i.likes.toString(),
              itemId: Number(i.itemId),
              weiPrice: i.price,
            };
          } else return;
        }
      })
    );

    // remove null or undefined items from array
    const filteredItems = items.filter(function (el) {
      return el != null;
    });

    filteredItems.reverse();
    setNfts(filteredItems);
    console.log(filteredItems);
    console.log(collectionCreator);
    setLoading(false);
  };

  const getCollection = async (collectionId) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/nft/getCollection`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
        }),
      }
    );

    const responseData = await res.json();
    console.log("collect", responseData);
    setCollectionInfo(responseData);
    setCollectionCreator({
      ...responseData.user,
      walletAddress: responseData.creatorWalletAddress,
    });
    // return responseData;
  };

  const countCollectionViews = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/countCollectionViews`,
        {
          collectionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs(collectionId);
    getCollection(collectionId);
    countCollectionViews();
  }, [collectionId]);

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

  useEffect(() => {
    if (nfts.length > 0) fetchLikes();
  }, [nfts]);

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

  const categories = [
    { name: "All" },
    { name: "Art" },
    { name: "Gaming" },
    { name: "Memberships" },
    { name: "PFPs" },
    { name: "Photography" },
    { name: "Music" },
  ];
  const priceRanges = [
    { name: "All" },
    { name: "< 0.01 ETH" },
    { name: "0.01 ETH - 0.1 ETH" },
    { name: "0.1 ETH - 1 ETH" },
    { name: "1 ETH - 10 ETH" },
    { name: "> 10 ETH" },
  ];
  const sortingOptions = [
    { name: "Sort by Latest" },
    { name: "Sort by Oldest" },
    { name: "Price Low to High" },
    { name: "Price High to Low" },
  ];
  const mediatypes = [{ name: "All" }, { name: "Image" }, { name: "Video" }];
  const ownerships = [{ name: "All" }, { name: "Me" }];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    priceRanges[0].name
  );
  const [selectedMediaType, setSelectedMediaType] = useState(
    mediatypes[0].name
  );
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0].name
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOwnership, setSelectedOwnership] = useState(
    ownerships[0].name
  );

  const filteredNFTArray = nfts
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === "All"
        ? true
        : item.category.toLowerCase().includes(selectedCategory.toLowerCase())
    )
    .filter((item) =>
      selectedPriceRange === "All"
        ? true
        : selectedPriceRange === "< 0.01 ETH"
        ? Number(getFormattedPrice(item.weiPrice)) < 0.01
        : selectedPriceRange === "0.01 ETH - 0.1 ETH"
        ? Number(getFormattedPrice(item.weiPrice)) >= 0.01 &&
          Number(getFormattedPrice(item.weiPrice)) < 0.1
        : selectedPriceRange === "0.1 ETH - 1 ETH"
        ? Number(getFormattedPrice(item.weiPrice)) >= 0.1 &&
          Number(getFormattedPrice(item.weiPrice)) < 1
        : selectedPriceRange === "1 ETH - 10 ETH"
        ? Number(getFormattedPrice(item.weiPrice)) >= 1 &&
          Number(getFormattedPrice(item.weiPrice)) < 10
        : selectedPriceRange === "> 10 ETH"
        ? Number(getFormattedPrice(item.weiPrice)) >= 10
        : true
    )
    .filter((item) =>
      selectedOwnership === "All"
        ? true
        : selectedOwnership === "Me"
        ? item.currentOwner.walletAddress === walletAddress
        : true
    )
    .filter((item) =>
      selectedMediaType === "All"
        ? true
        : selectedMediaType === "Image"
        ? item.fileType.toLowerCase() === "image"
        : selectedMediaType === "Video"
        ? item.fileType.toLowerCase() === "video"
        : true
    )
    .sort((a, b) => {
      if (selectedSortingOption === "Sort by Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else if (selectedSortingOption === "Sort by Latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else if (selectedSortingOption === "Price Low to High")
        return (
          Number(getFormattedPrice(a.weiPrice)) -
          Number(getFormattedPrice(b.weiPrice))
        );
      else if (selectedSortingOption === "Price High to Low")
        return (
          Number(getFormattedPrice(b.weiPrice)) -
          Number(getFormattedPrice(a.weiPrice))
        );
      else return 0;
    });

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

  const connectingWithSmartContract = async () => {
    try {
      const w3modal = new Web3Modal();
      const connection = await w3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = await provider.getSigner();

      const { marketplaceContract } = fetchContract(signer);
      return { marketplaceContract };
    } catch (error) {
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

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
      isRewardItem: false,
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
    setIsBuyingLoading(true);
    try {
      const { marketplaceContract } = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.weiPrice.toString(), "wei");
      const transaction = await marketplaceContract.buyMarketItem(nft.itemId, {
        value: price,
      });

      await transaction.wait();
      await updateTokenURI(marketplaceContract, nft);
      fetchNFTs();
      toast.success("NFT bought successfully");
    } catch (error) {
      if (error.code) {
        toast.error(error.code);
      }
      if (error.code === 4001) {
        toast.error("Transaction rejected by the user");
      }
      console.log(`Error buying NFT: ${error.code}`);
    }
    setIsBuyingLoading(false);
  };

  const [isItemSaved, setIsItemSaved] = useState(null);
  const [savedItemData, setSavedData] = useState(null);

  const fetchItemSaved = async (itemId) => {
    if (!user) {
      setIsItemSaved(false);
      return;
    }

    // console.log("Collection fetch", itemId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/nft/checkSaveItem`,
        {
          itemId: itemId,
          itemType: "collection",
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
        }
      );
      // console.log(response);
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
      toast.error("Please login to save this Collection");
      return;
    }
    console.log("Collection", itemId);

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
        console.log(response);
        if (response.data.error === false) {
          setIsItemSaved(false);
          toast.success("Collection removed from saved");
          setSavedData(null);
        }
      } else {
        // add like
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/nft/saveItem`,
          {
            itemId: itemId,
            itemType: "collection",
            userId: user._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user.jwtToken,
            },
          }
        );
        console.log(response);
        if (response.data.error === false) {
          setIsItemSaved(true);
          setSavedData(response.data.savedItem);
          toast.success("Collection saved successfully");
        }
      }
    } catch (error) {
      toast.error("Error saving Collection");
      console.log(error);
    }
  };

  const [likes, setLikes] = useState({});
  const getCollectionItemsCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/nft/getCollectionItemsCount`
      );
      setLikes(response.data.collectionItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemSaved(collectionId);
    getCollectionItemsCount();
    console.log(collectionInfo);
    console.log(collectionCreator);
  }, [collectionId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster />
      <Header transparent={true} shadow={false} />
      {collectionCreator !== null && collectionInfo && (
        <div className="mt-0">
          <div className="p-0 h-auto w-full">
            <div
              className={`w-full h-full relative bg-gradient-to-r from-blue-600 to-indigo-600 `}
            >
              <img
                src={collectionInfo.image}
                alt=""
                className="absolute w-full h-full object-cover"
              />
              <div className="flex items-center justify-end p-8 gap-4 z-10">
                {isItemSaved ? (
                  <button
                    className="bg-nft-primary-light rounded-full w-auto h-10 z-10 shadow-lg hover:opacity-80 text-white flex items-center px-4 text-sm gap-2 font-medium"
                    onClick={() => addOrRemoveSavedItem(collectionId)}
                  >
                    <HeartIcon className="w-5 h-5 text-white" />
                    <span>Collection Saved</span>
                  </button>
                ) : (
                  <button
                    className="bg-white rounded-full w-auto h-10 z-10 shadow-lg hover:bg-gray-100 text-gray-700 flex items-center px-4 text-sm gap-2 font-medium"
                    onClick={() => addOrRemoveSavedItem(collectionId)}
                  >
                    <HeartIcon className="w-5 h-5 text-nft-primary-light" />
                    <span>Add to Favorites</span>
                  </button>
                )}

                <Menu as="div" className="relative text-left z-50">
                  <div>
                    <Menu.Button className="font-black text-xl bg-white rounded-full w-10 h-10 z-50 shadow-lg hover:bg-gray-100 text-gray-700">
                      <span>···</span>
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute right-0 z-50 mt-1 w-40 origin-top-right rounded-xl bg-white shadow-xl focus:outline-none  p-1 border border-gray-50">
                    <Menu.Item>
                      <button className="text-gray-600 p-3 rounded-xl hover:bg-gray-100 text-sm w-full text-left flex gap-2 items-center font-medium">
                        <ClipboardDocumentListIcon className="w-5 h-5" />
                        <span>Copy Link</span>
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
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

              <div class="absolute w-full h-full bg-gradient-to-b from-transparent to-[#000000f1] bottom-0"></div>

              {/* ddd */}
              <div className="flex items-end justify-between gap-7 w-full p-5 py-8">
                <div className="z-30 flex flex-col gap-0">
                  <img
                    src={collectionInfo.image}
                    alt={collectionInfo.name}
                    className="w-20 h-20 rounded-xl object-cover mb-3"
                  />
                  <h1 className="text-2xl font-bold text-white">
                    {collectionInfo.name}
                  </h1>
                  <div className="text-gray-300 font-normal text-base flex items-center gap-2 mt-2">
                    <img
                      src={collectionCreator.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                    <div className="flex flex-col justify-start">
                      <span className="block text-white">
                        {collectionCreator.name}
                      </span>
                      <span className="block text-xs">
                        {collectionCreator.walletAddress &&
                          collectionCreator.walletAddress.substring(0, 7) +
                            "..." +
                            collectionCreator.walletAddress.substring(
                              collectionCreator.walletAddress.length - 7,
                              collectionCreator.walletAddress.length
                            )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="z-40">
                  <div className="flex items-center justify-center gap-10 z-50">
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">
                        {collectionInfo.totalSales &&
                          collectionInfo.totalSales.toFixed(4)}
                      </span>
                      <span className="text-gray-300 font-normal text-base">
                        Total Sales
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">
                        {collectionInfo.totalItemsSold}
                      </span>
                      <span className="text-gray-300 font-normal text-base">
                        Items Sold
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium text-center">
                        {collectionInfo.totalItems}
                      </span>
                      <span className="text-gray-300 font-normal text-base">
                        Items
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">Ethereum</span>
                      <span className="text-gray-300 font-normal text-base">
                        Chain
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">
                        {formatDate(collectionInfo.createdAt)}
                      </span>
                      <span className="text-gray-300 font-normal text-base">
                        Created
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-10">
            <p className="w-1/2 text-base text-left text-gray-500">
              {collectionInfo.description}
            </p>

            {/* <div className="flex items-center justify-center flex-col z-50 -mt-20 gap-4">
              <div className="z-50">
                <img
                  src={collectionInfo.image}
                  alt={collectionInfo.name}
                  className="w-32 h-32 rounded-full border-2 border-white object-cover z-50"
                />
              </div>

              <div>

              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gra sm:text-4xl">
                {collectionInfo.name}
              </h1>

              <p className="w-1/2 text-sm text-center text-gray-500">
                {collectionInfo.description}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div>
                  <span className="text-gray-500 font-normal">Items</span>
                  <span className="text-gray-800 font-bold pl-2">
                    {collectionInfo.totalItems}
                  </span>
                </div>
                <div className="text-gray-500 font-black">·</div>
                <div>
                  <span className="text-gray-500 font-normal">Created</span>
                  <span className="text-gray-800 font-bold pl-2">
                    {formatDate(collectionInfo.createdAt)}
                  </span>
                </div>
                <div className="text-gray-500 font-black">·</div>
                <div>
                  <span className="text-gray-500 font-normal">Chain</span>
                  <span className="text-gray-800 font-bold pl-2">Ethereum</span>
                </div>
                <div>
                  <span className="text-gray-500 font-normal">Total Sales</span>
                  <span className="text-gray-800 font-bold pl-2">
                    {collectionInfo.totalSales.toFixed(4)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 font-normal">Items Sold</span>
                  <span className="text-gray-800 font-bold pl-2">
                    {collectionInfo.totalItemsSold}
                  </span>
                </div>
              </div>

              <div className="w-fit flex flex-col gap-2 items-center justify-center border border-gray-200 p-2 px-4 rounded-xl shadow-md shadow-gray-100 bg-gray-50">
                <span className="text-gray-500 font-normal w-full text-sm text-center block">
                  Created by
                </span>
                <a href="s" className="block">
                  {Object.keys(collectionCreator).length > 0 && (
                    <div className="flex items-center gap-3">
                      <img
                        src={collectionCreator.avatar}
                        alt={collectionCreator.name}
                        className="rounded-full h-12 w-12 object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-gray-900">
                          {collectionCreator.name}
                        </span>
                        <div className="text-sm text-gray-500">
                          {collectionCreator.walletAddress.substring(0, 7) +
                            "..." +
                            collectionCreator.walletAddress.substring(
                              collectionCreator.walletAddress.length - 7,
                              collectionCreator.walletAddress.length
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </a>
              </div>
            </div> */}

            {/* add here */}

            <div className="my-14 items-center">
              <div className="sticky top-0 p-5 z-50 bg-white border-b pb-3 border-gray-100">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <span className="block text-xs ml-2 mb-1 text-gray-500">
                            Category
                          </span>
                          <Menu.Button className="group inline-flex justify-between text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                            <span>{selectedCategory}</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                          {categories.map((category, index) => (
                            <Menu.Item key={index}>
                              <button
                                onClick={() =>
                                  setSelectedCategory(category.name)
                                }
                                className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                              >
                                {category.name}
                              </button>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <span className="block text-xs ml-2 mb-1 text-gray-500">
                            Price Range
                          </span>
                          <Menu.Button className="group inline-flex justify-between  text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                            <span>{selectedPriceRange}</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-full md:w-48 origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                          {priceRanges.map((priceRange, index) => (
                            <Menu.Item key={index}>
                              <button
                                onClick={() =>
                                  setSelectedPriceRange(priceRange.name)
                                }
                                className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                              >
                                {priceRange.name}
                              </button>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <span className="block text-xs ml-2 mb-1 text-gray-500">
                            Media
                          </span>
                          <Menu.Button className="group inline-flex justify-between  text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                            <span>{selectedMediaType}</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                          {mediatypes.map((ownership, index) => (
                            <Menu.Item key={index}>
                              <button
                                onClick={() =>
                                  setSelectedMediaType(ownership.name)
                                }
                                className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                              >
                                {ownership.name}
                              </button>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <span className="block text-xs ml-2 mb-1 text-gray-500">
                            Ownership
                          </span>
                          <Menu.Button className="group inline-flex justify-between  text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                            <span>{selectedOwnership}</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                          {ownerships.map((ownership, index) => (
                            <Menu.Item key={index}>
                              <button
                                onClick={() =>
                                  setSelectedOwnership(ownership.name)
                                }
                                className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                              >
                                {ownership.name}
                              </button>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>

                      <div>
                        <span className="block text-xs ml-2 mb-1 text-gray-500">
                          Search
                        </span>
                        <div className="relative">
                          <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            className="text-base rounded-xl border-gray-200 shadow-sm focus:border-nft-primary-light pl-9 block w-full p-3 outline-none border ring-purple-700 focus:ring-1 focus:bg-transparent placeholder-gray-500 text-gray-800"
                            placeholder="Search by item name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <span className="block text-xs ml-2 mb-1 text-gray-500">
                            Sorting
                          </span>
                          <Menu.Button className="group inline-flex justify-between  text-gray-800 gap-20 items-center border border-gray-200 shadow-sm focus:border-nft-primary-light p-3 rounded-xl font-semibold focus:ring-nft-primary-light focus:ring-1">
                            <span>{selectedSortingOption}</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-2xl p-2 focus:outline-none">
                          {sortingOptions.map((option, index) => (
                            <Menu.Item key={index}>
                              <button
                                onClick={() =>
                                  setSelectedSortingOption(option.name)
                                }
                                className="font-medium text-gray-800 hover:bg-gray-100 block p-3 rounded-lg w-full text-left"
                              >
                                {option.name}
                              </button>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>

                  <div className="mt-2 px-4">
                    <div className="text-gray-500 flex items-center gap-2">
                      <span className="font-medium">
                        {filteredNFTArray.length}
                      </span>
                      results
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-start py-10 relative">
                {isBuyingLoading && (
                  <div className="flex w-full absolute h-full top-0 z-40 justify-center items-center m-auto gap-1 flex-col bg-white bg-opacity-30">
                    <div className="w-fit bg-white flex items-center flex-col justify-center p-4 rounded-xl">
                      <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-700 font-medium">
                        processing...
                      </span>
                    </div>
                  </div>
                )}

                {filteredNFTArray.map((nft, index) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
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
                                className="w-12 h-12 rounded-full border-2 object-cover border-white z-10"
                                src={history.avatar}
                                alt="avatar"
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
                              <span className="font-bold text-sm text-gray-800">
                                <span className="text-gray-500 pr-1 font-medium">
                                  {getFormattedPrice(nft.weiPrice)}
                                </span>
                                ETH
                              </span>
                            </div>
                            <div>
                              <span className="block text-xs text-center">
                                Created
                              </span>
                              <span className="text-gray-800 font-semibold">
                                {formatDate(nft.collection.createdAt)}
                              </span>
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
                          {user &&
                          nft.currentOwner.walletAddress ===
                            walletAddress ? null : (
                            <button
                              className="bg-nft-primary-light border-nft-primary-light text-white font-medium p-4 rounded-xl hover:bg-nft-primary-dark w-full"
                              onClick={() => buyNFT(nft)}
                            >
                              Buy Now
                            </button>
                          )}
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
                          className={
                            !checkIfUserLikedNFT(nft) && "text-gray-700"
                          }
                        >
                          {nftLikes && countNFTLikes(nft)}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}

                {filteredNFTArray.length === 0 && (
                  <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col gap-2 items-center">
                      <span className="text-gray-500 font-normal text-lg">
                        No Items Found
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Collection;
