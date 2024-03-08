import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PauseCircleIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useSelector } from "react-redux";

export const SellerGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [message, setMessage] = useState(null);

  // fetch all the gigs for the user
  const user = useSelector((state) => state.user.user);
  // console.log(user);

  // fetch all the gigs for the user
  const fetchGigs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/user-gigs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) setGigs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteGig = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/gig/delete-gig`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.jwtToken,
          },
          body: JSON.stringify({ gigId: id, userId: user._id }),
        }
      );
      const data = await response.json();
      if (data) {
        setMessage(data.message);
        fetchGigs();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [user]);

  return (
    <>
      {/* {gigs && ( */}
      <div>
        <h2 className="font-extrabold tracking-tight text-3xl text-gray-800 block">
          Gigs Overview
        </h2>

        <div>
          <div className="lg:flex md:flex w-full my-6 gap-3">
            <div className="lg:w-1/4 md:w-2/4 w-full bg-[rgb(15,220,156)] shadow-lg hover:border-transparent shadow-green-200 transition-all rounded-xl p-6 group hover:scale-105 cursor-pointer relative">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center font-md text-sm text-white">
                    <div>Active</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-4xl font-semibold text-white">
                    {gigs.length}
                  </div>
                  <div>
                    <span className="text-white">
                      <RocketLaunchIcon className="w-12 h-10 opacity-60" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-2/4 w-full bg-[rgb(95,70,212)] shadow-lg hover:border-transparent shadow-purple-200 transition-all rounded-xl p-6 group hover:scale-105 cursor-pointer">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center font-md text-sm text-white">
                    <div>Pending Approval</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-4xl font-semibold text-white">01</div>
                  <div>
                    <span className="text-white">
                      <ClockIcon className="w-12 h-10 opacity-60" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-2/4 w-full bg-[rgb(253,116,71)] shadow-lg hover:border-transparent shadow-red-200 transition-all rounded-xl p-6 group hover:scale-105 cursor-pointer">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center font-md text-sm text-white">
                    <div>Denied</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-4xl font-semibold text-white">10</div>
                  <div>
                    <span className="text-white">
                      <ArchiveBoxXMarkIcon className="w-12 h-10 opacity-60" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-2/4 w-full bg-[rgb(21,124,253)] shadow-lg hover:border-transparent shadow-blue-200 transition-all rounded-xl p-6 group hover:scale-105 cursor-pointer">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center font-md text-sm text-white">
                    <div>Draft</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-4xl font-semibold text-white">15</div>
                  <div>
                    <span className="text-white">
                      <PencilSquareIcon className="w-12 h-10 opacity-60" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-2/4 w-full bg-[rgb(21,180,253)] shadow-lg hover:border-transparent shadow-blue-300 transition-all rounded-xl p-6 group hover:scale-105 cursor-pointer">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center font-md text-sm text-white">
                    <div>Paused</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-4xl font-semibold text-white">15</div>
                  <div>
                    <span className="text-white">
                      <PauseCircleIcon className="w-12 h-10 opacity-60" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg shadow-gray-200">
            <Tabs
              className="w-full"
              selectedTabClassName="bg-nft-primary-light text-white shadow-lg shadow-purple-200"
            >
              <div className="flex justify-between items-center">
                <TabList className="border-b border-gray-100 p-4">
                  <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors outline-none">
                    Active
                  </Tab>
                  <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors outline-none">
                    Pending Approval
                  </Tab>
                  <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors outline-none">
                    Draft
                  </Tab>
                  <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors outline-none">
                    Denied
                  </Tab>
                  <Tab className="list-none rounded-xl px-6 py-3 text-gray-500 font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors outline-none">
                    Paused
                  </Tab>
                </TabList>

                <div className="text-right p-4">
                  <Link
                    to="/dashboard/newgig"
                    className="rounded-xl px-6 py-3 bg-nft-primary-light text-white font-semibold inline-block relative cursor-pointer hover:opacity-80 transition-colors shadow-lg shadow-purple-200"
                  >
                    Create New Gig
                  </Link>
                </div>
              </div>

              {message && (
                <div className="relative text-center mt-3" role="alert">
                  <span className="inline-block bg-gray-200 border border-gray-200 text-gray-800 font-semibold px-4 py-3 rounded-xl ">
                    {message}
                  </span>
                </div>
              )}

              <TabPanel>
                <div className="p-4">
                  <div className="text-sm mb-5 pl-4 text-gray-400">
                    Active Gigs
                  </div>
                  {/* overflow-x-auto */}
                  <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase border-b">
                        <tr>
                          <th scope="col" className="p-3">
                            <input
                              id="checked-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 focus:ring-nft-primary-light cursor-pointer hover:accent-nft-primary-light accent-nft-primary-light"
                            />
                          </th>
                          <th scope="col" className="p-3">
                            Gig
                          </th>
                          <th scope="col" className="p-3">
                            NFT Reward
                          </th>
                          <th scope="col" className="p-3">
                            Impressions
                          </th>
                          <th scope="col" className="p-3">
                            Clicks
                          </th>
                          <th scope="col" className="p-3">
                            Orders
                          </th>
                          <th scope="col" className="p-3">
                            Cancellations
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {gigs.map((gig, index) => (
                          <tr
                            className="hover:bg-gray-50 transition-colors"
                            key={index}
                          >
                            <td className="p-3 py-5">
                              <input
                                id="checked-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 focus:ring-nft-primary-light cursor-pointer hover:accent-nft-primary-light accent-nft-primary-light"
                              />
                            </td>
                            <td className="p-3 py-5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={gig.images[0]}
                                  alt={gig.title}
                                  className="h-14 w-20 object-cover rounded-lg"
                                />
                                <p>{gig.title}</p>
                              </div>
                            </td>
                            <td className="p-3 py-5">
                              <a
                                href="s"
                                className="text-nft-primary-light bg-purple-100 p-1 rounded-md hover:bg-purple-200"
                              >
                                NFT14df36f41b0d4c4b
                              </a>
                            </td>
                            <td className="p-3 py-5">
                              <div className="flex items-center gap-1 text-red-500 font-medium">
                                <span>300</span>
                                <span>
                                  <ArrowTrendingDownIcon className="w-4 h-4" />
                                </span>
                              </div>
                            </td>
                            <td className="p-3 py-5">15</td>
                            <td className="p-3 py-5">2</td>
                            <td className="p-3 py-5">0%</td>
                            <td className="p-3 py-5">
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <Menu.Button className="group bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10">
                                    <div className="p-2.5">
                                      <EllipsisVerticalIcon className="w-full h-full text-gray-500" />
                                    </div>
                                  </Menu.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 -mt-3 w-32 origin-top-right rounded-md bg-white shadow-lg focus:outline-none p-0 overflow-hidden">
                                    <div>
                                      <Menu.Item>
                                        <Link
                                          to={`/gigdetails/${gig.title.replace(
                                            / /g,
                                            "-"
                                          )}/${gig._id}`}
                                          className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center"
                                        >
                                          <span>
                                            <EyeIcon className="h-5 w-5 text-gray-400" />
                                          </span>
                                          <span>Preview</span>
                                        </Link>
                                      </Menu.Item>
                                      <Menu.Item>
                                        <a
                                          href="{option.href}"
                                          className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center"
                                        >
                                          <span>
                                            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                                          </span>
                                          <span>Edit</span>
                                        </a>
                                      </Menu.Item>
                                      <Menu.Item>
                                        <a
                                          href="{option.href}"
                                          className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center"
                                        >
                                          <span>
                                            <PauseCircleIcon className="h-5 w-5 text-gray-400" />
                                          </span>
                                          <span>Pause</span>
                                        </a>
                                      </Menu.Item>
                                      <Menu.Item>
                                        <a
                                          href="{option.href}"
                                          className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center"
                                        >
                                          <span>
                                            <ShareIcon className="h-5 w-5 text-gray-400" />
                                          </span>
                                          <span>Share</span>
                                        </a>
                                      </Menu.Item>
                                      <Menu.Item>
                                        <button
                                          className="text-gray-500 p-2 hover:bg-gray-100 flex gap-2 items-center w-full"
                                          onClick={() => DeleteGig(gig._id)}
                                        >
                                          <span>
                                            <TrashIcon className="h-5 w-5 text-gray-400" />
                                          </span>
                                          <span>Delete</span>
                                        </button>
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-4">
                  <div className="text-sm mb-5 pl-4 text-gray-400">
                    Pending Gigs
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-4">
                  <div className="text-sm mb-5 pl-4 text-gray-400">
                    Draft Gigs
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-4">
                  <div className="text-sm mb-5 pl-4 text-gray-400">
                    Denied Gigs
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-4">
                  <div className="text-sm mb-5 pl-4 text-gray-400">
                    Paused Gigs
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
