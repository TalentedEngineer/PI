import React, { useState, Fragment, useEffect } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../constants/ContractDetails";
import { ethers } from "ethers";
import axios from "axios";
import {
  HeartIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  FlagIcon,
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Web3Modal from "web3modal";
import toast, { Toaster } from "react-hot-toast";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsWalletConnected,
  setWaletAddress,
} from "../../redux/slices/UserSlice";
import Loader from "../../utils/Loader";
import { setSearchQuery } from "../../redux/slices/SearchNftSlice";

function Explore() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isNFTLoading, setIsNFTLoading] = useState(false);

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
  const reduxSearchQuery = useSelector((state) => state.nftSearch.searchQuery);

  useEffect(() => {
    if (reduxSearchQuery === "" || reduxSearchQuery === null) {
      setInputQuery("");
    } else {
      setInputQuery(reduxSearchQuery);
    }

    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [reduxSearchQuery]);

  const [nfts, setNFTs] = useState([]);
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

    console.log("Explore", fetchedMarketItems);

    let items = await Promise.all(
      fetchedMarketItems.map(async (i) => {
        const tokenUri = await marketplaceContract.tokenURI(i.itemId);
        const meta = await axios.get(tokenUri);
        if (meta.data.isRewardItem === false) {
          console.log(meta.data);
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

    // remove null values from items
    items = items.filter((item) => item !== null);

    // remove duplicate collections from tempcollections by using _id
    const collections = tempcollections.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t._id.toString() === thing._id.toString())
    );

    setFilterCollections(collections);
    items.reverse();
    setNFTs(items);
    console.log(items);
    setIsNFTLoading(false);
  };

  const [collectionsTotalItems, setCollectionsTotalItems] = useState({});
  const getCollectionItemsCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/nft/getCollectionItemsCount`
      );
      setCollectionsTotalItems(response.data.collectionItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
    getCollectionItemsCount();
  }, []);

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
    setIsLoading(false);
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
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

  const handleCopyToClipboard = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const sortingOptions = [
    { name: "Sort by Latest" },
    { name: "Sort by Oldest" },
    { name: "Price Low to High" },
    { name: "Price High to Low" },
  ];
  const categories = [
    { name: "All" },
    { name: "Art" },
    { name: "Gaming" },
    { name: "Memberships" },
    { name: "PFPs" },
    { name: "Photography" },
    { name: "Music" },
  ];
  const ownerships = [{ name: "All" }, { name: "Me" }];
  const mediatypes = [{ name: "All" }, { name: "Image" }, { name: "Video" }];
  const [selectedOwnership, setSelectedOwnership] = useState(
    ownerships[0].name
  );
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0].name
  );
  const [selectedMediaType, setSelectedMediaType] = useState(
    mediatypes[0].name
  );
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [FilterCollections, setFilterCollections] = useState([]);
  const [inputQuery, setInputQuery] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      const newSelectedCategories = selectedCategories.filter(
        (category) => category !== value
      );
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleCollectionChange = (e) => {
    const { value } = e.target;
    if (selectedCollections.includes(value)) {
      const newSelectedCollections = selectedCollections.filter(
        (coll) => coll !== value
      );
      setSelectedCollections(newSelectedCollections);
    } else {
      setSelectedCollections([...selectedCollections, value]);
    }
  };

  // console.log(selectedCategories);

  const filteredNFTS = nfts
    .filter((item) =>
      item.name.toLowerCase().includes(inputQuery.toLowerCase())
    )
    .filter((item) => {
      if (
        selectedCategories.includes("All") ||
        selectedCategories.length === 0
      ) {
        return true;
      }
      return selectedCategories.includes(item.category);
    })
    .filter((item) => {
      // user can provide either min or max price or both
      if (!minPrice && !maxPrice) {
        return true;
      }
      if (minPrice && !maxPrice) {
        return Number(getFormattedPrice(item.weiPrice)) >= Number(minPrice);
      }
      if (!minPrice && maxPrice) {
        return Number(getFormattedPrice(item.weiPrice)) <= Number(maxPrice);
      }
      if (minPrice && maxPrice) {
        return (
          Number(getFormattedPrice(item.weiPrice)) >= Number(minPrice) &&
          Number(getFormattedPrice(item.weiPrice)) <= Number(maxPrice)
        );
      }
      return true;
    })
    .filter((item) => {
      if (selectedCollections.length === 0) {
        return true;
      }
      return selectedCollections.includes(item.collection._id);
    })
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

  const newCollections = FilterCollections.filter((item) => {
    if (selectedCollections.length === 0) {
      return true;
    }
    return selectedCollections.includes(item._id);
  })
    .filter((item) =>
      item.name.toLowerCase().includes(inputQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedSortingOption === "Sort by Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else if (selectedSortingOption === "Sort by Latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else return 0;
    });

  if (isNFTLoading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Header transparent={true} />

      <div className="container mx-auto">
        <div className="py-11">
          <h1 class="text-4xl mb-5 font-extrabold tracking-tight text-gra sm:text-4xl">
            Explore NFTs, Collections and Creators
          </h1>

          {/* LAYOUT */}
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-40 lg:hidden"
                  onClose={setMobileFiltersOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>

                          <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                          MOBILE FILTERS
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition.Root>

              <main className="mx-auto max-w-7xl px-0">
                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <div className="hidden lg:block py-4 h-screen overflow-auto custom-scrollbar sticky top-0">
                      <div className="border-r border-gray-100 sticky top-0">
                        <div className="h-full">
                          <Disclosure
                            as="div"
                            className="border-b border-gray-100 py-5"
                            // defaultOpen={true}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root p-3 py-0 rounded-xl font-bold hover:bg-gray-100">
                                  <Disclosure.Button className="flex w-full items-center justify-between py-3 hover:text-gray-500">
                                    <span className="font-bold text-gray-800">
                                      Categories
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                      ) : (
                                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                  {categories.map((category, index) => (
                                    <div
                                      key={index}
                                      className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                                    >
                                      <input
                                        id={`category-${category.name}-${index}`}
                                        name={`${category.name}[]`}
                                        defaultValue={category.name}
                                        type="checkbox"
                                        value={category.name}
                                        checked={selectedCategories.includes(
                                          category.name
                                        )}
                                        onChange={(e) =>
                                          handleCategoryChange(e)
                                        }
                                        className="h-5 w-5 accent-nft-primary-light"
                                      />
                                      <label
                                        htmlFor={`category-${category.name}-${index}`}
                                        className="cursor-pointer text-gray-600"
                                      >
                                        {category.name}
                                      </label>
                                    </div>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <Disclosure
                            as="div"
                            className="border-b border-gray-100 py-5"
                            defaultOpen={true}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root p-3 py-0 rounded-xl font-bold hover:bg-gray-100">
                                  <Disclosure.Button className="flex w-full items-center justify-between py-3 hover:text-gray-500">
                                    <span className="font-bold text-gray-800">
                                      Price Range
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                      ) : (
                                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                  <span className="p-3 pb-0 flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                      Currency
                                    </span>
                                    <span>ETH</span>
                                    <img
                                      src={require("../../nftmarketplace/assets/eth.png")}
                                      alt=""
                                      className="w-3"
                                    />
                                  </span>
                                  <div className="flex p-3 gap-2 items-center">
                                    <div className="relative">
                                      <input
                                        type="number"
                                        className="w-full outline-none text-sm placeholder:text-gray-500 placeholder:font-medium font-semibold p-3 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border rounded-xl bg-white text-center"
                                        placeholder="Min"
                                        min={0}
                                        value={minPrice}
                                        onChange={(e) =>
                                          setMinPrice(e.target.value)
                                        }
                                      />
                                    </div>

                                    <div className="font-semibold text-gray-800">
                                      to
                                    </div>

                                    <div className="relative">
                                      <input
                                        type="number"
                                        className="w-full outline-none text-sm placeholder:text-gray-500 placeholder:font-medium font-semibold p-3 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border rounded-xl bg-white text-center"
                                        placeholder="Max"
                                        min={0}
                                        value={maxPrice}
                                        onChange={(e) =>
                                          setMaxPrice(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <Disclosure
                            as="div"
                            className="border-b border-gray-100 py-5"
                            defaultOpen={true}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root p-3 py-0 rounded-xl font-bold hover:bg-gray-100">
                                  <Disclosure.Button className="flex w-full items-center justify-between py-3 hover:text-gray-500">
                                    <span className="font-bold text-gray-800">
                                      Collection
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                      ) : (
                                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                  {FilterCollections.map(
                                    (collection, index) => (
                                      <div
                                        key={index}
                                        className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                                      >
                                        <input
                                          id={`collection-${collection._id}-${index}`}
                                          name={`${collection._id}[]`}
                                          defaultValue={collection._id}
                                          type="checkbox"
                                          value={collection._id}
                                          checked={selectedCollections.includes(
                                            collection._id
                                          )}
                                          onChange={(e) =>
                                            handleCollectionChange(e)
                                          }
                                          className="h-5 w-5 accent-nft-primary-light"
                                        />
                                        <label
                                          htmlFor={`collection-${collection._id}-${index}`}
                                          className="cursor-pointer text-gray-600"
                                        >
                                          <div className="flex items-center gap-2">
                                            <img
                                              src={collection.image}
                                              alt=""
                                              className="w-11 h-11 rounded-xl object-cover"
                                            />
                                            <div className="flex flex-col gap-0">
                                              <span className="text-sm font-medium">
                                                {collection.name}
                                              </span>
                                              <span className="text-xs">
                                                {
                                                  collectionsTotalItems[
                                                    collection._id
                                                  ]
                                                }{" "}
                                                items
                                              </span>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    )
                                  )}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <Disclosure
                            as="div"
                            className="border-b border-gray-100 py-5"
                            defaultOpen={true}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root p-3 py-0 rounded-xl font-bold hover:bg-gray-100">
                                  <Disclosure.Button className="flex w-full items-center justify-between py-3 hover:text-gray-500">
                                    <span className="font-bold text-gray-800">
                                      Ownership
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                      ) : (
                                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                  {ownerships.map((ownership, index) => (
                                    <div
                                      key={index}
                                      className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                                    >
                                      <input
                                        id={`ownership-${ownership.name}-${index}`}
                                        name="ownership"
                                        type="radio"
                                        value={ownership.name}
                                        defaultChecked={
                                          ownership.name === selectedOwnership
                                        }
                                        onChange={(e) =>
                                          setSelectedOwnership(e.target.value)
                                        }
                                        className="h-5 w-5 accent-nft-primary-light"
                                      />
                                      <label
                                        htmlFor={`ownership-${ownership.name}-${index}`}
                                        className="cursor-pointer text-gray-600"
                                      >
                                        {ownership.name}
                                      </label>
                                    </div>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <Disclosure
                            as="div"
                            className="border-b border-gray-100 py-5"
                            defaultOpen={true}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root p-3 py-0 rounded-xl font-bold hover:bg-gray-100">
                                  <Disclosure.Button className="flex w-full items-center justify-between py-3 hover:text-gray-500">
                                    <span className="font-bold text-gray-800">
                                      Media Type
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                      ) : (
                                        <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-2">
                                  {mediatypes.map((media, index) => (
                                    <div
                                      key={index}
                                      className="flex p-3 gap-4 rounded-xl hover:bg-gray-100  items-center"
                                    >
                                      <input
                                        id={`media-${media.name}-${index}`}
                                        name="media"
                                        type="radio"
                                        value={media.name}
                                        defaultChecked={
                                          media.name === selectedOwnership
                                        }
                                        onChange={(e) =>
                                          setSelectedMediaType(e.target.value)
                                        }
                                        className="h-5 w-5 accent-nft-primary-light"
                                      />
                                      <label
                                        htmlFor={`media-${media.name}-${index}`}
                                        className="cursor-pointer text-gray-600"
                                      >
                                        {media.name}
                                      </label>
                                    </div>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>
                    </div>

                    {/* Product grid */}
                    <div className="lg:col-span-3">
                      <div className="flex justify-between border-b border-gray-100 py-6 items-center sticky top-0 bg-white z-30 w-full px-2">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="relative">
                                <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
                                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                  type="text"
                                  className="text-base rounded-xl border-gray-200 shadow-sm focus:border-nft-primary-light pl-9 block w-full p-3 outline-none border ring-purple-700 focus:ring-1 focus:bg-transparent placeholder-gray-500 text-gray-800"
                                  placeholder="Search by item name"
                                  value={inputQuery}
                                  onChange={(e) =>
                                    setInputQuery(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
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

                          <button
                            className="flex justify-center items-center gap-3 bg-gray-100 py-3 px-4 font-medium rounded-xl hover:bg-gray-200 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <span className="tracking-tight text-gray-900">
                              Filters
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="container mx-auto">
                        <div className="mt-10">
                          <div className="text-start mb-5">
                            <h4 className="font-bold">
                              {newCollections.length} collections
                            </h4>
                          </div>
                          <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            transitionDuration={10000}
                            pauseOnHover={true}
                            // focusOnSelect={true}
                            dotListclassName="custom-dot-list-style"
                            itemclassName="carousel-item-padding-40-px"
                          >
                            {newCollections.map((collection, index) => (
                              <div className="decoration-transparent rounded-xl transition-colors duration-300 p-0 m-2 block h-fit relative">
                                <Link
                                  to={`/marketplace/collection/${collection._id}`}
                                  className="relative h-fit group block bg-gray-100 rounded-xl"
                                >
                                  <div className="rounded-xl overflow-hidden w-full h-fit shadow-lg">
                                    <img
                                      src={collection.image}
                                      alt={collection.name}
                                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>

                                  <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-[#000000a6] bottom-0"></div>

                                  <div className="absolute bottom-0 p-3 flex w-full rounded-b-xl flex-col">
                                    <div className="text-lg font-semibold text-white">
                                      {collection.name}
                                    </div>
                                    <div className="text-sm text-white">
                                      {collectionsTotalItems[collection._id]}{" "}
                                      items
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </Carousel>
                        </div>
                      </div>

                      <div className="results mt-10 relative">
                        {isloading && (
                          <div className="flex w-full absolute h-full top-0 z-40 justify-center items-center m-auto gap-1 flex-col bg-white bg-opacity-30">
                            <div className="w-fit bg-white flex items-center flex-col justify-center p-4 rounded-xl">
                              <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
                              <span className="text-sm text-gray-700 font-medium">
                                processing...
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className="font-bold">
                            {filteredNFTS.length} items
                          </h4>

                          <div className="filters flex gap-1 items-center mt-5 font-normal text-sm text-gray-800">
                            {selectedCategories.map((category, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 p-1 px-1.5 rounded-lg"
                              >
                                cat:
                                <span className="font-medium pl-1">
                                  {category}
                                </span>
                              </span>
                            ))}
                            {minPrice && (
                              <span className="bg-gray-100 p-1 px-1.5 rounded-lg">
                                min:
                                <span className="font-medium pl-1">
                                  {minPrice}
                                </span>
                              </span>
                            )}
                            {maxPrice && (
                              <span className="bg-gray-100 p-1 px-1.5 rounded-lg">
                                max:
                                <span className="font-medium pl-1">
                                  {maxPrice}
                                </span>
                              </span>
                            )}
                            {selectedOwnership && (
                              <span className="bg-gray-100 p-1 px-1.5 rounded-lg">
                                own:
                                <span className="font-medium pl-1">
                                  {selectedOwnership}
                                </span>
                              </span>
                            )}
                            {selectedMediaType && (
                              <span className="bg-gray-100 p-1 px-1.5 rounded-lg">
                                media:
                                <span className="font-medium pl-1">
                                  {selectedMediaType}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-start">
                          {filteredNFTS.map((nft, index) => (
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
                                      <source
                                        src={nft.fileUrl}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  )}
                                </div>
                                <div className="p-2">
                                  <div className="flex justify-between items-center -mt-8 z-20">
                                    <div className="flex -space-x-3">
                                      {nft.ownershipHistory.map(
                                        (history, index) => (
                                          <img
                                            key={index}
                                            className="w-12 h-12 rounded-full border-2 object-cover border-white z-20"
                                            src={history.avatar}
                                            alt="User Imageas"
                                          />
                                        )
                                      )}
                                    </div>
                                    <div className="flex items-center justify-center">
                                      <Menu
                                        as="div"
                                        className="relative text-left"
                                      >
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
                                                toast.success(
                                                  "Link copied to clipboard"
                                                );
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
                                      !checkIfUserLikedNFT(nft) &&
                                      "text-gray-700"
                                    }
                                  >
                                    {nftLikes && countNFTLikes(nft)}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}

                          {filteredNFTS.length === 0 && (
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
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
          {/* LAYOUT */}
        </div>

        <div className="text-center mt-9">
          <button className="bg-nft-primary-transparent rounded-full px-6 py-3 font-semibold text-sm text-nft-primary-light w-1/5 hover:bg-nft-primary-light hover:text-white duration-300 transition-colors">
            <span>Load More</span>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Explore;
