import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Loader from "../../../utils/Loader";

const TopSellingCollections = () => {
  const [collections, setCollections] = useState([]);
  const [trendingFiveCollections, settrendingFiveCollections] = useState([]);
  const [trendinglastFiveCollections, settrendingLastFiveCollections] =
    useState([]);

  const [topFiveCollections, setTopFiveCollections] = useState([]);
  const [topLastFiveCollections, setTopLastFiveCollections] = useState([]);
  const [isloading, setisloading] = useState(null);

  // "/getAllCollections"
  const fetchAllCollections = async () => {
    setisloading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/nft/getAllCollections`
    );
    setCollections(response.data.collections);
    filterTrendingCollections(response.data.collections);
    filterTopCollections(response.data.collections);
    setisloading(false);
  };

  const filterTrendingCollections = (collections) => {
    const temp = [...collections];
    temp.sort((a, b) => {
      if (b.totalItems !== a.totalItems) {
        return b.totalItems - a.totalItems;
      }
      return b.totalViews - a.totalViews;
    });

    settrendingFiveCollections(temp.slice(0, 5));
    settrendingLastFiveCollections(temp.slice(5, temp.length));
  };

  const filterTopCollections = (collections) => {
    const temp = [...collections];
    temp.sort((a, b) => {
      if (b.totalSales !== a.totalSales) {
        return b.totalSales - a.totalSales;
      }
      return b.totalItemsSold - a.totalItemsSold;
    });

    setTopFiveCollections(temp.slice(0, 5));
    setTopLastFiveCollections(temp.slice(5, temp.length));
  };

  const randomPercents = [
    1.2, 23.4, 12.3, 34.5, 45.6, 13, 23, 45, 56, 67, 78, 89, 90, 100,
  ];

  useEffect(() => {
    fetchAllCollections();
  }, []);

  if (isloading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto">
      <div className="mt-28">
        <div className="text-left mb-10">
          <div className="flex items-center justify-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-4xl mr-4">
              Amazing Collections
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <Tabs
            className="w-full "
            selectedTabClassName="bg-white text-gray-800 shadow-xl shadow-gray-300"
          >
            <TabList className="bg-gray-100 w-fit rounded-xl p-1">
              <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:text-black transition-colors outline-none">
                Trending
              </Tab>
              <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:text-black transition-colors outline-none">
                Top
              </Tab>
            </TabList>

            <TabPanel>
              <div className="flex justify-between gap-14 items-start">
                <table class="table">
                  <thead class="sticky top-0 bg-white border-b border-gray-200">
                    <tr>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Rank</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Collection</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Items Sold</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Total Sales</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-3">
                    {trendingFiveCollections.map((collection, index) => (
                      <tr
                        class="text-start hover:bg-gray-100 rounded cursor-pointer font-bold text-gray-800"
                        key={index}
                      >
                        <td class="py-3 px-3 text-sm font-semibold">
                          {index + 1}
                        </td>
                        <td class="py-3 px-3">
                          <Link
                            class="flex items-center gap-6"
                            to={`/marketplace/collection/${collection._id}`}
                          >
                            <img
                              src={collection.image}
                              alt={collection.name}
                              class="rounded-xl w-16 h-16 object-cover"
                            />
                            <span class="flex items-center gap-1">
                              <span>{collection.name}</span>
                            </span>
                          </Link>
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalItemsSold}
                        </td>
                        <td class="py-3 px-3 text-right">
                          <span>{collection.totalSales.toFixed(3)} ETH</span>
                          {index < 2 && (
                            <span className="text-green-500 block text-sm font-normal">
                              +{randomPercents[index]}%
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table class="table">
                  <thead class="sticky top-0 bg-white border-b border-gray-200">
                    <tr>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Rank</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Collection</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Items Sold</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Total Sales</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-3">
                    {trendinglastFiveCollections.map((collection, index) => (
                      <tr
                        class="text-start hover:bg-gray-100 rounded cursor-pointer font-bold text-gray-800"
                        key={index}
                      >
                        <td class="py-3 px-3 text-sm font-semibold">
                          {index + 6}
                        </td>
                        <td class="py-3 px-3">
                          <Link
                            class="flex items-center gap-6"
                            to={`/marketplace/collection/${collection._id}`}
                          >
                            <img
                              src={collection.image}
                              alt={collection.name}
                              class="rounded-xl w-16 h-16 object-cover"
                            />
                            <span class="flex items-center gap-1">
                              <span>{collection.name}</span>
                            </span>
                          </Link>
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalItemsSold}
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalSales.toFixed(3)} ETH
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex justify-between gap-14 items-start">
                <table class="table">
                  <thead class="sticky top-0 bg-white border-b border-gray-200">
                    <tr>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Rank</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Collection</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Items Sold</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Total Sales</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-3">
                    {topFiveCollections.map((collection, index) => (
                      <tr
                        class="text-start hover:bg-gray-100 rounded cursor-pointer font-bold text-gray-800"
                        key={index}
                      >
                        <td class="py-3 px-3 text-sm font-semibold">{index}</td>
                        <td class="py-3 px-3">
                          <Link
                            class="flex items-center gap-6"
                            to={`/marketplace/collection/${collection._id}`}
                          >
                            <img
                              src={collection.image}
                              alt={collection.name}
                              class="rounded-xl w-16 h-16 object-cover"
                            />
                            <span class="flex items-center gap-1">
                              <span>{collection.name}</span>
                            </span>
                          </Link>
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalItemsSold}
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalSales.toFixed(3)} ETH
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table class="table">
                  <thead class="sticky top-0 bg-white border-b border-gray-200">
                    <tr>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Rank</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-start">
                          <span>Collection</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Items Sold</span>
                        </div>
                      </th>
                      <th class="p-3 py-5">
                        <div class="flex font-normal text-sm text-gray-500 items-center cursor-pointer justify-end">
                          <span>Total Sales</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-3">
                    {topLastFiveCollections.map((collection, index) => (
                      <tr
                        class="text-start hover:bg-gray-100 rounded cursor-pointer font-bold text-gray-800"
                        key={index}
                      >
                        <td class="py-3 px-3 text-sm font-semibold">
                          {index + 6}
                        </td>
                        <td class="py-3 px-3">
                          <Link
                            class="flex items-center gap-6"
                            to={`/marketplace/collection/${collection._id}`}
                          >
                            <img
                              src={collection.image}
                              alt={collection.name}
                              class="rounded-xl w-16 h-16 object-cover"
                            />
                            <span class="flex items-center gap-1">
                              <span>{collection.name}</span>
                            </span>
                          </Link>
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalItemsSold}
                        </td>
                        <td class="py-3 px-3 text-right">
                          {collection.totalSales.toFixed(3)} ETH
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TopSellingCollections;
