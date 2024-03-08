import React, { Fragment, useEffect, useState } from "react";
import {
  PlusIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NFTPreview from "../components/nft/NFTPreview";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../../constants/ContractDetails";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Web3 } from "web3";
import { Listbox, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const SellerNewNFT = () => {
  const isWalletConnected = useSelector(
    (state) => state.user.isWalletConnected
  );
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [royalties, setroyalties] = useState(null);
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState("");

  const [traitName, settraitName] = useState("");
  const [traitType, settraitType] = useState("");
  const [traits, setTraits] = useState([]);
  const [traitErrors, setTraitErrors] = useState({});
  const [traitModalOpen, setTraitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isVideoFile, setIsVideoFile] = useState(false);
  const [nftStatusMessage, setNFTStatusMessage] = useState("");

  const [isNewCollection, setIsNewCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionImage, setCollectionImage] = useState(null);
  const [collectionErrors, setCollectionErrors] = useState({});
  const [collections, setCollections] = useState([]);

  const categories = [
    { name: "Art" },
    { name: "Gaming" },
    { name: "Memberships" },
    { name: "PFPs" },
    { name: "Photography" },
    { name: "Music" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const projectId = process.env.REACT_APP_INFURA_API_KEY;
  const projectSecretKey = process.env.REACT_APP_INFURA_API_KEY_SECRET;
  const encoder = new TextEncoder();
  const data = encoder.encode(`${projectId}:${projectSecretKey}`);
  const auth = `Basic ${btoa(String.fromCharCode.apply(null, data))}`;
  const subdomain = process.env.REACT_APP_INFURA_SUBDOMAIN;
  const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

  const client = ipfsHttpClient({
    host: process.env.REACT_APP_INFURA_HOST,
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const handleCollectionSelect = (id) => {
    setSelectedCollection(id === selectedCollection ? null : id);
  };

  const AddTrait = () => {
    const errors = {};

    if (!traitName) {
      errors.traitName = "Name cannot be empty";
    }
    if (traitName.length < 2 || traitName.length > 20) {
      errors.traitName = "Name must be between 2 and 20 characters long";
    }
    if (!traitType) {
      errors.traitType = "Type cannot be empty";
    }
    if (traitType.length < 2 || traitType.length > 20) {
      errors.traitType = "Type must be between 2 and 20 characters long";
    }

    setTraitErrors(errors);

    if (traitName && traitType) {
      setTraits([...traits, { traitName, traitType }]);
      setTraitModalOpen(false);
      settraitName("");
      settraitType("");
    }
  };

  useEffect(() => {
    if (!isWalletConnected) {
      navigate("/dashboard");
      return;
    }
  }, [isWalletConnected]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors({ image: "File size exceeds 50MB." });
        e.target.value = null;
        return;
      }

      if (file.type === "video/mp4") {
        const videoUrl = URL.createObjectURL(file);
        setIsVideoFile(true);
        setPreview(videoUrl);
        setFileType("video");
      } else {
        setIsVideoFile(false);
        setPreview(URL.createObjectURL(file));
        setFileType("image");
      }
      setImage(file);
    }
  };

  const DeleteTrait = (index) => {
    setTraits(traits.filter((trait, i) => i !== index));
  };

  const validateForm = () => {
    setNFTStatusMessage("Validating...");
    const errors = {};

    if (!name) {
      errors.name = "Name cannot be empty";
    }
    if (name.length > 50) {
      errors.name = "Name cannot be more than 50 characters";
    }
    if (!description) {
      errors.description = "Description cannot be empty";
    }
    if (description.trim().length > 450 || description.trim().length < 10) {
      errors.description =
        "Description must be between 10 and 450 characters long";
    }
    if (!price) {
      errors.price = "Price cannot be empty";
    }
    if (price < 0) {
      errors.price = "Price cannot be less than 0";
    }
    if (price > 1000000) {
      errors.price = "Price cannot be more than 1,000,000";
    }
    if (!royalties) {
      errors.royalties = "Royalties cannot be empty";
    }
    if (royalties < 0 || royalties > 100) {
      errors.royalties = "Royalties must be between 0 and 100";
    }
    if (!image) {
      errors.image = "Please add a File.";
    }
    if (traits.length === 0) {
      errors.traits = "Add at least one trait";
    }
    if (!selectedCollection) {
      errors.selectedCollection = "Please select a collection";
    }
    if (!selectedCategory) {
      errors.category = "Please select a category";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadToIPFS = async (file) => {
    setNFTStatusMessage("Uploading to IPFS...");
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setErrors({ message: "Error uploading to IPFS" });
      console.log(`Error uploading to IPFS: ${error}`);
    }
  };

  const getCollection = async (collectionId) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/nft/getCollection`,
      {
        method: "POST",
        headers: {
          "x-auth-token": user.jwtToken,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          collectionId,
        }),
      }
    );

    const responseData = await res.json();
    return responseData;
  };

  // Create NFT
  const createNFT = async (name, price, fileUrl, description, router) => {
    setNFTStatusMessage("Creating NFT...");
    try {
      const collection = await getCollection(selectedCollection);
      const data = JSON.stringify({
        name,
        description,
        creator: { ...user, walletAddress },
        currentOwner: { ...user, walletAddress },
        ownershipHistory: [{ ...user, walletAddress }],
        fileUrl,
        fileType,
        price,
        currency: "ETH",
        category: selectedCategory.name,
        traits,
        collection,
        royalties,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isRewardItem: false,
      });

      const added = await client.add(data);
      const url = `https://nfluencer.infura-ipfs.io/ipfs/${added.path}`;

      await createSale(url, price, fileUrl);
    } catch (error) {
      setErrors({ message: "Error creating NFT" });
      console.log(`Error creating NFT: ${error}`);
    }
  };

  // Create Sale
  const createSale = async (url, formInputPrice, fileUrl, isReselling, id) => {
    try {
      const { marketplaceContract } = await connectingWithSmartContract();

      setNFTStatusMessage("Creating NFT Token...");
      const _price = ethers.utils.parseUnits(
        formInputPrice.toString(),
        "ether"
      );
      let listingPrice = await marketplaceContract.getListingPrice();
      listingPrice = listingPrice.toString();

      setNFTStatusMessage("Listing on Marketplace...");
      const transaction = await marketplaceContract.createToken(url, _price, {
        value: listingPrice,
      });

      await transaction.wait();
      const transactionHash = transaction.hash;

      const transactionReceipt = await web3.eth.getTransactionReceipt(
        transactionHash
      );

      if (transactionReceipt) {
        /*
          const logs = transactionReceipt.logs;
          const tokenId = web3.utils.hexToNumber(logs[0].topics[3]);
          const from = transaction.from;
          const to = transaction.to;

          const data = {
            name,
            description,
            file: fileUrl,
            fileType,
            price: formInputPrice.toString(),
            etherPrice: web3.utils
              .fromWei(Number(formInputPrice), "ether")
              .toString(),
            currency: "ETH",
            category: selectedCategory.name,
            traits,
            collection: selectedCollection,
            royalties,
            from,
            to,
            tokenId,
            creator: user._id,
            transactionHash,
            gasUsed: transactionReceipt.gasUsed.toString(),
            effectiveGasPrice: transactionReceipt.effectiveGasPrice.toString(),
            blockHash: transactionReceipt.blockHash,
            nftUrl: url,
            walletAddress: walletAddress,
            isRewardItem: false,
          };
        */
        await saveNFTData(selectedCollection);
      } else {
        setErrors({ message: "Transaction receipt not found" });
      }
    } catch (error) {
      if (error.code) {
        toast.error(error.code);
      }
      if (error.code === 4001) {
        toast.error("Transaction rejected by the user");
      }
      setErrors({ message: "Error creating sale" });
      console.log(`Error creating sale: ${error}`);
    }
  };

  const saveNFTData = async (selectedCollection) => {
    setNFTStatusMessage("Saving NFT data...");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/nft/`, {
      method: "POST",
      headers: {
        "x-auth-token": user.jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection: selectedCollection,
        walletAddress,
      }),
    });

    const responseData = await res.json();
    if (responseData) {
      if (responseData.error) {
        setErrors({ message: responseData.message });
        return;
      }
      toast.success("NFT created successfully");
      navigate("/dashboard/nfts");
    }
  };

  const fetchContract = (signerOrProvider) => {
    setNFTStatusMessage("Fetching contract...");
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    // const nftContract = new ethers.Contract(
    //   NFTContractAddress,
    //   NFTContractABI,
    //   signerOrProvider
    // );

    return { marketplaceContract };
  };

  const connectingWithSmartContract = async () => {
    setNFTStatusMessage("Loading smart contract...");
    try {
      const w3modal = new Web3Modal();
      const connection = await w3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = await provider.getSigner();

      const { marketplaceContract } = fetchContract(signer);
      return { marketplaceContract };
    } catch (error) {
      setErrors({ message: "Error connecting with smart contract" });
      console.log(`Error connecting with smart contract: ${error}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
      const fileUrl = await uploadToIPFS(image);
      await createNFT(name, price, fileUrl, description, navigate);
    }
    setNFTStatusMessage("");
    setIsSubmitting(false);
  };

  const AddNewCollection = async () => {
    setCollectionErrors({ isloading: true });
    try {
      if (!collectionName) {
        setCollectionErrors({ message: "Collection name cannot be empty" });
        return;
      }
      if (!collectionImage) {
        setCollectionErrors({ message: "Collection image cannot be empty" });
        return;
      }
      if (collectionName.length > 20) {
        setCollectionErrors({
          message: "Collection name cannot be more than 20 characters",
        });
        return;
      }
      if (!collectionDescription) {
        setCollectionErrors({
          message: "Collection description cannot be empty",
        });
        return;
      }

      if (collectionName && collectionImage && collectionDescription) {
        const fileUrl = await uploadToIPFS(collectionImage);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/nft/addCollection`,
          {
            method: "POST",
            headers: {
              "x-auth-token": user.jwtToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: collectionName,
              image: fileUrl,
              description: collectionDescription,
              userId: user._id,
              walletAddress,
            }),
          }
        );

        const data = await res.json();

        if (data.error) {
          setCollectionErrors({ message: data.message });
          return;
        }

        setCollectionImage(null);
        setCollectionName("");
        setCollectionErrors({ message: "" });
        setIsNewCollection(false);
        setCollections(data.collections);
      }
    } catch (error) {
      console.log(errors);
      setCollectionErrors({ message: error.message });
    }

    setCollectionErrors({ isloading: false });
  };

  const fetchCollections = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/nft/getCollections`,
      {
        method: "POST",
        headers: {
          "x-auth-token": user.jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      }
    );

    const data = await res.json();
    setCollections(data.collections);
  };

  useEffect(() => {
    fetchCollections();
  }, [user]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto my-10 mt-0 rounded-xl p-4 bg-white shadow-lg shadow-gray-200">
        <div className="py-7 pt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            Add new NFT
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="order-2 md:order-1 w-full">
            <div className="mb-14">
              <div className="font-bold text-md">Upload an item</div>
              <p className="text-sm text-gray-500">
                They all serve the same purpose, but each one takes.
              </p>
              <div className="w-full mt-6 border-2 rounded-xl border-dashed border-gray-300">
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg, .jpeg, .png, .gif, .svg, .mp4"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
                <label
                  for="image"
                  className={`cursor-pointer overflow-hidden hover:opacity-80 w-full h-full flex items-center flex-col justify-center gap-0 group relative ${
                    !preview && "px-10 py-6"
                  }`}
                >
                  {preview && (
                    <div className="w-full h-full">
                      {isVideoFile ? (
                        <video
                          controls
                          width="100%"
                          height="100%"
                          className="rounded-xl"
                        >
                          <source src={preview} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={preview}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      )}
                    </div>
                  )}

                  {!preview && (
                    <div className="text-center flex items-center justify-center flex-col">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-28 h-28 stroke-gray-300 stroke-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                      <div className="font-extrabold text-md mt-4">
                        Choose an item to upload
                      </div>
                      <p className="text-sm text-gray-500">Max size: 50MB</p>
                      <p className="text-sm text-gray-500">
                        JPG, PNG, GIF, SVG, MP4
                      </p>
                    </div>
                  )}

                  {preview && (
                    <div className="absolute top-0 right-0 w-full h-full items-center justify-center bg-black rounded-xl bg-opacity-80 text-white text-sm hidden group-hover:flex">
                      <span className="bg-white text-black p-3 rounded-xl">
                        Change File
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {errors.image && (
                <div className="text-red-500 text-sm mt-2">{errors.image}</div>
              )}
            </div>

            <div className="mb-6">
              <div className="font-bold text-md">Item Details</div>
              <p className="text-sm text-gray-500">
                They all serve the same purpose, but each one takes.
              </p>
              <div className="mt-6">
                <div className="mb-6 flex justify-between items-center gap-6">
                  <div className="w-full">
                    <label className="block font-semibold text-sm text-gray-800 mb-2">
                      Name your item
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brown Grizzly Bear Smile"
                      className="w-full rounded-xl border-gray-200 border p-4 outline-none text-sm placeholder:text-gray-400 placeholder:font-medium font-semibold px-5 focus:ring-2 focus:ring-nft-primary-light bg-gray-100 hover:opacity-80 focus:bg-white"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    {errors.name && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block font-semibold text-sm text-gray-800 mb-2">
                      Choose category
                    </label>
                    <Listbox
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative cursor-pointer pr-10 text-left sm:text-sm w-full rounded-xl border-gray-200 border p-4 outline-none text-sm font-semibold px-5 focus:ring-2 focus:ring-nft-primary-light bg-gray-100 hover:opacity-80 focus:bg-white">
                          {selectedCategory !== null ? (
                            <span className="block truncate">
                              {selectedCategory.name}
                            </span>
                          ) : (
                            <span className="block truncate text-gray-400 font-medium">
                              Select a category
                            </span>
                          )}
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-md text-sm z-50">
                            {categories.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className="text-gray-900 pl-4 hover:bg-gray-200 py-2 cursor-pointer"
                                value={person}
                              >
                                {() => (
                                  <>
                                    <span className="block truncate">
                                      {person.name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>

                    {errors.category && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.category}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-semibold text-sm text-gray-800 mb-2">
                    Enter short description
                  </label>
                  <textarea
                    type="text"
                    className="w-full rounded-xl border-gray-200 border p-4 outline-none text-sm placeholder:text-gray-400 placeholder:font-medium font-semibold px-5 focus:ring-2 focus:ring-nft-primary-light bg-gray-100 hover:opacity-80 focus:bg-white h-40 resize-none"
                    placeholder="e.g. Description about the NFT"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  {errors.description && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-6 flex gap-6">
                  <div className="w-full">
                    <label className="block font-semibold text-sm text-gray-800 mb-2">
                      Set item price or starting bid
                    </label>

                    <div className="relative">
                      <span className="absolute top-2 left-2">
                        <img
                          src={require("../../../nftmarketplace/assets/eth.png")}
                          alt=""
                          className="w-5"
                        />
                      </span>
                      <input
                        type="number"
                        className="w-full outline-none text-sm placeholder:text-gray-400 placeholder:font-medium font-semibold px-2 pl-10 p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border rounded-xl bg-gray-100"
                        placeholder="e.g. 17"
                        value={price}
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    {errors.price && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.price}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block font-semibold text-sm text-gray-800 mb-2">
                      Royalties (in %)
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-xl border-gray-200 border p-4 outline-none text-sm placeholder:text-gray-400 placeholder:font-medium font-semibold px-5 focus:ring-2 focus:ring-nft-primary-light bg-gray-100 hover:opacity-80 focus:bg-white"
                      placeholder="e.g. 12"
                      min={0}
                      value={royalties}
                      onChange={(e) => setroyalties(e.target.value)}
                    />

                    {errors.royalties && (
                      <div className="text-red-500 text-sm mt-2">
                        {errors.royalties}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-bold text-md mb-2">Traits</label>
                  <p className="text-sm text-gray-500">
                    Traits describe attributes of your item. They appear as
                    filters inside your collection page and are also listed out
                    inside your item page.
                  </p>

                  <button
                    className="flex justify-between items-center mt-4 font-semibold gap-3 text-gray-800 text-base mb-3 hover:opacity-80"
                    onClick={() => setTraitModalOpen(true)}
                  >
                    <span>
                      <PlusIcon className="w-5 h-5" />
                    </span>
                    <span>Add trait</span>
                  </button>

                  {errors.traits && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.traits}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {traits.map((trait, index) => (
                      <div
                        className="justify-between flex items-center bg-gray-50 rounded-xl p-3 gap-3 text-sm"
                        key={index}
                      >
                        <div className="flex gap-1 font-semibold">
                          <span>{trait.traitType}</span>
                          <span>:</span>
                          <span>{trait.traitName}</span>
                        </div>
                        <button
                          className="text-gray-500 hover:text-gray-800"
                          onClick={() => DeleteTrait(index)}
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
                      traitModalOpen ? "flex" : "hidden"
                    }`}
                  >
                    <div className="w-1/3 bg-white p-4 rounded-xl shadow-xl h-fit mt-16 relative">
                      <h2 className="block font-bold text-xl text-gray-800 mb-5">
                        Add trait
                      </h2>
                      <button
                        className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
                        onClick={() => setTraitModalOpen(false)}
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                      <div className="flex justify-between items-center gap-3">
                        <div>
                          <label className="block font-semibold text-sm text-gray-800 mb-2">
                            Type
                          </label>
                          <input
                            type="text"
                            placeholder="Ex. Size"
                            className="w-full rounded-xl border-gray-200 border p-3 outline-none focus:ring-2 focus:ring-nft-primary-light font-normal"
                            value={traitType}
                            onChange={(e) => settraitType(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-sm text-gray-800 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Ex. Large"
                            className="w-full rounded-xl border-gray-200 border p-3 outline-none focus:ring-2 focus:ring-nft-primary-light font-normal"
                            value={traitName}
                            onChange={(e) => settraitName(e.target.value)}
                          />
                        </div>
                      </div>

                      {traitErrors.traitName && (
                        <div className="text-red-500 text-sm mt-2">
                          {traitErrors.traitName}
                        </div>
                      )}

                      {traitErrors.traitType && (
                        <div className="text-red-500 text-sm mt-2">
                          {traitErrors.traitType}
                        </div>
                      )}

                      <button
                        className="w-full bg-nft-primary-light text-white p-3 mt-7 rounded-xl hover:opacity-80"
                        onClick={AddTrait}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>

            <div className="mb-14">
              <div className="font-bold text-md">Choose collection</div>
              <p className="text-sm text-gray-500">
                They all serve the same purpose.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 w-full">
                <button
                  className="flex gap-2 flex-row py-4 border text-gray-800 rounded-xl p-1 px-4 text-md font-bold items-center hover:bg-gray-100 w-full"
                  onClick={() => setIsNewCollection(true)}
                  disabled={isNewCollection}
                >
                  <PlusCircleIcon className="w-14 h-14 bg-gray-200 p-3 rounded-xl fill-gray-500" />
                  <span className="text-left text-sm">
                    Create new collection
                    <span className="block text-xs text-gray-600 font-semibold">
                      Click to create
                    </span>
                  </span>
                </button>

                <div
                  className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
                    isNewCollection ? "flex" : "hidden"
                  }`}
                >
                  <div className="w-1/3 bg-white p-4 rounded-xl shadow-xl h-fit mt-16 relative">
                    <h2 className="block font-bold text-xl text-gray-800 mb-5">
                      Create a Collection for your NFTs
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
                      onClick={() => setIsNewCollection(false)}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>

                    <div className="w-full mb-2">
                      <label className="block font-semibold text-sm text-gray-800 mb-2">
                        Logo Image
                      </label>
                      <input
                        type="file"
                        className="w-full rounded-xl border-gray-200 border p-3 outline-none focus:ring-2 focus:ring-nft-primary-light font-normal block"
                        onChange={(e) => setCollectionImage(e.target.files[0])}
                      />
                    </div>

                    <div className="w-full mb-2">
                      <label className="block font-semibold text-sm text-gray-800 mb-2">
                        Collection Name
                      </label>
                      <input
                        type="text"
                        placeholder="My Collection Name"
                        className="w-full rounded-xl border-gray-200 border p-3 outline-none focus:ring-2 focus:ring-nft-primary-light font-normal block"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block font-semibold text-sm text-gray-800 mb-2">
                        Enter short description
                      </label>
                      <textarea
                        type="text"
                        className="w-full rounded-xl border-gray-200 border p-3 outline-none focus:ring-2 focus:ring-nft-primary-light font-normal block h-40 resize-none"
                        placeholder="e.g. Description about the collection"
                        value={collectionDescription}
                        onChange={(e) =>
                          setCollectionDescription(e.target.value)
                        }
                      ></textarea>
                    </div>

                    {collectionErrors.message && (
                      <div className="text-red-500 text-sm mt-2">
                        {collectionErrors.message}
                      </div>
                    )}

                    <button
                      className="w-full bg-nft-primary-light text-white p-3 mt-7 rounded-xl hover:opacity-80"
                      onClick={AddNewCollection}
                      disabled={collectionErrors.isloading}
                    >
                      {collectionErrors.isloading ? (
                        <div className="h-5 w-5 mx-auto rounded-full border-t-white border-nft-primary-dark border-2 animate-spin"></div>
                      ) : (
                        <span>Create Collection</span>
                      )}
                    </button>
                  </div>
                </div>

                {collections.map((collection, index) => (
                  <button
                    className={`flex gap-2 w-full flex-row py-4 border text-gray-800 rounded-xl p-1 px-4 text-md font-bold items-center hover:bg-gray-100 ${
                      selectedCollection === collection._id
                        ? "bg-nft-primary-transparent ring-2 ring-nft-primary-light"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleCollectionSelect(collection._id)}
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div className="text-left text-sm">
                      {collection.name}
                      <span className="block text-xs text-gray-600 font-semibold">
                        {collection.totalItems} items
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {errors.selectedCollection && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.selectedCollection}
                </div>
              )}

              <span className="text-xs text-gray-600">
                * Once your item is minted you will not be able to change any of
                its information.
              </span>
            </div>

            <div className="mb-0">
              <div>
                {errors.message && (
                  <div className="text-red-500 text-sm mb-2">
                    {errors.message}
                  </div>
                )}

                <div className="flex justify-between items-center flex-row">
                  <div className="text-center w-full">
                    <button
                      className="rounded-xl px-6 py-4 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200 max-w-sm w-full"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <div className="flex gap-2 items-center justify-center">
                          <div className="h-5 w-5 rounded-full border-t-white border-nft-primary-dark border-2 animate-spin"></div>
                          <span className="font-normal text-sm">
                            {nftStatusMessage}
                          </span>
                        </div>
                      ) : (
                        <>
                          <span>Create NFT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full">
            <NFTPreview
              name={name}
              price={price}
              royalties={royalties}
              preview={preview}
              traits={traits}
              isVideoFile={isVideoFile}
              category={selectedCategory ? selectedCategory.name : ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerNewNFT;
