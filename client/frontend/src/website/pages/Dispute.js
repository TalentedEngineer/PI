import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import Cookies from "js-cookie";

function Dispute() {
  let { disputeId } = useParams();
  const [dispute, setDispute] = useState({});
  const user = useSelector((state) => state.user.user);
  const [chatHistory, setChatHistory] = useState([]);
  const [responseSubject, setResponseSubject] = useState("");
  const [responseDescription, setResponseDescription] = useState("");

  const getDispute = async (disputeId) => {
    const req = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getDispute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          disputeId,
        }),
      }
    );

    const res = await req.json();
    console.log(res);
    setDispute(res.dispute);
    setChatHistory(res.chatMessages);
  };

  useEffect(() => {
    if (disputeId) getDispute(disputeId);
  }, [disputeId]);

  useEffect(() => {
    if (
      !user &&
      Cookies.get("adminAuth") !== process.env.REACT_APP_ADMIN_AUTH_ID
    ) {
      window.location.href = "/";
    }

    if (dispute.buyer && dispute.seller) {
      if (
        user &&
        user._id !== dispute.buyer._id &&
        user &&
        user._id !== dispute.seller._id &&
        Cookies.get("adminAuth") !== process.env.REACT_APP_ADMIN_AUTH_ID
      ) {
        window.location.href = "/";
      }
    }
  }, [user, dispute]);

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

  const handleDisputeResponseSubmit = async () => {
    if (!responseSubject || responseSubject.trim() === "") {
      alert("Please enter a subject");
      return;
    }

    if (!responseDescription || responseDescription.trim() === "") {
      alert("Please enter a description");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/submitDisputeResponse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          disputeId: dispute._id,
          responseSubject,
          responseDescription,
        }),
      }
    );

    window.location.reload();
  };

  const RestartOrder = async () => {
    if (
      !window.confirm(
        "Are you sure you want to restart this order? This action cannot be undone."
      )
    )
      return;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/adminRestartOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disputeId: dispute._id,
          orderId: dispute.order._id,
          buyerId: dispute.buyer._id,
          sellerId: dispute.seller._id,
          gigId: dispute.gig._id,
          packageId: dispute.package._id,
        }),
      }
    );

    window.location.reload();
  };

  const CancelOrder = async () => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    )
      return;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/adminCancelOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disputeId: dispute._id,
          orderId: dispute.order._id,
          buyerId: dispute.buyer._id,
          sellerId: dispute.seller._id,
          gigId: dispute.gig._id,
          packageId: dispute.package._id,
        }),
      }
    );

    window.location.reload();
  };

  if (
    !dispute ||
    !dispute.gig ||
    !dispute.package ||
    !dispute.buyer ||
    !dispute.seller ||
    !dispute.order
  ) {
    <Loader />;
  } else
    return (
      <>
        <div className="bg-transparent hombg">
          <Header transparent={true} />
        </div>

        <div className="container mx-auto px-4 my-8">
          <div className="border-b mb-3 pb-3">
            <h1 className="text-xl font-medium pb-3 text-gray-800 w-fit">
              Dispute Details
            </h1>
            <h1>
              <span className="text-lg font-semibold text-gray-500">
                Dispute ID:
              </span>{" "}
              {dispute._id}
            </h1>
            <p>
              <span className="text-lg font-semibold text-gray-500">
                Dispute Opened at:
              </span>{" "}
              {formatDate(dispute.createdAt)}
            </p>
            <p>
              <span className="text-lg font-semibold text-gray-500">
                Dispute Status:
              </span>{" "}
              {dispute.disputeStatus}
            </p>
            <p>
              <span className="text-lg font-semibold text-gray-500">
                Dispute Resolution:
              </span>{" "}
              {dispute.disputeResolution}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-2/3">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-medium pb-3 text-gray-800 w-fit">
                  Dispute Initiated by
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={dispute.disputeInitiator.avatar}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {dispute.disputeInitiator.name}
                  </h3>
                </div>

                <p className="mt-2">
                  <span className="text-lg font-semibold text-gray-500">
                    Subject
                  </span>
                  <span className="block">{dispute.disputeSubject}</span>
                </p>

                <p className="mt-2">
                  <span className="text-lg font-semibold text-gray-500">
                    Reason
                  </span>
                  <span className="block">{dispute.disputeDescription}</span>
                </p>
              </div>

              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-medium pb-3 text-gray-800 w-fit">
                  Counterparty Response
                </h3>

                {user &&
                  user._id === dispute.disputeInitiator._id &&
                  dispute.disputeStatus === "open" && (
                    <span>waiting for response...</span>
                  )}

                {dispute.disputeStatus === "open" && (
                  <>
                    {user && dispute.disputeInitiator._id !== user._id && (
                      <div className="mb-8">
                        <h3 className="mb-2 text-sm">
                          please enter your response to the dispute initiated by{" "}
                          <span className="text-nft-primary-light">
                            {dispute.disputeInitiator.name}
                          </span>
                        </h3>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl mb-3"
                            placeholder="Enter your dispute response subject"
                            value={responseSubject}
                            onChange={(e) => setResponseSubject(e.target.value)}
                          />

                          <textarea
                            type="number"
                            className="w-full outline-none text-base placeholder:text-gray-400 placeholder:font-medium font-medium p-4 focus:ring-2 focus:ring-nft-primary-light focus:bg-white border-gray-200 border-2 rounded-xl h-52"
                            placeholder="Enter your dispute response description here..."
                            min={0}
                            value={responseDescription}
                            onChange={(e) =>
                              setResponseDescription(e.target.value)
                            }
                          ></textarea>
                        </div>

                        <button
                          className="w-fit px-7 font-semibold bg-nft-primary-light text-white p-3 mt-2 rounded-xl hover:opacity-80"
                          onClick={handleDisputeResponseSubmit}
                        >
                          Submit Response
                        </button>
                      </div>
                    )}
                  </>
                )}

                {dispute.disputeStatus !== "open" && (
                  <>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          dispute.seller._id !== dispute.disputeInitiator._id
                            ? dispute.seller.avatar
                            : dispute.buyer.avatar
                        }
                        alt=""
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {dispute.seller._id !== dispute.disputeInitiator._id
                          ? dispute.seller.name
                          : dispute.buyer.name}
                      </h3>
                    </div>
                    <p className="mt-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Subject
                      </span>
                      <span className="block">
                        {dispute.disputeResponseSubject}
                      </span>
                    </p>

                    <p className="mt-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Response
                      </span>
                      <span className="block">
                        {dispute.disputeResponseDescription}
                      </span>
                    </p>
                  </>
                )}
              </div>

              <div className="flex-col">
                <h3 className="text-xl font-medium pb-3 text-gray-800 w-fit">
                  Chat History
                </h3>
                {chatHistory.map((message, index) => {
                  return (
                    message.chatType === "order" && (
                      <div
                        className={`flex justify-start w-full py-5 border-b border-gray-100 p-3 ${
                          dispute.disputeInitiator._id !== message.sender._id &&
                          "bg-gray-100"
                        }`}
                        key={index}
                      >
                        <div className="w-full flex justify-start">
                          <div>
                            <div className="flex gap-3">
                              <img
                                src={message.sender.avatar}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover bg-gray-100"
                              />
                              <div className="flex flex-col items-start gap-4">
                                <div className="flex flex-col items-start">
                                  <span className="font-semibold">
                                    <span className="text-nft-primary-light">
                                      {message.sender.name}
                                    </span>
                                  </span>

                                  <span className="text-xs text-gray-500">
                                    {formatDate(message.createdAt)}
                                  </span>
                                </div>

                                <div className="w-fit text-black">
                                  {message.text}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>

              {Cookies.get("adminAuth") ===
                process.env.REACT_APP_ADMIN_AUTH_ID &&
                dispute.disputeStatus !== "resolved" && (
                  <div className="my-10 p-5 bg-nft-primary-transparent text-center rounded-xl">
                    <h3 className="text-2xl font-medium pb-3 text-gray-800 mb-3">
                      Dispute Resolution by Admin
                    </h3>

                    <div className="flex items-center justify-center gap-3 w-full">
                      <button
                        className="p-3 bg-green-500 text-white rounded-xl"
                        onClick={RestartOrder}
                      >
                        <span className="text-lg font-semibold">
                          Restart Order
                        </span>
                      </button>

                      <button
                        className="p-3 bg-red-500 text-white rounded-xl"
                        onClick={CancelOrder}
                      >
                        <span className="text-lg font-semibold">
                          Cancel Order
                        </span>
                      </button>
                    </div>
                  </div>
                )}
            </div>

            <div className="w-1/3 p-5">
              <div className="md:sticky relative top-0">
                <div className="shadow-lg p-3 rounded-xl w-full">
                  <h1 className="text-xl font-medium border-b pb-3 text-gray-800">
                    Order Details
                  </h1>

                  <div className="flex items-center gap-3 mt-3 border-b pb-3">
                    {dispute.gig.images && (
                      <img
                        src={dispute.gig.images[0]}
                        alt=""
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    )}
                    <h3 className="text-sm font-medium text-gray-800 flex flex-col items-start">
                      <span>{dispute.gig.title}</span>
                      <span className="text-xs font-normal text-gray-500">
                        {dispute.package.name}
                      </span>

                      {dispute.order.isDeliveryAccepted && (
                        <span className="text-xs bg-green-200 text-green-600 p-1 font-medium rounded-md mt-2">
                          Completed
                        </span>
                      )}

                      {dispute.order.isOrderCancelled && (
                        <span className="text-xs bg-gray-300 p-1 font-medium rounded-md mt-2">
                          Cancelled
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="mt-3 p-3 flex flex-col gap-2">
                    <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                      <span>Price</span>
                      <span className="font-semibold text-gray-800">
                        ${dispute.order.totalPrice}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                      <span>Buyer</span>
                      <span className="font-semibold text-gray-800">
                        {dispute.buyer.name}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                      <span>Seller</span>
                      <span className="font-semibold text-gray-800">
                        {dispute.seller.name}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between gap-1 text-gray-500 font-medium text-sm">
                      <span>Delivery Time</span>
                      <span className="font-semibold text-gray-800">
                        {formatDate(dispute.order.orderEndDate)}
                      </span>
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
export default Dispute;
