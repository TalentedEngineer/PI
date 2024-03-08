import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Link } from "react-router-dom";

const PurchasedOrders = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);

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

  const [buyerOrders, setBuyerOrders] = useState({});
  const getAllBuyerOrders = async (seller) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getAllBuyerOrders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": seller.jwtToken,
        },
        body: JSON.stringify({
          userId: seller._id,
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      return;
    }

    setBuyerOrders(data);
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      getAllBuyerOrders(user);
    }
  }, [user]);

  return (
    <div className="w-full">
      <div>
        <h2 className="font-extrabold tracking-tight text-3xl text-gray-800 block mb-10">
          Purchased Orders
        </h2>

        <div>
          <div className="bg-white rounded-xl shadow-lg shadow-gray-200">
            <Tabs
              className="w-full"
              selectedTabClassName="bg-nft-primary-light text-white"
            >
              <div className="flex justify-between items-center">
                <TabList className="p-4 flex gap-2">
                  <Tab className="list-none rounded-md px-2 py-2 text-gray-500 font-medium relative cursor-pointer transition-colors outline-none text-sm ">
                    <span>Active</span>
                    <span className="ml-1 bg-white rounded-sm text-nft-primary-light h-5 w-fit text-center text-sm px-0.5">
                      {buyerOrders.activeOrders &&
                        buyerOrders.activeOrders.length}
                    </span>
                  </Tab>
                  <Tab className="list-none rounded-md px-2 py-2 text-gray-500 font-medium relative cursor-pointer transition-colors outline-none text-sm">
                    <span>Late</span>
                    <span className="ml-1 bg-white rounded-sm text-nft-primary-light h-5 w-fit text-center text-sm px-0.5">
                      {buyerOrders.lateOrders && buyerOrders.lateOrders.length}
                    </span>
                  </Tab>
                  <Tab className="list-none rounded-md px-2 py-2 text-gray-500 font-medium relative cursor-pointer transition-colors outline-none text-sm">
                    <span>Delivered</span>
                    <span className="ml-1 bg-white rounded-sm text-nft-primary-light h-5 w-fit text-center text-sm px-0.5">
                      {buyerOrders.deliveredOrders &&
                        buyerOrders.deliveredOrders.length}
                    </span>
                  </Tab>
                  <Tab className="list-none rounded-md px-2 py-2 text-gray-500 font-medium relative cursor-pointer transition-colors outline-none text-sm">
                    <span>Completed</span>
                    <span className="ml-1 bg-white rounded-sm text-nft-primary-light h-5 w-fit text-center text-sm px-0.5">
                      {buyerOrders.completedOrders &&
                        buyerOrders.completedOrders.length}
                    </span>
                  </Tab>
                  <Tab className="list-none rounded-md px-2 py-2 text-gray-500 font-medium relative cursor-pointer transition-colors outline-none text-sm">
                    <span>Cancelled</span>
                    <span className="ml-1 bg-white rounded-sm text-nft-primary-light h-5 w-fit text-center text-sm px-0.5">
                      {buyerOrders.cancelledOrders &&
                        buyerOrders.cancelledOrders.length}
                    </span>
                  </Tab>
                </TabList>
              </div>

              <TabPanel>
                <div className="p-4">
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr className="uppercase">
                          <th scope="col" className="p-3">
                            Seller
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT
                          </th>
                          <th scope="col" className="p-3">
                            Due On
                          </th>
                          <th scope="col" className="p-3">
                            Price
                          </th>
                          <th scope="col" className="p-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyerOrders.activeOrders &&
                          buyerOrders.activeOrders.map((order, index) => {
                            return (
                              order.seller && (
                                <tr
                                  className="hover:bg-gray-50 transition-colors"
                                  key={index}
                                >
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.seller.avatar}
                                        alt=""
                                        className="w-11 h-11 rounded-full object-cover"
                                      />
                                      <span>{order.seller.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2 flex-row">
                                      <img
                                        src={order.gig.images[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-md object-cover"
                                      />
                                      <div className="flex flex-col">
                                        <Link
                                          to={`/gigdetails/${order.gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${order.gig._id}`}
                                          target="_blank"
                                          className="hover:text-nft-primary-light"
                                        >
                                          {order.gig.title}
                                        </Link>
                                        <span className="text-gray-400">
                                          {order.package.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5">
                                    {order.gig.offerReward ? (
                                      <Link
                                        to={`/marketplace/nft/${order.gig.rewardNFT}`}
                                        target="_blank"
                                        className="bg-nft-primary-transparent text-nft-primary-light p-1 rounded-md text-sm hover:opacity-80"
                                      >
                                        Reward NFT : {order.gig.rewardNFT}
                                      </Link>
                                    ) : (
                                      <span className="text-gray-400">
                                        No NFT
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 py-5">
                                    {formatDate(order.orderEndDate)}
                                  </td>
                                  <td className="p-3 py-5">
                                    ${order.totalPrice}
                                  </td>
                                  <td className="p-3 py-5">
                                    <span className="p-1 bg-blue-500 rounded-md text-white text-sm">
                                      Active
                                    </span>
                                  </td>
                                  <td className="p-3 py-5">
                                    <Link
                                      target="_blank"
                                      to={`/gig/orders/${order._id}`}
                                      className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="p-4">
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr className="uppercase">
                          <th scope="col" className="p-3">
                            Seller
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT
                          </th>
                          <th scope="col" className="p-3">
                            Due On
                          </th>
                          <th scope="col" className="p-3">
                            Price
                          </th>
                          <th scope="col" className="p-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyerOrders.lateOrders &&
                          buyerOrders.lateOrders.map((order, index) => {
                            return (
                              order.seller && (
                                <tr
                                  className="hover:bg-gray-50 transition-colors"
                                  key={index}
                                >
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.seller.avatar}
                                        alt=""
                                        className="w-11 h-11 rounded-full object-cover"
                                      />
                                      <span>{order.seller.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2 flex-row">
                                      <img
                                        src={order.gig.images[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-md object-cover"
                                      />
                                      <div className="flex flex-col">
                                        <Link
                                          to={`/gigdetails/${order.gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${order.gig._id}`}
                                          target="_blank"
                                          className="hover:text-nft-primary-light"
                                        >
                                          {order.gig.title}
                                        </Link>
                                        <span className="text-gray-400">
                                          {order.package.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5">
                                    {order.gig.offerReward ? (
                                      <Link
                                        to={`/marketplace/nft/${order.gig.rewardNFT}`}
                                        target="_blank"
                                        className="bg-nft-primary-transparent text-nft-primary-light p-1 rounded-md text-sm hover:opacity-80"
                                      >
                                        Reward NFT : {order.gig.rewardNFT}
                                      </Link>
                                    ) : (
                                      <span className="text-gray-400">
                                        No NFT
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 py-5 text-red-500">
                                    {formatDate(order.orderEndDate)}
                                  </td>
                                  <td className="p-3 py-5">
                                    ${order.totalPrice}
                                  </td>
                                  <td className="p-3 py-5">
                                    <span className="p-1 bg-red-500 rounded-md text-white text-sm">
                                      Late
                                    </span>
                                  </td>
                                  <td className="p-3 py-5">
                                    <Link
                                      target="_blank"
                                      to={`/gig/orders/${order._id}`}
                                      className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="p-4">
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr className="uppercase">
                          <th scope="col" className="p-3">
                            Seller
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT
                          </th>
                          <th scope="col" className="p-3">
                            Due On
                          </th>
                          <th scope="col" className="p-3">
                            Price
                          </th>
                          <th scope="col" className="p-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyerOrders.deliveredOrders &&
                          buyerOrders.deliveredOrders.map((order, index) => {
                            return (
                              order.seller && (
                                <tr
                                  className="hover:bg-gray-50 transition-colors"
                                  key={index}
                                >
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.seller.avatar}
                                        alt=""
                                        className="w-11 h-11 rounded-full object-cover"
                                      />
                                      <span>{order.seller.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2 flex-row">
                                      <img
                                        src={order.gig.images[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-md object-cover"
                                      />
                                      <div className="flex flex-col">
                                        <Link
                                          to={`/gigdetails/${order.gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${order.gig._id}`}
                                          target="_blank"
                                          className="hover:text-nft-primary-light"
                                        >
                                          {order.gig.title}
                                        </Link>
                                        <span className="text-gray-400">
                                          {order.package.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5">
                                    {order.gig.offerReward ? (
                                      <Link
                                        to={`/marketplace/nft/${order.gig.rewardNFT}`}
                                        target="_blank"
                                        className="bg-nft-primary-transparent text-nft-primary-light p-1 rounded-md text-sm hover:opacity-80"
                                      >
                                        Reward NFT : {order.gig.rewardNFT}
                                      </Link>
                                    ) : (
                                      <span className="text-gray-400">
                                        No NFT
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 py-5 text-gray-500">
                                    {formatDate(order.orderEndDate)}
                                  </td>
                                  <td className="p-3 py-5">
                                    ${order.totalPrice}
                                  </td>
                                  <td className="p-3 py-5">
                                    <span className="p-1 bg-orange-500 rounded-md text-white text-sm">
                                      Delivered
                                    </span>
                                  </td>
                                  <td className="p-3 py-5">
                                    <Link
                                      target="_blank"
                                      to={`/gig/orders/${order._id}`}
                                      className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="p-4">
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr className="uppercase">
                          <th scope="col" className="p-3">
                            Seller
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT
                          </th>
                          <th scope="col" className="p-3">
                            Due On
                          </th>
                          <th scope="col" className="p-3">
                            Price
                          </th>
                          <th scope="col" className="p-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyerOrders.completedOrders &&
                          buyerOrders.completedOrders.map((order, index) => {
                            return (
                              order.seller && (
                                <tr
                                  className="hover:bg-gray-50 transition-colors"
                                  key={index}
                                >
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.seller.avatar}
                                        alt=""
                                        className="w-11 h-11 rounded-full object-cover"
                                      />
                                      <span>{order.seller.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2 flex-row">
                                      <img
                                        src={order.gig.images[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-md object-cover"
                                      />
                                      <div className="flex flex-col">
                                        <Link
                                          to={`/gigdetails/${order.gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${order.gig._id}`}
                                          target="_blank"
                                          className="hover:text-nft-primary-light"
                                        >
                                          {order.gig.title}
                                        </Link>
                                        <span className="text-gray-400">
                                          {order.package.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5">
                                    {order.gig.offerReward ? (
                                      <Link
                                        to={`/marketplace/nft/${order.gig.rewardNFT}`}
                                        target="_blank"
                                        className="bg-nft-primary-transparent text-nft-primary-light p-1 rounded-md text-sm hover:opacity-80"
                                      >
                                        Reward NFT : {order.gig.rewardNFT}
                                      </Link>
                                    ) : (
                                      <span className="text-gray-400">
                                        No NFT
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 py-5 text-gray-500">
                                    {formatDate(order.orderEndDate)}
                                  </td>
                                  <td className="p-3 py-5">
                                    ${order.totalPrice}
                                  </td>
                                  <td className="p-3 py-5">
                                    <span className="p-1 bg-green-500 rounded-md text-white text-sm">
                                      Completed
                                    </span>
                                  </td>
                                  <td className="p-3 py-5">
                                    <Link
                                      target="_blank"
                                      to={`/gig/orders/${order._id}`}
                                      className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="p-4">
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr className="uppercase">
                          <th scope="col" className="p-3">
                            Seller
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT
                          </th>
                          <th scope="col" className="p-3">
                            Due On
                          </th>
                          <th scope="col" className="p-3">
                            Price
                          </th>
                          <th scope="col" className="p-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {buyerOrders.cancelledOrders &&
                          buyerOrders.cancelledOrders.map((order, index) => {
                            return (
                              order.seller && (
                                <tr
                                  className="hover:bg-gray-50 transition-colors"
                                  key={index}
                                >
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.seller.avatar}
                                        alt=""
                                        className="w-11 h-11 rounded-full object-cover"
                                      />
                                      <span>{order.seller.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5 text-gray-800">
                                    <div className="flex items-center gap-2 flex-row">
                                      <img
                                        src={order.gig.images[0]}
                                        alt=""
                                        className="w-12 h-12 rounded-md object-cover"
                                      />
                                      <div className="flex flex-col">
                                        <Link
                                          to={`/gigdetails/${order.gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${order.gig._id}`}
                                          target="_blank"
                                          className="hover:text-nft-primary-light"
                                        >
                                          {order.gig.title}
                                        </Link>
                                        <span className="text-gray-400">
                                          {order.package.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 py-5">
                                    {order.gig.offerReward ? (
                                      <Link
                                        to={`/marketplace/nft/${order.gig.rewardNFT}`}
                                        target="_blank"
                                        className="bg-nft-primary-transparent text-nft-primary-light p-1 rounded-md text-sm hover:opacity-80"
                                      >
                                        Reward NFT : {order.gig.rewardNFT}
                                      </Link>
                                    ) : (
                                      <span className="text-gray-400">
                                        No NFT
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 py-5 text-gray-500">
                                    {formatDate(order.orderEndDate)}
                                  </td>
                                  <td className="p-3 py-5">
                                    ${order.totalPrice}
                                  </td>
                                  <td className="p-3 py-5">
                                    <span className="p-1 bg-gray-500 rounded-md text-white text-sm">
                                      Cancelled
                                    </span>
                                  </td>
                                  <td className="p-3 py-5">
                                    <Link
                                      target="_blank"
                                      to={`/gig/orders/${order._id}`}
                                      className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedOrders;
