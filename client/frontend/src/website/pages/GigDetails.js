import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  CubeIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  ClockIcon,
  ArrowPathIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";
import axios from "axios";
import { ethers } from "ethers";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../constants/ContractDetails";

function GigDetails() {
  let { gigtitle, gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const user = useSelector((state) => state.user.user);

  const fetchGigDetails = async () => {
    const req = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gigId: gigId,
        }),
      }
    );
    const res = await req.json();
    console.log(res);
    if (res.error) {
      navigate("/");
      return;
    }
    setGig(res[0]);
  };

  useEffect(() => {
    if (!gigId) {
      navigate("/");
      return;
    }
    fetchGigDetails();
  }, [gigId, navigate]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    return (
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear()
    );
  };

  const countViews = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/gig/countViews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gigId: gigId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (gigId) {
      countViews();
    }
  }, [gigId]);

  const [gigReviews, setGigReviews] = useState([]);
  const [gigAverage, setGigAverage] = useState(0);
  const [gigReviewsCount, setGigReviewsCount] = useState(0);

  const getGigReviews = async () => {
    try {
      const req = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/getGigReviews/${gigId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      setGigReviews(res);
      console.log(res);
      let sum = 0;
      res.forEach((review) => {
        sum += review.rating;
      });
      setGigAverage(sum / res.length);
      setGigReviewsCount(res.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (gigId) {
      getGigReviews();
    }
  }, [gigId]);

  const [nftMetaData, setNftMetaData] = useState(null);
  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };

  const fetchNFTDetails = async (itemId) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_SEPOLIA_URL
    );
    const { marketplaceContract } = fetchContract(provider);
    const fetchedNFT = await marketplaceContract.getNFTDetails(itemId);
    const tokenUri = await marketplaceContract.tokenURI(fetchedNFT.itemId);
    const meta = await axios.get(tokenUri);
    setNftMetaData({
      ...meta.data,
      seller: fetchedNFT.seller,
      weiPrice: fetchedNFT.price,
      itemId: Number(fetchedNFT.itemId),
    });
  };

  useEffect(() => {
    if (gig && gig.offerReward) {
      fetchNFTDetails(gig.rewardNFT);
      console.log(nftMetaData);
    }
  }, [gig]);

  const [reviewInput, setReviewInput] = useState("");
  const sortingOptions = [
    {
      name: "Most Recent",
    },
    {
      name: "Oldest",
    },
  ];
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0].name
  );
  const filteredReviews = gigReviews
    .filter((review) => review.reviewText.includes(reviewInput))
    .sort((a, b) => {
      if (selectedSortingOption === "Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else if (selectedSortingOption === "Most Recent")
        return new Date(b.createdAt) - new Date(a.createdAt);
      else return 0;
    });

  if (!gig) {
    <Loader />;
  } else
    return (
      <>
        <div className="bg-transparent hombg">
          <Header transparent={true} />
        </div>

        {/* messaging */}
        <button
          className={`fixed z-50 bottom-10 left-10 bg-white rounded-full shadow-lg text-gray-800 p-1.5 pr-4 hover:bg-gray-100 cursor-pointer block ${
            modalIsOpen && "hidden"
          }`}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <span className="absolute w-3 h-3 rounded-full bottom-0 right-0 bg-green-500 z-40 ring-2 ring-white"></span>
              <img
                src={gig.user.avatar}
                alt=""
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            </div>
            <div className="flex flex-col text-sm gap-2 text-start">
              <div className="font-bold">Message {gig.user.name}</div>
              <div className="flex gap-1 text-xs items-center">
                <span>Away</span>
                <span className="font-bold">·</span>
                <span>
                  <span>Avg. response time:</span>
                  <span className="font-semibold"> 1 Hour</span>
                </span>
              </div>
            </div>
          </div>
        </button>

        <div
          className={`fixed z-50 bottom-10 left-10 bg-white rounded-xl shadow-lg w-1/3 ${
            !modalIsOpen && "hidden"
          }`}
        >
          <div className="flex items-center gap-4 w-full bg-nft-primary-light p-4 rounded-t-xl text-white relative py-8">
            <button
              className="absolute right-2 top-2 p-2 text-nft-primary-light rounded-full bg-white"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 relative">
              <span className="absolute w-3 h-3 rounded-full bottom-1 right-1 bg-green-500 z-40 ring-2 ring-white"></span>
              <img
                src={gig.user.avatar}
                alt=""
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            </div>
            <div className="flex flex-col text-base gap-2 text-start">
              <div className="font-bold">Message {gig.user.name}</div>
              <div className="flex gap-1 text-sm items-center">
                <span>Away</span>
                <span className="font-bold">·</span>
                <span>
                  <span>Avg. response time:</span>
                  <span className="font-semibold"> 1 Hour</span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <textarea
              className="border-b-2 resize-none outline-none border-gray-200 focus:border-nft-primary-light h-52 w-full p-4 text-gray-800 text-base"
              placeholder={`Ask ${gig.user.name} a question or share your project details (requirements, timeline, budget, etc.)`}
            ></textarea>
            <div className="p-4 pt-0">
              <div className="text-right text-sm text-gray-500 italic">
                <span>0/2500</span>
              </div>

              <div className="flex justify-end mt-5">
                <button className="px-4 p-3 bg-nft-primary-light flex gap-2 text-white rounded-xl text-base hover:opacity-80">
                  <PaperAirplaneIcon className="w-5 h-5 text-white transform -rotate-45" />
                  <span>Send message</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* messaging */}
        <div className="pt-0">
          <div className="p-10 pt-0">
            {/* message */}
            <div className="flex justify-end my-8 gap-4 text-sm items-center text-gray-800">
              <button className="flex items-center border rounded-xl hover:bg-gray-50 p-2 gap-2">
                <HeartIcon className="w-5 h-5 text-gray-300" />
                <span className="font-semibold">1,505</span>
              </button>
              <button className="border rounded-xl hover:bg-gray-50 p-2 px-4">
                <ShareIcon className="w-5 h-5" />
              </button>
              <Menu
                as="button"
                className="border rounded-xl hover:bg-gray-50 p-1 px-3 relative"
              >
                <Menu.Button className="flex">
                  <EllipsisHorizontalIcon className="w-7 h-7" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 -mt-0 w-32 origin-top-right rounded-md bg-white shadow-lg focus:outline-none p-0 overflow-hidden border py-2">
                    <div>
                      <Menu.Item>
                        <a
                          href="{option.href}"
                          className="text-gray-700 p-2 hover:bg-gray-100 flex gap-2 items-center"
                        >
                          <span>
                            <FlagIcon className="h-5 w-5 text-gray-700" />
                          </span>
                          <span>Report Gig</span>
                        </a>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <div className="flex justify-between gap-20 w-full text-gray-800 mb-20">
              <div className="md:w-2/3 w-full">
                <div className="mb-10 border-b pb-6 border-gray-100">
                  <div className="mb-2 text-sm text-gray-500 flex gap-2">
                    <span>{gig.category}</span>
                    <span>/</span>
                    <span>{gig.subcategory}</span>
                  </div>

                  <h1 className="text-4xl font-bold mb-7">{gig.title}</h1>

                  <div className="flex items-center gap-10 justify-between">
                    <div className="flex items-center gap-2 text-md font-semibold">
                      <img
                        src={gig.user.avatar}
                        className="rounded-full h-16 w-16 object-cover"
                        alt=""
                      />
                      <span className="flex flex-col gap-1">
                        <span className="text-md">{gig.user.name}</span>
                        <span className="text-sm text-gray-500 font-normal">
                          @{gig.user.username}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-md">
                      <span>
                        <StarIcon className="w-6 h-6 fill-yellow-500" />
                      </span>
                      <span className="font-semibold">{gigAverage || 0}</span>
                      <span className="text-gray-500">
                        ({gigReviewsCount} Reviews)
                      </span>
                    </div>
                  </div>

                  {gig.offerReward && nftMetaData && (
                    <div className="my-5">
                      <h3 className="text-sm text-gray-500 px-2 mb-1">
                        Reward NFT
                      </h3>
                      <div className="flex items-center shadow-md shadow-gray-200 border border-gray-100 rounded-xl gap-4 w-fit pr-10 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex h-full relative">
                          <img
                            src={nftMetaData.fileUrl}
                            alt=""
                            className="w-28 h-32 rounded-l-xl object-cover"
                          />

                          <Link
                            class="rounded-md text-nft-primary-light bg-white p-0.5 absolute top-2 right-2 text-sm"
                            to={nftMetaData.fileUrl}
                            target="_blank"
                            title="View Original Media File"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </Link>
                        </div>
                        <div className="flex-1 py-2">
                          <Link
                            className="text-lg text-gray-800 font-bold flex items-center gap-1"
                            to={`/marketplace/nft/${nftMetaData.itemId}`}
                            target="_blank"
                          >
                            <span>{nftMetaData.name}</span>
                            <ArrowUpRightIcon className="w-4 h-4 text-gray-500" />
                          </Link>

                          <div className="flex gap-1 items-baseline text-gray-800 mb-2">
                            <span className="font-semibold text-base">
                              {nftMetaData.price}
                            </span>
                            <span className="font-normal text-gray-500 text-xs">
                              ETH
                            </span>
                          </div>

                          <div class="flex items-center justify-evenly w-full gap-4">
                            <div class="flex flex-col gap-1 w-full">
                              <div class="flex items-center gap-3">
                                <img
                                  src="http://res.cloudinary.com/ds2ss4xmg/image/upload/v1697793424/izwfsygozecbxln3pim9.png"
                                  alt="User Imasge"
                                  class="rounded-full h-9 w-9 object-cover"
                                />
                                <div class="flex flex-col items-start">
                                  <button class="font-bold text-gray-800 text-xs">
                                    Category
                                  </button>
                                  <div class="text-xs text-gray-500">
                                    {nftMetaData.category}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="flex flex-col gap-1 w-full">
                              <div class="flex items-center gap-3">
                                <img
                                  src={nftMetaData.collection.image}
                                  alt="User Imasge"
                                  class="rounded-full h-9 w-9 object-cover"
                                />
                                <div class="flex flex-col items-start">
                                  <button class="font-bold text-gray-800 text-xs">
                                    Collection
                                  </button>
                                  <div class="text-xs text-gray-500">
                                    {nftMetaData.collection.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="block bg-transparent">
                  <div className="mb-6 w-full">
                    <Tabs
                      className="w-full"
                      selectedTabClassName="p-0 opacity-95 m-0 ring-nft-primary-light"
                    >
                      {gig.images.map((img, index) => (
                        <TabPanel key={index}>
                          <div className="rounded-xl overflow-hidden">
                            <img
                              src={img}
                              alt=""
                              className="w-full h-96 object-cover"
                            />
                          </div>
                        </TabPanel>
                      ))}

                      <div className="flex justify-between items-center">
                        <TabList className="border-b border-gray-100 p-4 flex justify-center items-center w-full gap-4">
                          {gig.images.map((img, index) => (
                            <Tab
                              className="cursor-pointer rounded-xl opacity-40 ring-2"
                              key={index}
                            >
                              <img
                                src={img}
                                alt=""
                                className="w-20 rounded-xl object-cover"
                              />
                            </Tab>
                          ))}
                        </TabList>
                      </div>
                    </Tabs>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl my-5 mt-10">
                      Service Description
                    </h3>
                    <p
                      className="text-gray-600 mb-6 break-all"
                      dangerouslySetInnerHTML={{ __html: gig.description }}
                    ></p>
                  </div>

                  <h3 className="font-semibold text-xl my-5 mt-10">
                    Compare Packages
                  </h3>

                  <div className="flex justify-between">
                    <div className="text-gray-600 w-full">
                      <div className="w-full">
                        <div className="overflow-x-auto w-full">
                          <table
                            className="border-collapse border border-gray-100 text-left w-full text-sm"
                            cellPadding={0}
                          >
                            <thead>
                              <tr>
                                <th className="font-normal p-5">Package</th>
                                <th className="border-collapse border border-gray-100 p-5 py-7">
                                  <span className="block text-lg font-medium mb-2">
                                    $ {gig.packages.basic.price}
                                  </span>
                                  <span className="text-base">BASIC</span>
                                </th>

                                {gig.offer3Packages && (
                                  <th className="border-collapse border border-gray-100 p-5 py-7">
                                    <span className="block text-lg font-medium mb-2">
                                      $ {gig.packages.standard.price}
                                    </span>
                                    <span className="text-base">STANDARD</span>
                                  </th>
                                )}

                                {gig.offer3Packages && (
                                  <th className="border-collapse border border-gray-100 p-5 py-7">
                                    <span className="block text-lg font-medium mb-2">
                                      $ {gig.packages.premium.price}
                                    </span>
                                    <span className="text-base">PREMIUM</span>
                                  </th>
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td className="p-5 font-normal">Name</td>
                                <td className="border-collapse border border-gray-100 p-5 font-medium">
                                  {gig.packages.basic.name}
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 font-medium">
                                    {gig.packages.standard.name}
                                  </td>
                                )}

                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 font-medium">
                                    {gig.packages.premium.name}
                                  </td>
                                )}
                              </tr>

                              <tr className="">
                                <td className="p-5 font-normal">Description</td>
                                <td className="border-collapse border border-gray-100 p-5">
                                  {gig.packages.basic.description}
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5">
                                    {gig.packages.standard.description}
                                  </td>
                                )}
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5">
                                    {gig.packages.premium.description}
                                  </td>
                                )}
                              </tr>

                              <tr className="bg-gray-100">
                                <td className="p-5 font-normal">
                                  Delivery Time
                                </td>
                                <td className="border-collapse border border-gray-100 p-5 text-center">
                                  {gig.packages.basic.deliveryTime} Days
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 text-center">
                                    {gig.packages.standard.deliveryTime} Days
                                  </td>
                                )}
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 text-center">
                                    {gig.packages.premium.deliveryTime} Days
                                  </td>
                                )}
                              </tr>

                              <tr>
                                <td className="p-5 font-normal">Support</td>
                                <td className="border-collapse border border-gray-100 p-5">
                                  <div className="flex justify-center items-center">
                                    <CheckIcon
                                      className={`w-5 h-5 ${
                                        gig.packages.basic.support
                                          ? "text-gray-800"
                                          : "text-gray-500"
                                      } `}
                                    />
                                  </div>
                                </td>

                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5">
                                    <div className="flex justify-center items-center">
                                      <CheckIcon
                                        className={`w-5 h-5 ${
                                          gig.packages.standard.support
                                            ? "text-gray-800"
                                            : "text-gray-500"
                                        } `}
                                      />
                                    </div>
                                  </td>
                                )}

                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5">
                                    <div className="flex justify-center items-center">
                                      <CheckIcon
                                        className={`w-5 h-5 ${
                                          gig.packages.premium.support
                                            ? "text-gray-800"
                                            : "text-gray-500"
                                        } `}
                                      />
                                    </div>
                                  </td>
                                )}
                              </tr>

                              <tr className="bg-gray-100">
                                <td className="p-5 font-normal">Revisions</td>
                                <td className="border-collapse border border-gray-100 p-5 text-center">
                                  {gig.packages.basic.revisions}
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 text-center">
                                    {gig.packages.standard.revisions}
                                  </td>
                                )}
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 p-5 text-center">
                                    {gig.packages.premium.revisions}
                                  </td>
                                )}
                              </tr>

                              <tr>
                                <td className="p-5 font-normal">Price</td>
                                <td className="border-collapse border border-gray-100 text-center p-5 font-semibold text-base">
                                  $ {gig.packages.basic.price}
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 text-center p-5 font-semibold text-base">
                                    $ {gig.packages.standard.price}
                                  </td>
                                )}
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 text-center p-5 font-semibold text-base">
                                    $ {gig.packages.premium.price}
                                  </td>
                                )}
                              </tr>

                              <tr>
                                <td className="p-5 font-normal border border-gray-100"></td>
                                <td className="border-collapse border border-gray-100 text-center p-5 font-normal text-base">
                                  <button className="bg-nft-primary-light hover:opacity-80 p-3 rounded-xl text-white w-40">
                                    Select
                                  </button>
                                </td>
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 text-center p-5 font-normal text-base">
                                    <button className="bg-nft-primary-light hover:opacity-80 p-3 rounded-xl text-white w-40">
                                      Select
                                    </button>
                                  </td>
                                )}
                                {gig.offer3Packages && (
                                  <td className="border-collapse border border-gray-100 text-center p-5 font-normal text-base">
                                    <button className="bg-nft-primary-light hover:opacity-80 p-3 rounded-xl text-white w-40">
                                      Select
                                    </button>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl my-5 mt-10">FAQs</h3>
                  <div className="flex flex-col my-7 gap-5">
                    <div>
                      {/*  */}
                      <div className="w-full">
                        <div className="flex flex-col">
                          {gig.faqs.map((faq, index) => (
                            <div
                              className="border-b p-5 px-1 hover:bg-gray-50"
                              key={index}
                            >
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex w-full justify-between items-center text-gray-500 text-base font-semibold">
                                      <span>{faq.question}</span>
                                      <ChevronUpIcon
                                        className={`${
                                          open ? "rotate-180 transform" : ""
                                        } h-5 w-5 text-gray-500`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="text-base px-4 pt-4 pb-2">
                                      <p className="text-gray-600">
                                        {faq.answer}
                                      </p>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 text-gray-800 border-b">
                    <h3 className="font-semibold text-xl my-5 mt-10">
                      Reviews
                    </h3>

                    <div>
                      <div className="flex flex-row gap-10 items-center font-bold">
                        <div>{gigReviewsCount} reviews for this Gig</div>
                        <div className="flex gap-1 items-center">
                          <StarIcon className="w-5 h-5 fill-yellow-500" />
                          <span>{gigAverage || 0}</span>
                        </div>
                      </div>

                      <div className="mt-5 border-b pb-9">
                        <div className="md:w-1/2 w-full">
                          <div className="flex flex-col gap-0 w-full">
                            <button className="flex gap-3 items-center w-full hover:opacity-80 justify-between">
                              <div className="whitespace-nowrap bg-nft-primary-light p-2 rounded-lg text-white text-sm font-semibold">
                                5 Stars
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-nft-primary-light h-2.5 rounded-full"
                                  // style={{ width: "45%" }}

                                  style={{
                                    width:
                                      gigReviews.filter(
                                        (review) => review.rating === 5
                                      ).length === 0
                                        ? "0%"
                                        : `${
                                            (gigReviews.filter(
                                              (review) => review.rating === 5
                                            ).length /
                                              gigReviews.length) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="whitespace-nowrap text-gray-800 text-sm font-medium">
                                (
                                {
                                  gigReviews.filter(
                                    (review) => review.rating === 5
                                  ).length
                                }
                                )
                              </div>
                            </button>

                            <button className="flex gap-3 items-center w-full hover:opacity-80 justify-between">
                              <div className="whitespace-nowrap p-2 rounded-lg text-gray-800 text-sm font-semibold">
                                4 Stars
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-nft-primary-light h-2.5 rounded-full"
                                  // style={{ width: "20%" }}

                                  style={{
                                    width:
                                      gigReviews.filter(
                                        (review) =>
                                          review.rating >= 4 &&
                                          review.rating < 5
                                      ).length === 0
                                        ? "0%"
                                        : `${
                                            (gigReviews.filter(
                                              (review) =>
                                                review.rating >= 4 &&
                                                review.rating < 5
                                            ).length /
                                              gigReviews.length) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="whitespace-nowrap text-gray-800 text-sm font-medium">
                                (
                                {
                                  gigReviews.filter(
                                    (review) =>
                                      review.rating >= 4 && review.rating < 5
                                  ).length
                                }
                                )
                              </div>
                            </button>

                            <button className="flex gap-3 items-center w-full hover:opacity-80">
                              <div className="whitespace-nowrap p-2 rounded-lg text-gray-800 text-sm font-semibold">
                                3 Stars
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-nft-primary-light h-2.5 rounded-full"
                                  // style={{ width: "60%" }}
                                  style={{
                                    width:
                                      gigReviews.filter(
                                        (review) =>
                                          review.rating >= 3 &&
                                          review.rating < 4
                                      ).length === 0
                                        ? "0%"
                                        : `${
                                            (gigReviews.filter(
                                              (review) =>
                                                review.rating >= 3 &&
                                                review.rating < 4
                                            ).length /
                                              gigReviews.length) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="whitespace-nowrap text-gray-800 text-sm font-medium">
                                (
                                {
                                  gigReviews.filter(
                                    (review) =>
                                      review.rating >= 3 && review.rating < 4
                                  ).length
                                }
                                )
                              </div>
                            </button>

                            <button className="flex gap-3 items-center w-full hover:opacity-80">
                              <div className="whitespace-nowrap p-2 rounded-lg text-gray-800 text-sm font-semibold">
                                2 Stars
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-nft-primary-light h-2.5 rounded-full"
                                  // style={{ width: "10%" }}
                                  style={{
                                    width:
                                      gigReviews.filter(
                                        (review) =>
                                          review.rating >= 2 &&
                                          review.rating < 3
                                      ).length === 0
                                        ? "0%"
                                        : `${
                                            (gigReviews.filter(
                                              (review) =>
                                                review.rating >= 2 &&
                                                review.rating < 3
                                            ).length /
                                              gigReviews.length) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="whitespace-nowrap text-gray-800 text-sm font-medium">
                                (
                                {
                                  gigReviews.filter(
                                    (review) =>
                                      review.rating >= 2 && review.rating < 3
                                  ).length
                                }
                                )
                              </div>
                            </button>

                            <button className="flex gap-3 items-center w-full hover:opacity-80">
                              <div className="whitespace-nowrap p-2 rounded-lg text-gray-800 text-sm font-semibold">
                                1 Stars
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-nft-primary-light h-2.5 rounded-full"
                                  // style={{ width: "5%" }}
                                  style={{
                                    width:
                                      gigReviews.filter(
                                        (review) => review.rating < 2
                                      ).length === 0
                                        ? "0%"
                                        : `${
                                            (gigReviews.filter(
                                              (review) => review.rating < 2
                                            ).length /
                                              gigReviews.length) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="whitespace-nowrap text-gray-800 text-sm font-medium">
                                (
                                {
                                  gigReviews.filter(
                                    (review) => review.rating < 2
                                  ).length
                                }
                                )
                              </div>
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between mt-10 w-full">
                          <div className="relative max-w-xl">
                            <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
                              <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                              type="text"
                              className="text-sm rounded-lg pl-8 block w-full p-2.5 bg-gray-100 outline-none border ring-purple-700 focus:ring-2 focus:bg-transparent hover:bg-gray-200 hover:bg-opacity-70"
                              placeholder="Search Reviews..."
                              value={reviewInput}
                              onChange={(e) => setReviewInput(e.target.value)}
                            />
                          </div>

                          <div>
                            <Menu as="button" className="relative">
                              <div className="flex gap-3 items-center text-gray-800">
                                <span className="text-sm">Sort By</span>
                                <Menu.Button className="border rounded-xl hover:bg-gray-50 px-3 flex items-center gap-2 text-sm p-2.5 font-semibold">
                                  <span>{selectedSortingOption}</span>
                                </Menu.Button>
                              </div>

                              <Menu.Items className="absolute right-0 z-10 mt-1 w-auto origin-top-right rounded-md bg-white shadow-lg focus:outline-none p-0 overflow-hidden border text-sm">
                                {sortingOptions.map((option, index) => (
                                  <Menu.Item>
                                    <button
                                      className="text-gray-700 p-2.5 hover:bg-gray-100 flex gap-2 items-center w-full"
                                      onClick={() =>
                                        setSelectedSortingOption(option.name)
                                      }
                                    >
                                      <span>{option.name}</span>
                                    </button>
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="container mx-auto py-8">
                      {filteredReviews.map((review, index) => (
                        <div className="grid grid-cols-1 gap-4 mb-3">
                          <div className="bg-white rounded-lg p-4 px-0">
                            <div className="flex items-center mb-4">
                              <img
                                src={review.buyer.avatar}
                                alt="User"
                                className="rounded-full h-12 w-12 mr-4 object-cover"
                              />
                              <div>
                                <h3 className="font-medium text-sm">
                                  {review.buyer.name}
                                </h3>
                                <div className="flex flex-row gap-3 items-center">
                                  <div className="flex flex-row items-center gap-1">
                                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                                    <span>{review.rating}</span>
                                  </div>
                                  <p className="text-gray-500 text-sm">
                                    {formatDate(review.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-800">{review.reviewText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div>
                      <h3 className="font-semibold text-xl my-5 mt-14">
                        Related Keywords
                      </h3>

                      <div className="flex gap-5">
                        {gig.keywords.map((keyword, index) => (
                          <a
                            href="sd"
                            key={index}
                            className="bg-gray-100 p-1 text-sm px-3 rounded-lg border border-gray-300 hover:text-nft-primary-light hover:underline"
                          >
                            {keyword}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 w-full">
                <div className="md:sticky relative top-0">
                  <div className="border shadow-lg rounded-xl shadow-gray-200 border-gray-100">
                    <div className="w-full">
                      <Tabs
                        className="w-full"
                        selectedTabClassName="border-nft-primary-light text-nft-primary-light opacity-100 bg-purple-100"
                      >
                        <TabList className="flex justify-between items-center w-full mb-2">
                          <Tab className="w-full border-b-2 text-base cursor-pointer text-gray-600 text-center p-3 py-4 rounded-tl-xl font-semibold">
                            Basic
                          </Tab>
                          {gig.offer3Packages && (
                            <Tab className="w-full border-b-2 text-base cursor-pointer text-gray-600 text-center p-3 py-4 font-semibold">
                              Standard
                            </Tab>
                          )}

                          {gig.offer3Packages && (
                            <Tab className="w-full border-b-2 text-base cursor-pointer text-gray-600 text-center p-3 py-4 rounded-tr-xl font-semibold">
                              Premium
                            </Tab>
                          )}
                        </TabList>

                        <TabPanel>
                          <div className="p-5">
                            <div className="flex text-base text-gray-600 justify-between items-center">
                              <div className="uppercase font-bold">
                                {gig.packages.basic.name}
                              </div>
                              <div className="uppercase font-medium text-2xl">
                                $ {gig.packages.basic.price}
                              </div>
                            </div>

                            <p className="my-7">
                              {gig.packages.basic.description}
                            </p>

                            <div className="flex justify-between items-center text-gray-800">
                              <div className="flex gap-1 items-center text-sm font-semibold">
                                <ClockIcon className="w-5 h-5" />
                                <span>
                                  {gig.packages.basic.deliveryTime} days
                                  Delivery
                                </span>
                              </div>
                              <div className="flex gap-1 items-center text-sm font-semibold">
                                <ArrowPathIcon className="w-5 h-5" />
                                <span>
                                  {gig.packages.basic.revisions} Revisions
                                </span>
                              </div>
                            </div>

                            {gig.offerReward && gig.offerReward === true && (
                              <div className="flex items-center gap-2 p-2 w-fit mt-2 px-0">
                                <div>
                                  <CubeIcon className="w-6 h-6 text-nft-primary-light" />
                                </div>
                                <div className="font-semibold text-sm text-gray-800">
                                  NFT Reward
                                </div>
                              </div>
                            )}

                            {user && user._id !== gig.user._id && (
                              <Link
                                to={`/gig/order/checkout/${gigId}/${gig.packages.basic._id}`}
                                className="bg-nft-primary-light h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full mt-10 block text-center"
                              >
                                <span>Buy This Package</span>
                              </Link>
                            )}
                          </div>
                        </TabPanel>

                        {gig.offer3Packages && (
                          <TabPanel>
                            <div className="p-5">
                              <div className="flex text-base text-gray-600 justify-between items-center">
                                <div className="uppercase font-bold">
                                  {gig.packages.standard.name}
                                </div>
                                <div className="uppercase font-medium text-2xl">
                                  $ {gig.packages.standard.price}
                                </div>
                              </div>

                              <p className="my-7">
                                {gig.packages.standard.description}
                              </p>

                              <div className="flex justify-between items-center text-gray-800">
                                <div className="flex gap-1 items-center text-sm font-semibold">
                                  <ClockIcon className="w-5 h-5" />
                                  <span>
                                    {gig.packages.standard.deliveryTime} days
                                    Delivery
                                  </span>
                                </div>
                                <div className="flex gap-1 items-center text-sm font-semibold">
                                  <ArrowPathIcon className="w-5 h-5" />
                                  <span>
                                    {gig.packages.standard.revisions} Revisions
                                  </span>
                                </div>
                              </div>

                              {user && user._id !== gig.user._id && (
                                <Link
                                  to={`/gig/order/checkout/${gigId}/${gig.packages.standard._id}`}
                                  className="bg-nft-primary-light h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full mt-10 block text-center"
                                >
                                  <span>Buy This Package</span>
                                </Link>
                              )}
                            </div>
                          </TabPanel>
                        )}

                        {gig.offer3Packages && (
                          <TabPanel>
                            <div className="p-5">
                              <div className="flex text-base text-gray-600 justify-between items-center">
                                <div className="uppercase font-bold">
                                  {gig.packages.premium.name}
                                </div>
                                <div className="uppercase font-medium text-2xl">
                                  $ {gig.packages.premium.price}
                                </div>
                              </div>

                              <p className="my-7">
                                {gig.packages.premium.description}
                              </p>

                              <div className="flex justify-between items-center text-gray-800">
                                <div className="flex gap-1 items-center text-sm font-semibold">
                                  <ClockIcon className="w-5 h-5" />
                                  <span>
                                    {gig.packages.premium.deliveryTime} days
                                    Delivery
                                  </span>
                                </div>
                                <div className="flex gap-1 items-center text-sm font-semibold">
                                  <ArrowPathIcon className="w-5 h-5" />
                                  <span>
                                    {gig.packages.premium.revisions} Revisions
                                  </span>
                                </div>
                              </div>

                              {user && user._id !== gig.user._id && (
                                <Link
                                  to={`/gig/order/checkout/${gigId}/${gig.packages.premium._id}`}
                                  className="bg-nft-primary-light h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full mt-10 block text-center"
                                >
                                  <span>Buy This Package</span>
                                </Link>
                              )}
                            </div>
                          </TabPanel>
                        )}
                      </Tabs>
                    </div>
                  </div>

                  <div className="border shadow-lg rounded-xl shadow-gray-200 border-gray-100 p-5 mt-12">
                    <div className="font-semibold text-xl mb-6">
                      About The Seller
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-3">
                      <div className="bg-white rounded-lg">
                        <div className="flex items-center mb-6 border-b border-gray-100 pb-7">
                          <img
                            src={gig.user.avatar}
                            alt="User"
                            className="rounded-full h-24 w-24 mr-4 object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-lg">
                              {gig.user.name}
                            </h3>
                            <div className="flex flex-row gap-3 items-center text-sm text-gray-500">
                              @{gig.user.username}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 border-b border-gray-100 pb-7 mb-7">
                          <div className="flex justify-between gap-5">
                            <div className="flex flex-col w-full text-start">
                              <span>From</span>
                              <span className="font-bold">
                                {gig.user.location}
                              </span>
                            </div>
                            <div className="flex flex-col w-full text-start">
                              <span>Joined on</span>
                              <span className="font-bold">
                                {formatDate(gig.user.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between gap-5">
                            <div className="flex flex-col w-full text-start">
                              <span>Avg. response time</span>
                              <span className="font-bold">3 hours</span>
                            </div>
                            <div className="flex flex-col w-full text-start">
                              <span>Last delivery</span>
                              <span className="font-bold">
                                about 2 days ago
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between gap-5">
                            <div className="flex flex-col w-full text-start">
                              <span>Languages</span>
                              <span className="font-bold">
                                {gig.user.languages}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p>{gig.user.bio}</p>
                      </div>
                    </div>

                    <button className="bg-nft-primary-light h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full mt-10">
                      <span>Contact Me</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10">
            <div className="container mx-auto mb-28">
              <h1 className="text-2xl py-4 pb-6 font-bold">Related Services</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                {/* cards */}

                <div className="decoration-transparent shadow-sm shadow-gray-50 rounded-xl transition-all duration-300 p-0 m-2 block hover:scale-105 transform bg-white">
                  <div className="relative shadow-lg rounded-md shadow-gray-200">
                    <div className="max-w-sm rounded-md overflow-hidden pb-2">
                      <div className="absolute top-2 right-2">
                        <button className="p-2 bg-white hover:bg-nft-primary-light text-gray-500 rounded-full group">
                          <HeartIcon className="w-5 h-5 group-hover:stroke-white group-hover:fill-white" />
                        </button>
                      </div>

                      <img
                        src={require("../assets/trend1.jpg")}
                        alt="Card Imagea"
                        className="h-60 w-full object-cover rounded-t-xl"
                      />

                      <div className="p-3 py-2 mt-2 rounded-b-xl">
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                          <div className="flex gap-2 items-center">
                            <img
                              src={require("../assets/slider8.png")}
                              alt="s"
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-semibold text-gray-800">
                              Agent Pakulla
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-800 font-semibold">
                              Level 2
                            </span>
                          </div>
                        </div>

                        <Link
                          to="/gigdetails"
                          className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
                        >
                          Development & IT
                        </Link>
                        <Link
                          to="/gigdetails"
                          className="mb-4 font-semibold text-lg text-gray-800 block hover:text-nft-primary-light hover:underline"
                        >
                          Management software to help you manage your mobile
                          workers
                        </Link>

                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                            </div>
                            <div className="text-md font-semibold text-sm">
                              4.7
                            </div>
                            <div className="text-gray-500 text-sm">
                              (3 Reviews)
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div>
                              <CubeIcon className="w-4 h-4 text-nft-primary-dark" />
                            </div>
                            <div className="text-md font-semibold text-sm text-gray-700">
                              NFT
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 items-center text-sm text-gray-500">
                            Starting at:
                            <span className="text-lg text-gray-800 font-bold">
                              $29
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
}
export default GigDetails;
