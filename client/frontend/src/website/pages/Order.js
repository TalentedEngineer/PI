import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../../utils/Loader";
import OrderChatWindow from "../components/OrderChatWindow";
import {
  InformationCircleIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  DocumentCheckIcon,
  CheckIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  NFTMarketplaceContractABI,
  NFTMarketplaceContractAddress,
} from "../../constants/ContractDetails";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { io } from "socket.io-client";

const Order = () => {
  const { orderId } = useParams();
  const [isRequirementSent, setIsRequirementSent] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderActivity, setOrderActivity] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [deliveryModalOpen, setdeliveryModalOpen] = useState(false);
  const [cancellationModalOpen, setcancellationModalOpen] = useState(false);

  const [disputeModalOpen, setdisputeModalOpen] = useState(false);
  const [disputeSubject, setdisputeSubject] = useState("");
  const [disputeDescription, setdisputeDescription] = useState("");

  const [deliveryDescription, setDeliveryDescription] = useState("");
  const [deliveryFile, setDeliveryFile] = useState("");
  const [cancelReason, setcancelReason] = useState("");

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);
  const [isFormSUbmitting, setIsFormSubmitting] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [deliveryReview, setDeliveryReview] = useState({});
  const [orderCancellationRequests, setOrderCancellationRequests] = useState(
    []
  );
  const [dispute, setDispute] = useState({});

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    const req = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/orderdetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      }
    );
    const res = await req.json();

    console.log(res);
    if (res.error) {
      return;
    }

    if (
      user._id !== res.order[0].buyer._id &&
      user._id !== res.order[0].seller._id
    ) {
      window.location.href = "/";
      return;
    }

    setOrderDetails(res.order[0]);
    setIsLoading(false);
    setOrderActivity(res.orderActivity);
    setSubmittedRequirements({ ...res.order[0].requirements });
    setRequirements(res.requirements[0].requirements);
    setDeliveryDetails(res.delivery[0]);
    setDeliveryReview(res.review[0]);
    setOrderCancellationRequests(res.cancelRequests);
    setDispute(res.dispute[0]);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId, user]);

  useEffect(() => {
    if (orderDetails.isRequirementSent) {
      setIsRequirementSent(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
    if (orderDetails.buyer && orderDetails.seller) {
      if (
        user._id !== orderDetails.buyer._id &&
        user._id !== orderDetails.seller._id
      ) {
        window.location.href = "/";
      }
    }
  }, [user, orderDetails]);

  const formatDate = (date) => {
    const originalDate = new Date(date);

    const options = {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    const formattedDate = originalDate.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const [submittedRequirements, setSubmittedRequirements] = useState({});

  const handleChange = (requirement, value) => {
    setSubmittedRequirements((prevRequirements) => ({
      ...prevRequirements,
      [requirement]: value,
    }));
  };

  const handleRequirementsSubmit = async () => {
    const areAllRequirementsFilled = orderDetails.gig.requirements.every(
      (requirement) => submittedRequirements[requirement]
    );

    if (areAllRequirementsFilled) {
      console.log("Submitted Requirements:", submittedRequirements);

      const req = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/submitRequirements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({
            orderId: orderId,
            buyerId: orderDetails.buyer._id,
            sellerId: orderDetails.seller._id,
            requirements: submittedRequirements,
            gigId: orderDetails.gig._id,
          }),
        }
      );

      const res = await req.json();
      if (res.error) {
        alert(res.error);
        return;
      }

      const socket = io(process.env.REACT_APP_API_URL);
      setSocket(socket);

      socket.emit("notification", {
        sender: user._id,
        receiver:
          user._id === orderDetails.buyer._id
            ? orderDetails.seller._id
            : orderDetails.buyer._id,
        type: `requirements-submit`,
        content: `has submitted the requirements for your order`,
        orderId,
      });

      window.location.reload();
    } else {
      alert("Please fill in all requirements before submitting.");
    }
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(orderDetails.orderEndDate)
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(orderDetails.orderEndDate));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [orderDetails]);

  function calculateTimeLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) {
      // If the order end date has passed, return 0 for all fields
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
    };
  }

  const uploadFiletoCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/uploadDeliveryZiptoCloudinary`,
      {
        method: "POST",
        headers: {
          "x-auth-token": user.jwtToken,
        },
        body: fd,
      }
    );

    const response = await request.json();
    console.log(response);
    return response.url;
  };

  const handleDeliveryFileUpload = async (e) => {
    setIsFormSubmitting(true);
    const file = e.target.files[0];
    console.log(e.target.files);
    console.log(file);
    if (file) {
      const fileUrl = await uploadFiletoCloudinary(file);
      setDeliveryFile(fileUrl);
      setIsFormSubmitting(false);
      return;
    }
    setIsFormSubmitting(false);
    setDeliveryFile("");
  };

  const handleSubmit = async () => {
    setIsFormSubmitting(true);
    if (deliveryDescription) {
      const req = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/submitDelivery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({
            orderId: orderId,
            buyerId: orderDetails.buyer._id,
            sellerId: orderDetails.seller._id,
            deliveryDescription,
            deliveryFile: deliveryFile,
            gigId: orderDetails.gig._id,
          }),
        }
      );

      const res = await req.json();

      if (res.error) {
        alert(res.error);
        return;
      }

      setdeliveryModalOpen(false);

      const socket = io(process.env.REACT_APP_API_URL);
      setSocket(socket);

      socket.emit("notification", {
        sender: user._id,
        receiver:
          user._id === orderDetails.buyer._id
            ? orderDetails.seller._id
            : orderDetails.buyer._id,
        type: `delivery-submit`,
        content: `has submitted the delivery for your order`,
        orderId,
      });

      window.location.reload();
    }
    setIsFormSubmitting(false);
  };

  // NFT
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

  const fetchContract = (signerOrProvider) => {
    const marketplaceContract = new ethers.Contract(
      NFTMarketplaceContractAddress,
      NFTMarketplaceContractABI,
      signerOrProvider
    );

    return { marketplaceContract };
  };
  const updateTokenURI = async (marketplaceContract, nft) => {
    const data = JSON.stringify({
      name: nft.name,
      description: nft.description,
      creator: nft.creator,
      currentOwner: orderDetails.buyer,
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
    console.log(newUrl, nft);
    await marketplaceContract.updateTokenURI(nft.itemId, newUrl);
  };

  const updateNFTDetails = async (itemId) => {
    const w3modal = new Web3Modal();
    const connection = await w3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const { marketplaceContract } = fetchContract(signer);

    const fetchedNFT = await marketplaceContract.getNFTDetails(itemId);
    const tokenUri = await marketplaceContract.tokenURI(fetchedNFT.itemId);
    const meta = await axios.get(tokenUri);
    await updateTokenURI(marketplaceContract, {
      ...meta.data,
      itemId: fetchedNFT.itemId,
    });
  };

  // NFT
  const handleReviewSubmit = async () => {
    // Assuming you have an API endpoint to handle review submission
    try {
      if (!reviewText) {
        alert("Please enter a review");
        return;
      }
      if (!rating) {
        alert("Please enter a rating");
        return;
      }
      if (rating < 1 || rating > 5) {
        alert("Please enter a rating between 1 and 5");
        return;
      }

      const hasNFTReward = orderDetails.gig.offerReward;

      if (hasNFTReward === true) {
        const itemId = orderDetails.gig.rewardNFT;
        await updateNFTDetails(itemId);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/submitReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({
            orderId: orderDetails._id,
            gigId: orderDetails.gig._id,
            sellerId: orderDetails.seller._id,
            buyerId: orderDetails.buyer._id,
            reviewText,
            rating,
          }),
        }
      );

      const socket = io(process.env.REACT_APP_API_URL);
      setSocket(socket);

      socket.emit("notification", {
        sender: user._id,
        receiver:
          user._id === orderDetails.buyer._id
            ? orderDetails.seller._id
            : orderDetails.buyer._id,
        type: `review-order`,
        content: `has left a ${rating} review on your order`,
        orderId,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const [socket, setSocket] = useState(null);
  const handleCancellationSubmit = async () => {
    if (!cancelReason || cancelReason.trim() === "") {
      alert("Please enter a reason for cancellation");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/cancelOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          order: orderDetails._id,
          gig: orderDetails.gig._id,
          seller: orderDetails.seller._id,
          buyer: orderDetails.buyer._id,
          package: orderDetails.package._id,
          requestInitiator: user._id,
          cancelReason,
        }),
      }
    );

    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);

    socket.emit("notification", {
      sender: user._id,
      receiver:
        user._id === orderDetails.buyer._id
          ? orderDetails.seller._id
          : orderDetails.buyer._id,
      type: "cancel-request",
      content: cancelReason,
      orderId,
    });

    window.location.reload();
  };

  const [nftMetaData, setNftMetaData] = useState(null);
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
    if (orderDetails.gig && orderDetails.gig.offerReward) {
      fetchNFTDetails(orderDetails.gig.rewardNFT);
    }
  }, [orderDetails]);

  const RejectAcceptCancelRequest = async (type, requestId) => {
    if (
      window.confirm(
        "Are you sure you want this request to be " + type + "?"
      ) === false
    ) {
      return;
    }

    if (!type) {
      alert("Please enter a type");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/updateCancelRequestStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          requestId,
          type,
        }),
      }
    );

    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);

    socket.emit("notification", {
      sender: user._id,
      receiver:
        user._id === orderDetails.buyer._id
          ? orderDetails.seller._id
          : orderDetails.buyer._id,
      type: `${type}-request`,
      content: `has ${type} the request`,
      orderId,
    });

    // if (response.error === false) {
    window.location.reload();
    // }
  };

  const handleDisputeSubmit = async () => {
    if (!disputeSubject || disputeSubject.trim() === "") {
      alert("Please enter a subject");
      return;
    }

    if (!disputeDescription || disputeDescription.trim() === "") {
      alert("Please enter a description");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/submitDispute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          orderId: orderDetails._id,
          gigId: orderDetails.gig._id,
          sellerId: orderDetails.seller._id,
          buyerId: orderDetails.buyer._id,
          disputeInitiator: user._id,
          packageId: orderDetails.package._id,
          disputeSubject,
          disputeDescription,
        }),
      }
    );

    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);

    socket.emit("notification", {
      sender: user._id,
      receiver:
        user._id === orderDetails.buyer._id
          ? orderDetails.seller._id
          : orderDetails.buyer._id,
      type: `dispute-raised`,
      content: `${user.name} has raised a dispute on this order.`,
      orderId,
    });

    window.location.reload();
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} showCategoriesBar={false} />
      </div>

      <div className="flex justify-between p-5 bg-gray-100 shadow-lg shadow-gray-300">
        <div className="w-2/3 p-5">
          <h1 className="text-xl border-b font-semibold pb-3 text-nft-primary-light">
            Activity
          </h1>

          {orderDetails.isDisputeOpened && (
            <div className="mt-5 w-full">
              <div className="p-5 bg-red-500 rounded-xl text-white">
                <>
                  <h2 className="text-lg mb-3">
                    Dispute has been opened by {dispute.disputeInitiator.name}
                    <span className="block text-sm font-normal">
                      Dispute Opened at {formatDate(dispute.createdAt)}
                    </span>
                  </h2>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-2 flex-1 break-all">
                      <Link
                        to={`/order/${dispute._id}/dispute`}
                        className="bg-white text-red-500 p-3 rounded-xl mt-3 hover:opacity-80 w-fit"
                        target="_blank"
                      >
                        View Dispute
                      </Link>
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}

          {orderCancellationRequests.length > 0 && (
            <div className="mt-5">
              {orderCancellationRequests.map((request, index) => (
                <div
                  className="bg-white rounded-xl shadow-lg shadow-gray-300 p-5 mb-4"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    {request.cancelStatus === "pending" && (
                      <DocumentCheckIcon className="w-12 h-12 bg-gray-200 text-gray-500 p-2 rounded-full" />
                    )}

                    {request.cancelStatus === "approved" && (
                      <CheckCircleIcon className="w-12 h-12 bg-green-200 text-green-500 p-2 rounded-full" />
                    )}

                    {request.cancelStatus === "rejected" && (
                      <XCircleIcon className="w-12 h-12 bg-red-200 text-red-500 p-2 rounded-full" />
                    )}

                    <h2>
                      <span className="font-semibold text-gray-800">
                        {request.requestInitiator.name}
                      </span>{" "}
                      has requested to cancel the order.
                    </h2>
                    <span className="text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mt-3 flex-col">
                    <span className="text-gray-800 text-base font-semibold">
                      Reason
                    </span>
                    <span className="text-sm text-gray-500">
                      {request.cancelReason}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mt-3 flex-col">
                    <span className="text-gray-800 text-base font-semibold">
                      Status
                    </span>

                    {request.cancelStatus === "pending" && (
                      <span className="text-sm font-medium text-gray-700 bg-gray-300 p-2 rounded-md">
                        Pending Approval
                      </span>
                    )}
                    {request.cancelStatus === "approved" && (
                      <span className="text-sm font-medium text-green-700 bg-green-300 p-2 rounded-md">
                        Approved
                      </span>
                    )}
                    {request.cancelStatus === "rejected" && (
                      <span className="text-sm font-medium text-red-700 bg-red-300 p-2 rounded-md">
                        Rejected
                      </span>
                    )}
                  </div>

                  {request.cancelStatus === "pending" &&
                    request.requestInitiator._id !== user._id && (
                      <div className="flex items-center justify-start gap-2 mt-4">
                        <button
                          className="bg-red-500 text-white p-3 py-2 text-sm rounded-lg hover:opacity-80 flex gap-1 items-center"
                          onClick={() =>
                            RejectAcceptCancelRequest("rejected", request._id)
                          }
                        >
                          <XMarkIcon className="w-5 h-5" />
                          <span>Reject</span>
                        </button>
                        <button
                          className="bg-green-500 text-white p-3 py-2 text-sm rounded-lg hover:opacity-80 flex gap-1 items-center"
                          onClick={() =>
                            RejectAcceptCancelRequest("approved", request._id)
                          }
                        >
                          <CheckIcon className="w-5 h-5" />
                          <span>Accept</span>
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          {orderDetails.isDeliveryAccepted && (
            <div className="mt-5 w-full">
              <div className="p-5 bg-nft-primary-light rounded-xl text-white">
                <>
                  <h2 className="text-lg mb-3">Buyer left a review.</h2>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-2 flex-1 break-all">
                      <div>
                        <span className="font-semibold">Review</span>
                        <p className="text-sm text-white">
                          {deliveryReview.reviewText}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold ">Rating</span>
                        <p className="text-sm text-white flex items-center gap-2">
                          <StarIcon className="w-4 h-4 fill-yellow-400 inline-block text-yellow-400" />
                          <span>{deliveryReview.rating}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}

          {orderDetails.isDeliverySubmitted && (
            <div className="mt-5">
              <div className="p-5 bg-white rounded-xl">
                {orderDetails.seller._id !== user._id &&
                isRequirementSent &&
                orderDetails.isDeliverySubmitted &&
                !orderDetails.isDeliveryAccepted ? (
                  <h2 className="text-lg mb-3">
                    Seller has submitted the delivery. Please review and accept
                  </h2>
                ) : (
                  <h2 className="text-lg mb-3">Submitted delivery.</h2>
                )}

                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col gap-2 flex-1 break-all">
                    <div>
                      <span className="font-semibold">
                        Delivery description
                      </span>
                      <p className="text-sm text-gray-500">
                        {deliveryDetails.deliveryDescription}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold ">File</span>
                      <Link to={deliveryDetails.deliveryFile} target="_blank">
                        <p className="text-sm text-nft-primary-light">
                          {deliveryDetails.deliveryFile}
                        </p>
                      </Link>
                    </div>

                    {orderDetails.seller._id !== user._id &&
                      isRequirementSent &&
                      orderDetails.isDeliverySubmitted &&
                      !orderDetails.isDeliveryAccepted &&
                      orderDetails.gig.offerReward &&
                      nftMetaData && (
                        <>
                          <span className="font-semibold">Reward NFT</span>
                          <div className="my-5 mt-0">
                            <div className="flex items-center shadow-md shadow-gray-200 border border-gray-100 rounded-xl gap-4 w-full pr-2">
                              <div className="flex h-full relative">
                                <img
                                  src={nftMetaData.fileUrl}
                                  alt=""
                                  className="w-24 h-32 rounded-l-xl object-cover"
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
                                  className="text-sm text-gray-800 font-bold flex items-center gap-1"
                                  to={`/marketplace/nft/${nftMetaData.itemId}`}
                                  target="_blank"
                                >
                                  <span>{nftMetaData.name}</span>
                                  <ArrowUpRightIcon className="w-3 h-3 text-gray-500" />
                                </Link>

                                <div className="flex gap-1 items-baseline text-gray-800 mb-2">
                                  <span className="font-semibold text-sm">
                                    {nftMetaData.price}
                                  </span>
                                  <span className="font-normal text-gray-500 text-xs">
                                    ETH
                                  </span>
                                </div>

                                <div class="flex items-center justify-evenly w-full gap-1">
                                  <div class="flex flex-col gap-0 w-full">
                                    <div class="flex items-center gap-2">
                                      <img
                                        src="http://res.cloudinary.com/ds2ss4xmg/image/upload/v1697793424/izwfsygozecbxln3pim9.png"
                                        alt="User Imasge"
                                        class="rounded-full h-7 w-7 object-cover"
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

                                  <div class="flex flex-col gap-0 w-full">
                                    <div class="flex items-center gap-2">
                                      <img
                                        src={nftMetaData.collection.image}
                                        alt="User Imasge"
                                        class="rounded-full h-7 w-7 object-cover"
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
                        </>
                      )}
                  </div>

                  {orderDetails.seller._id !== user._id &&
                    isRequirementSent &&
                    orderDetails.isDeliverySubmitted &&
                    !orderDetails.isDeliveryAccepted && (
                      <div className="flex flex-col gap-2 flex-1">
                        <div>
                          <textarea
                            placeholder="Write your review..."
                            value={reviewText}
                            className=" border-2 p-3 h-40 rounded-xl w-full"
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                          <div className="flex flex-row justify-between gap-4">
                            <div className="w-full">
                              <input
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Rating (1-5)"
                                className="border-2 rounded-xl p-3 w-full"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              />
                              <button
                                onClick={handleReviewSubmit}
                                className="bg-nft-primary-light p-3 text-center text-white rounded-xl mt-3 hover:opacity-80"
                              >
                                Submit Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {orderDetails.seller._id !== user._id && !isRequirementSent && (
            <div className="my-10 py-5 border-b p-5 bg-white text-gray-800 rounded-lg">
              <h3 className="text-gray-800 text-lg font-semibold">
                Please submit your requirements to the seller to start the order
              </h3>
              <div>
                {orderDetails.gig.requirements.map((requirement, index) => (
                  <div className="flex flex-col gap-2 mt-5" key={index}>
                    <label className="text-sm ">
                      <span className="pr-1">&gt;</span>
                      {requirement} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      rows="4"
                      value={submittedRequirements[requirement] || ""}
                      onChange={(e) =>
                        handleChange(requirement, e.target.value)
                      }
                      placeholder={`Enter your ${requirement.toLowerCase()} here...`}
                      className="outline-none border border-gray-300 rounded-xl p-3 resize-none"
                    />
                  </div>
                ))}
                <button
                  className="bg-nft-primary-light text-white p-3 rounded-xl mt-3 hover:opacity-80"
                  onClick={handleRequirementsSubmit}
                  disabled={isRequirementSent}
                >
                  {isRequirementSent
                    ? "Requirements Submitted"
                    : "Submit Requirements"}
                </button>
              </div>
            </div>
          )}

          <div className="mt-5">
            {orderActivity.map((activity, index) => (
              <div className="bg-white rounded-xl shadow-lg shadow-gray-300 p-5 mb-4">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-12 h-12 bg-nft-primary-transparent text-nft-primary-light p-2 rounded-full" />
                  <span className="text-gray-800 text-base font-semibold">
                    {activity.activity[0].text}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(activity.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-white rounded-xl shadow-lg shadow-gray-300">
            <h1 className="text-base font-semibold border-b pb-3 text-nft-primary-light p-5">
              Requirements
            </h1>
            {requirements &&
              Object.keys(requirements).map(function (key) {
                return (
                  <div className="p-5 pb-2">
                    <div className="flex items-center gap-2">
                      <ClipboardDocumentListIcon className="w-12 h-12 bg-nft-primary-transparent text-nft-primary-light p-2 rounded-full" />
                      <span className="text-gray-800 text-base font-semibold">
                        {key}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 ">
                      {requirements[key]}
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="my-5 bg-white p-3 py-4 shadow-lg relative rounded-xl">
            {(orderDetails.isDeliveryAccepted ||
              orderDetails.isOrderCancelled ||
              orderDetails.isDisputeOpened) && (
              <div className="absolute w-full h-full bg-white bg-opacity-70 z-50"></div>
            )}
            <h3 className="text-base font-semibold border-b pb-3 text-nft-primary-light p-3">
              Chat with{" "}
              {orderDetails.buyer._id !== user._id ? (
                <span>{orderDetails.buyer.name}</span>
              ) : (
                <span>{orderDetails.seller.name}</span>
              )}{" "}
            </h3>
            {orderDetails.buyer._id !== user._id ? (
              <OrderChatWindow
                orderChatUser={orderDetails.buyer}
                orderId={orderDetails._id}
              />
            ) : (
              <OrderChatWindow
                orderChatUser={orderDetails.seller}
                orderId={orderDetails._id}
              />
            )}
          </div>
        </div>

        <div className="w-1/3">
          <div className="md:sticky relative top-0">
            <div className="w-full pt-3">
              <div className="bg-white shadow-lg rounded-xl p-3">
                <h1 className="text-xl font-medium border-b pb-3 text-gray-800">
                  Order Details
                </h1>

                <div className="flex items-center gap-3 mt-3 border-b pb-3">
                  {orderDetails.gig.images && (
                    <img
                      src={orderDetails.gig.images[0]}
                      alt=""
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  )}
                  <h3 className="text-sm font-medium text-gray-800 flex flex-col items-start">
                    <span>{orderDetails.gig.title}</span>
                    <span className="text-xs font-normal text-gray-500">
                      {orderDetails.package.name}
                    </span>

                    {orderDetails.isDeliveryAccepted && (
                      <span className="text-xs bg-green-200 text-green-600 p-1 font-medium rounded-md mt-2">
                        Completed
                      </span>
                    )}

                    {orderDetails.isOrderCancelled && (
                      <span className="text-xs bg-gray-300 p-1 font-medium rounded-md mt-2">
                        Cancelled
                      </span>
                    )}
                  </h3>
                </div>

                <div className="mt-3 p-3 flex flex-col gap-2">
                  <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                    {orderDetails.buyer._id !== user._id ? (
                      <>
                        <span>Ordered By</span>
                        <span className="font-semibold text-gray-800">
                          {orderDetails.buyer.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Seller</span>
                        <span className="font-semibold text-gray-800">
                          {orderDetails.seller.name}
                        </span>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-gray-500 font-medium text-sm">
                      <p>Total Price</p>
                      <p className="font-semibold text-gray-800">
                        ${orderDetails.package.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                    <span>Revisions</span>
                    <span className="font-semibold text-gray-800">
                      {orderDetails.package.revisions}
                    </span>
                  </div>

                  <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                    <span>Delivery Date</span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(orderDetails.orderEndDate)}
                    </span>
                  </div>

                  {!orderDetails.isOrderCancelled && (
                    <>
                      {!orderDetails.isDeliveryAccepted && (
                        <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                          <span>Time Left</span>
                          <span className="font-semibold text-gray-800">
                            {timeLeft.isExpired ? (
                              <span className="text-red-500">
                                {timeLeft.days}d {timeLeft.hours}h{" "}
                                {timeLeft.minutes}m {timeLeft.seconds}s
                              </span>
                            ) : (
                              <span className="text-nft-primary-light">
                                {timeLeft.days}d {timeLeft.hours}h{" "}
                                {timeLeft.minutes}m {timeLeft.seconds}s
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 my-5">
                      Track Order
                    </h4>

                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <span className="h-4 w-4 rounded-full bg-green-500"></span>
                        <span className="text-sm">Order Placed</span>
                      </div>

                      <span className="h-4 border-l-2 border-green-500 ml-2 -my-1"></span>
                      <div className="flex gap-2 items-center">
                        {isRequirementSent ? (
                          <span className="h-4 w-4 ml-[1px] rounded-full bg-green-500"></span>
                        ) : (
                          <span className="h-4 w-4 ml-[1px] rounded-full border-green-500 border-2"></span>
                        )}

                        <span className="text-sm">
                          {orderDetails.isRequirementSent
                            ? "Requirement Sent"
                            : "Submit Requirements"}
                        </span>
                      </div>

                      <span className="h-4 border-l-2 border-green-500 ml-2 -my-1"></span>
                      <div className="flex gap-2 items-center">
                        {orderDetails.isDeliverySubmitted ? (
                          <span className="h-4 w-4 ml-[1px] rounded-full bg-green-500"></span>
                        ) : (
                          <span className="h-4 w-4 ml-[1px] rounded-full border-green-500 border-2"></span>
                        )}

                        <span className="text-sm">Delivery Submitted</span>
                      </div>

                      <span className="h-4 border-l-2 border-green-500 ml-2 -my-1"></span>
                      <div className="flex gap-2 items-center">
                        {orderDetails.isDeliveryAccepted ? (
                          <span className="h-4 w-4 ml-[1px] rounded-full bg-green-500"></span>
                        ) : (
                          <span className="h-4 w-4 ml-[1px] rounded-full border-green-500 border-2"></span>
                        )}

                        <span className="text-sm">Delivery Accepted</span>
                      </div>

                      {orderDetails.isOrderCancelled && (
                        <>
                          <span className="h-4 border-l-2 border-gray-400 ml-2 -my-1"></span>
                          <div className="flex gap-2 items-center">
                            <span className="h-4 w-4 ml-[1px] rounded-full bg-gray-400"></span>

                            <span className="text-sm">Order Cancelled</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {isRequirementSent &&
                  orderDetails.seller._id === user._id &&
                  !orderDetails.isDeliveryAccepted &&
                  !orderDetails.isOrderCancelled &&
                  !orderDetails.isDisputeOpened && (
                    <button
                      className="bg-nft-primary-light h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full mt-4"
                      onClick={() => setdeliveryModalOpen(true)}
                    >
                      <span>Deliver Now</span>
                    </button>
                  )}

                {orderDetails.gig.offerReward && nftMetaData && (
                  <div className="my-5 mt-0">
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

              {!orderDetails.isOrderCancelled && (
                <div className="bg-white shadow-lg rounded-xl p-3 mt-3 relative">
                  {orderDetails.isDisputeOpened && (
                    <div className="absolute w-full h-full bg-white bg-opacity-70 z-50"></div>
                  )}

                  <h1 className="text-xl font-medium border-b pb-3 text-gray-800">
                    Resolution center
                  </h1>
                  <div className="mt-3">
                    <button
                      className="bg-gray-900 h-full py-4 rounded-xl font-semibold text-white hover:opacity-80 transition-colors text-sm w-full"
                      onClick={() => setcancellationModalOpen(true)}
                    >
                      Cancel This Order
                    </button>
                    <button
                      className="bg-gray-300 h-full py-4 rounded-xl font-semibold text-gray-700 hover:opacity-80 transition-colors text-sm w-full mt-2"
                      onClick={() => setdisputeModalOpen(true)}
                    >
                      Raise a Dispute
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
          disputeModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/3 bg-white p-7 rounded-xl shadow-xl h-fit mt-16 relative">
          <h2 className="block font-bold text-xl text-gray-800 mb-3">
            Raise a Dispute
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
            onClick={() => setdisputeModalOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="relative">
            <input
              type="text"
              className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl mb-3"
              placeholder="Enter your dispute subject"
              value={disputeSubject}
              onChange={(e) => setdisputeSubject(e.target.value)}
            />

            <textarea
              type="number"
              className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl h-52"
              placeholder="Enter your dispute description here..."
              value={disputeDescription}
              min={0}
              onChange={(e) => setdisputeDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            className="w-fit px-7 font-semibold bg-nft-primary-light text-white p-3 mt-5 rounded-xl hover:opacity-80"
            onClick={() => handleDisputeSubmit()}
          >
            Submit Request
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
          cancellationModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/3 bg-white p-7 rounded-xl shadow-xl h-fit mt-16 relative">
          <h2 className="block font-bold text-xl text-gray-800 mb-3">
            Cancel Order
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
            onClick={() => setcancellationModalOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="relative">
            <textarea
              type="number"
              className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl h-52"
              placeholder="Enter your cancellation reason here..."
              value={cancelReason}
              min={0}
              onChange={(e) => setcancelReason(e.target.value)}
            ></textarea>
          </div>

          <button
            className="w-fit px-7 font-semibold bg-nft-primary-light text-white p-3 mt-5 rounded-xl hover:opacity-80"
            onClick={() => handleCancellationSubmit()}
          >
            Submit Request
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 justify-center z-50 w-full h-full bg-black bg-opacity-70 ${
          deliveryModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="w-2/3 bg-white p-7 rounded-xl shadow-xl h-fit mt-16 relative">
          <h2 className="block font-bold text-xl text-gray-800 mb-3">
            Deliver Order
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
            onClick={() => setdeliveryModalOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="relative">
            <textarea
              type="number"
              className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl h-52"
              placeholder="Enter your delivery description here..."
              value={deliveryDescription}
              // value={newPrice}
              min={0}
              onChange={(e) => setDeliveryDescription(e.target.value)}
              // onChange={(e) => setNewPrice(e.target.value)}
            ></textarea>

            <div className="flex flex-col gap-3 p-3 my-3">
              <label className="font-semibold">Attach file</label>
              <input
                type="file"
                className="cursor-pointer"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*, video/*"
                onChange={handleDeliveryFileUpload}
              />
            </div>
          </div>
          {/* <div className="text-red-500 text-sm mt-2">{resellError}</div> */}

          <button
            className="w-fit px-10 font-semibold bg-nft-primary-light text-white p-3 mt-5 rounded-xl hover:opacity-80"
            onClick={() => handleSubmit()}
            disabled={isFormSUbmitting}
          >
            {isFormSUbmitting ? "processing..." : "Submit Delivery"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Order;
