import React, { useEffect, useState } from "react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ChevronRightIcon,
  EyeIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import EarningChart from "../components/charts/EarningChart";
import OrderChart from "../components/charts/OrdersChart";
import { useSelector } from "react-redux";

export const SellerHomePage = () => {
  const user = useSelector((state) => state.user.user);

  const [ordersAsSeller, setOrdersAsSeller] = useState([]);
  const [ordersAsBuyer, setOrdersAsBuyer] = useState([]);
  const [series, setSeries] = useState([]);
  const [earningseries, setearningSeries] = useState([]);
  const [totalProfits, setTotalProfits] = useState(0);
  const [lastMonthProfits, setLastMonthProfits] = useState(0);
  const [profitRisePercentage, setProfitRisePercentage] = useState(0);
  const [totalNewOrders, setTotalNewOrders] = useState(0);
  const [percentIncrease, setPercentIncrease] = useState(0);
  const [totalOrdersLastMonth, setTotalOrdersLastMonth] = useState(0);

  const getUserOrdersAsSeller = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getUserOrdersAsSeller`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      return;
    }
    setOrdersAsSeller(data);
    console.log(data);
  };

  const getUserOrdersAsBuyer = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getUserOrdersAsBuyer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      return;
    }
    setOrdersAsBuyer(data);
    console.log(data);
  };

  useEffect(() => {
    getUserOrdersAsSeller();
    getUserOrdersAsBuyer();
  }, []);

  useEffect(() => {
    // Combine ordersAsSeller and ordersAsBuyer into a single array
    const allOrders = [...ordersAsSeller, ...ordersAsBuyer];
    console.log(allOrders);

    // Group orders by date
    const ordersByDate = allOrders.reduce((result, order) => {
      const date = order.createdAt.split("T")[0]; // Extract date part
      result[date] = result[date] || { buyer: 0, seller: 0 };
      if (ordersAsBuyer.includes(order)) {
        result[date].buyer++;
      } else {
        result[date].seller++;
      }
      return result;
    }, {});

    console.log(ordersByDate);

    // Extract dates and counts for the chart series
    const dates = Object.keys(ordersByDate);
    const buyerCounts = dates.map((date) => ordersByDate[date].buyer || 0);
    const sellerCounts = dates.map((date) => ordersByDate[date].seller || 0);

    setSeries([
      { name: "As buyer", data: buyerCounts },
      { name: "As seller", data: sellerCounts },
    ]);
  }, [ordersAsSeller, ordersAsBuyer]);

  useEffect(() => {
    // Filter orders where orderAccepted is true
    const acceptedOrders = ordersAsSeller.filter(
      (order) => order.isDeliveryAccepted && order.gig !== null
    );

    console.log(acceptedOrders);

    // Group earnings by month
    const earningsByMonth = acceptedOrders.reduce((result, order) => {
      const month = new Date(order.createdAt).getMonth();
      result[month] = (result[month] || 0) + order.totalPrice; // Assuming totalPrice field exists
      return result;
    }, {});

    console.log(earningsByMonth);

    // Extract earnings and update the chart series
    const earnings = Array.from(
      { length: 12 },
      (_, index) => earningsByMonth[index] || 0
    );

    console.log(earnings);

    setearningSeries([
      {
        name: "Earnings",
        data: earnings,
      },
    ]);
  }, [ordersAsSeller]);

  const [overviewOrders, setOverviewOrders] = useState([]);

  useEffect(() => {
    // Combine ordersAsSeller and ordersAsBuyer
    const allOrders = [...ordersAsSeller, ...ordersAsBuyer];

    // Sort orders by orderEndDate
    const sortedOrders = allOrders.sort((a, b) => {
      const dateA = new Date(a.orderEndDate).getTime();
      const dateB = new Date(b.orderEndDate).getTime();
      return dateA - dateB;
    });

    // Filter the first 4 completed/accepted orders
    const filteredOrders = sortedOrders.slice(0, 4);

    console.log("filteredOrders", filteredOrders);

    setOverviewOrders(filteredOrders);
  }, [ordersAsSeller, ordersAsBuyer]);

  const [earningOverview, setearningOverview] = useState([]);

  useEffect(() => {
    // Combine ordersAsSeller and ordersAsBuyer
    const allOrders = [...ordersAsSeller, ...ordersAsBuyer];

    // Sort orders by orderEndDate
    const sortedOrders = allOrders.sort((a, b) => {
      const dateA = new Date(a.orderEndDate).getTime();
      const dateB = new Date(b.orderEndDate).getTime();
      return dateA - dateB;
    });

    // Filter the first 4 completed/accepted orders
    const filteredOrders = sortedOrders
      .filter((item) => item.isDeliveryAccepted)
      .slice(0, 4);

    console.log("filteredOrders", filteredOrders);

    setearningOverview(filteredOrders);
  }, [ordersAsSeller, ordersAsBuyer]);

  useEffect(() => {
    // Filter completed/accepted orders from the last month
    const currentDate = new Date();
    const lastMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const lastMonthOrders = ordersAsSeller.filter(
      (order) =>
        order.orderAccepted &&
        order.orderCompleted &&
        new Date(order.orderEndDate) >= lastMonthStartDate &&
        new Date(order.orderEndDate) <= lastMonthEndDate
    );

    // Calculate total profits
    const allProfits = ordersAsSeller.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    setTotalProfits(allProfits);

    // Calculate total profits made last month
    const lastMonthProfitsTotal = lastMonthOrders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    setLastMonthProfits(lastMonthProfitsTotal);

    // Calculate percentage rise in profits
    const percentageRise =
      ((lastMonthProfitsTotal - allProfits) / allProfits) * 100;
    setProfitRisePercentage(percentageRise);
  }, [ordersAsSeller]);

  useEffect(() => {
    // Filter completed/accepted orders from the last month
    const currentDate = new Date();
    const lastMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const lastMonthOrders = ordersAsSeller.filter(
      (order) =>
        order.orderAccepted &&
        order.orderCompleted &&
        new Date(order.orderEndDate) >= lastMonthStartDate &&
        new Date(order.orderEndDate) <= lastMonthEndDate
    );

    // Calculate total new orders
    const totalNewOrdersCount = ordersAsSeller.filter(
      (order) => order.isNewCustomer
    ).length;
    setTotalNewOrders(totalNewOrdersCount);

    // Calculate total orders from the last month
    setTotalOrdersLastMonth(lastMonthOrders.length);

    // Calculate percentage increase
    const totalOrdersCount = ordersAsSeller.length;
    const percentageIncrease =
      ((totalOrdersLastMonth - totalNewOrders) / totalNewOrders) * 100;
    setPercentIncrease(percentageIncrease);
  }, [ordersAsSeller, totalOrdersLastMonth, totalNewOrders]);

  const [userViews, setUserViews] = useState([]);

  const getUserGigsViews = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getUserGigsViews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      }
    );
    const data = await res.json();
    if (data.error) {
      return;
    }
    setUserViews(data);
  };

  useEffect(() => {
    getUserGigsViews();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="lg:flex gap-4">
          <div className="lg:w-3/4 p-0 bg-purple-300 rounded-xl relative">
            <div className="w-full h-full overflow-hidden absolute rounded-xl">
              <div className="absolute w-64 h-64 opacity-50 bg-nft-primary-light rounded-full -top-36 -left-36 z-10"></div>
              <div className="absolute w-64 h-64 opacity-50 bg-nft-primary-light rounded-full -bottom-36 -right-36 z-10"></div>
            </div>

            <div className="container mx-auto lg:flex items-center justify-between relative">
              <div className="w-1/2 lg:w-auto text-right justify-end flex z-50">
                <img
                  src={require("../assets/img/home-hero.jpg")}
                  alt="Your"
                  className="h-64 w-auto lg:h-full lg:w-full object-contain -mt-10 relative"
                />
              </div>

              <div className="w-1/2 lg:w-auto text-gray-900 z-20 px-16 relative">
                <h2 className="text-xl mb-2 font-normal">
                  Hi, <span className="font-semibold">{user.name}</span>
                </h2>
                <p className="text-sm">
                  You have 3 tasks to finish all tasks today. You already
                  completed 50% of your tasks. Keep it up! Your progress is
                  looking great.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4">
            <div className="bg-nft-primary-light w-full h-full rounded-xl p-4 text-white">
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm mb-3">
                  lorem ipsum mane. lorem ipsum mane. lorem ipsum mane.
                </p>
                <button className="bg-white rounded-lg p-3 text-sm w-full text-gray-700 font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex md:flex w-full my-6 gap-3">
          <div className="lg:w-1/4 md:w-2/4 w-full bg-white shadow-lg hover:border-transparent shadow-gray-200 transition-all hover:bg-nft-primary-light hover:shadow-[0_10px_20px_rgba(120,82,243,0.5)] rounded-xl p-6 group hover:scale-105 border border-gray-200 cursor-pointer">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center font-semibold text-sm group-hover:text-white text-nft-primary-dark">
                  <div>
                    <span className="bg-nft-primary-light text-nft-primary-dark block p-1 bg-opacity-30 rounded-full group-hover:bg-white transition-all">
                      <EyeIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <div>Total Views</div>
                </div>
                <div>
                  <span>
                    <ChevronRightIcon className="w-5 h-5 text-nft-primary-dark group-hover:text-white" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group-hover:text-white">
                <div className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                  {userViews}
                </div>
                <div className="flex rounded-full p-1 px-2.5 text-xs items-center bg-green-200 gap-1">
                  <span>
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-700" />
                  </span>
                  <span className="text-green-700 font-semibold">2.2%</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 mr-1 group-hover:text-gray-50">
                  via last month:
                </span>
                <span className="text-xs text-black font-semibold group-hover:text-white">
                  3
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-2/4 w-full bg-white shadow-lg hover:border-transparent shadow-gray-200 transition-all hover:bg-nft-primary-light hover:shadow-[0_10px_20px_rgba(120,82,243,0.5)] rounded-xl p-6 group hover:scale-105 border border-gray-200 cursor-pointer">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center font-semibold text-sm group-hover:text-white text-nft-primary-dark">
                  <div>
                    <span className="bg-nft-primary-light text-nft-primary-dark block p-1 bg-opacity-30 rounded-full group-hover:bg-white transition-all">
                      <PresentationChartBarIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <div>Total Profits</div>
                </div>
                <div>
                  <span>
                    <ChevronRightIcon className="w-5 h-5 text-nft-primary-dark group-hover:text-white" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group-hover:text-white">
                <div className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                  ${totalProfits}
                </div>
                <div className="flex rounded-full p-1 px-2.5 text-xs items-center bg-red-200 gap-1">
                  <span>
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-700" />
                  </span>
                  <span className="text-red-700 font-semibold">
                    {profitRisePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 mr-1 group-hover:text-gray-50">
                  via last month:
                </span>
                <span className="text-xs text-black font-semibold group-hover:text-white">
                  ${lastMonthProfits}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-2/4 w-full bg-white shadow-lg hover:border-transparent shadow-gray-200 transition-all hover:bg-nft-primary-light hover:shadow-[0_10px_20px_rgba(120,82,243,0.5)] rounded-xl p-6 group hover:scale-105 border border-gray-200 cursor-pointer">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center font-semibold text-sm group-hover:text-white text-nft-primary-dark">
                  <div>
                    <span className="bg-nft-primary-light text-nft-primary-dark block p-1 bg-opacity-30 rounded-full group-hover:bg-white transition-all">
                      <UsersIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <div>New Customers</div>
                </div>
                <div>
                  <span>
                    <ChevronRightIcon className="w-5 h-5 text-nft-primary-dark group-hover:text-white" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group-hover:text-white">
                <div className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                  {totalNewOrders}
                </div>
                <div className="flex rounded-full p-1 px-2.5 text-xs items-center bg-green-200 gap-1">
                  <span>
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-700" />
                  </span>
                  <span className="text-green-700 font-semibold">
                    {percentIncrease.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 mr-1 group-hover:text-gray-50">
                  via last month:
                </span>
                <span className="text-xs text-black font-semibold group-hover:text-white">
                  {totalOrdersLastMonth}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/4 md:w-2/4 w-full bg-white shadow-lg hover:border-transparent shadow-gray-200 transition-all hover:bg-nft-primary-light hover:shadow-[0_10px_20px_rgba(120,82,243,0.5)] rounded-xl p-6 group hover:scale-105 border border-gray-200 cursor-pointer">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center font-semibold text-sm group-hover:text-white text-nft-primary-dark">
                  <div>
                    <span className="bg-nft-primary-light text-nft-primary-dark block p-1 bg-opacity-30 rounded-full group-hover:bg-white transition-all">
                      <LightBulbIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <div>Running Orders</div>
                </div>
                <div>
                  <span>
                    <ChevronRightIcon className="w-5 h-5 text-nft-primary-dark group-hover:text-white" />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group-hover:text-white">
                <div className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                  {ordersAsBuyer.length + ordersAsSeller.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 w-full my-6 max-w-full shadow-xl shadow-gray-200">
          <div className="mb-3 flex justify-between items-center">
            <span className="font-bold text-2xl text-gray-900">
              Overview Orders
            </span>
          </div>
          <div className="w-full flex">
            <div className="lg:w-1/3">
              <div className="flex gap-3 items-center mb-5">
                <div>
                  <span className="rounded-full bg-green-200 block p-1">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-700" />
                  </span>
                </div>
                <div className="text-green-600 font-semibold">+7.2%</div>
                <div className="text-gray-500 text-xs">
                  - Increased This Week
                </div>
              </div>

              <div>
                <ul>
                  {overviewOrders.map((order) => {
                    // if (order.gig)
                    return (
                      order.seller && (
                        <li className="flex justify-between items-center hover:bg-gray-100 rounded-lg mb-4">
                          <div className="flex items-center gap-5">
                            <div className="bg-gray-100 p-1.5 rounded-full">
                              <img
                                src={order.seller.avatar}
                                alt=""
                                className="h-12 w-12 rounded-full"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">
                                {order.seller.name}
                              </span>
                              <span className="text-lg font-bold">
                                ${order.totalPrice}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-full p-0 px-3  bg-gray-200 gap-1 text-center">
                            <span className="text-xs text-gray-700 font-medium">
                              {new Date(
                                order.orderEndDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="lg:w-2/3 mt-4 lg:mt-0 overflow-hidden">
              <div>
                <OrderChart series={series} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl shadow-gray-200">
          <div className="mb-3">
            <span className="font-bold text-2xl text-gray-900 block">
              Earnings Overview
            </span>
          </div>

          <div className="lg:flex rounded-xl">
            <div className="lg:w-1/3">
              <div className="flex gap-3 items-center mb-5">
                <div>
                  <span className="rounded-full bg-green-200 block p-1">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-700" />
                  </span>
                </div>
                <div className="text-green-600 font-semibold">+7.2%</div>
                <div className="text-gray-500 text-xs">
                  - Increased This Week
                </div>
              </div>

              <div>
                <ul>
                  {earningOverview.map((order) => {
                    return (
                      <li className="flex justify-between items-center hover:bg-gray-100 rounded-lg mb-4">
                        <div className="flex items-center gap-5">
                          <div className="bg-gray-100 p-1.5 rounded-full">
                            <img
                              src={order.gig.images[0]}
                              alt=""
                              className="h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              {order.gig.title.substring(0, 25)}...
                            </span>
                            <span className="text-lg font-bold">
                              ${order.totalPrice}
                            </span>
                          </div>
                        </div>

                        <div className="rounded-full p-0 px-3  bg-gray-200 gap-1 text-center">
                          <span className="text-xs text-gray-700 font-medium">
                            {new Date(order.orderEndDate).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="lg:w-2/3 mt-4 lg:mt-0">
              <div>
                <EarningChart series={earningseries} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
