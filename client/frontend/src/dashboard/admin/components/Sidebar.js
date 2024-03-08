import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  Squares2X2Icon,
  CubeTransparentIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import "../assets/styles/style.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");

  const toggleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const location = useLocation(); // Get the current location

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <aside className="flex-shrink-0 bg-white lg:block relative no-scrollbar">
      <div className="h-screen overflow-hidden no-scrollbar">
        <button
          onClick={toggleSidebar}
          className={`absolute cursor-pointer -right-2 top-20 bg-white border transition-all h-5 w-5 rounded-full z-50 hover:border-gray-400 hover:text-gray-600 text-gray-400`}
        >
          {sideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
        <div
          className={` ${sideBarOpen ? "w-56" : "w-20 "} relative duration-300`}
        >
          <div className="flex items-center p-4 gap-4">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            {sideBarOpen && (
              <span className="font-semibold text-blue-600">Nfluencer</span>
            )}
          </div>

          <div className="overflow-hidden h-screen border-t p-4 mt-1.5 border-gray-100 pt-6">
            <ul className="overflow-auto h-screen custom-scrollbar">
              <li
                className={`rounded-md p-2 cursor-pointer text-sm mb-2 ${
                  activeLink === "/dashboard"
                    ? "bg-nft-primary-light shadow-lg shadow-gray-200 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-x-4 ${
                    !sideBarOpen && "justify-center"
                  }`}
                >
                  <Squares2X2Icon className="w-6 h-6" />
                  <span
                    className={`${
                      !sideBarOpen && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {sideBarOpen && <span>Dashboard</span>}
                  </span>
                </Link>
              </li>

              <li
                className={`rounded-md p-2 cursor-pointer text-sm mb-2 ${
                  activeLink === "/dashboard/gigs" ||
                  activeLink === "/dashboard/newgig"
                    ? "bg-nft-primary-light shadow-lg shadow-gray-200 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link
                  to="/dashboard/gigs"
                  className={`flex items-center gap-x-4 ${
                    !sideBarOpen && "justify-center"
                  }`}
                >
                  <BriefcaseIcon className="w-6 h-6" />
                  <span
                    className={`${
                      !sideBarOpen && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {sideBarOpen && <span>Manage Gigs</span>}
                  </span>
                </Link>
              </li>

              <li
                className={`rounded-md p-2 cursor-pointer text-sm mb-2 ${
                  activeLink === "/dashboard/my-orders" ||
                  activeLink === "/dashboard/my-orders"
                    ? "bg-nft-primary-light shadow-lg shadow-gray-200 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link
                  to="/dashboard/my-orders"
                  className={`flex items-center gap-x-4 ${
                    !sideBarOpen && "justify-center"
                  }`}
                >
                  <ClipboardDocumentListIcon className="w-6 h-6" />
                  <span
                    className={`${
                      !sideBarOpen && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {sideBarOpen && <span>Manage Orders</span>}
                  </span>
                </Link>
              </li>

              {/* <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm text-gray-600 items-center gap-x-4 hover:bg-gray-100 mb-2`}
              >
                <ClipboardDocumentListIcon className="w-6 h-6" />
                <span
                  className={`${
                    !sideBarOpen && "hidden"
                  } origin-left duration-200 font-semibold`}
                >
                  {sideBarOpen && <span>Manage Orders</span>}
                </span>
              </li> */}

              <li
                className={`rounded-md p-2 cursor-pointer text-sm mb-2 ${
                  activeLink === "/dashboard/inbox"
                    ? "bg-nft-primary-light shadow-lg shadow-gray-200 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link
                  to="/dashboard/inbox"
                  className={`flex items-center gap-x-4 ${
                    !sideBarOpen && "justify-center"
                  }`}
                >
                  <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                  <span
                    className={`${
                      !sideBarOpen && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {sideBarOpen && <span>Inbox</span>}
                  </span>
                </Link>
              </li>

              <li
                className={`rounded-md p-2 cursor-pointer text-sm mb-2 ${
                  activeLink === "/dashboard/nfts" ||
                  activeLink === "/dashboard/newnft"
                    ? "bg-nft-primary-light shadow-lg shadow-gray-200 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link
                  to="/dashboard/nfts"
                  className={`flex items-center gap-x-4 ${
                    !sideBarOpen && "justify-center"
                  }`}
                >
                  <CubeTransparentIcon className="w-6 h-6" />
                  <span
                    className={`${
                      !sideBarOpen && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {sideBarOpen && <span>Manage NFTs</span>}
                  </span>
                </Link>
              </li>

              <li className="text-sm text-gray-600 items-center mb-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex gap-x-4 rounded-md cursor-pointer w-full items-center hover:bg-gray-100 p-2">
                        <span>
                          <Cog8ToothIcon className="w-6 h-6" />
                        </span>
                        <div
                          className={`flex w-full justify-between origin-left duration-200 font-semibold ${
                            !sideBarOpen && "hidden"
                          }`}
                        >
                          {sideBarOpen && <span>Settings</span>}

                          <span>
                            <ChevronDownIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5`}
                            />
                          </span>
                        </div>
                      </Disclosure.Button>

                      <Disclosure.Panel className="px-2 pt-3 text-sm text-gray-500">
                        <ul className="bg-gray-100 rounded-lg p-2">
                          <li
                            className={`flex rounded-md cursor-pointer hover:bg-light-white text-sm text-gray-600 items-center gap-x-4 hover:bg-gray-200 p-3`}
                          >
                            <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
                            <span
                              className={`${
                                !sideBarOpen && "hidden"
                              } origin-left duration-200 font-semibold`}
                            >
                              Profile
                            </span>
                          </li>
                          <li
                            className={`flex rounded-md cursor-pointer hover:bg-light-white text-sm text-gray-600 items-center gap-x-4 hover:bg-gray-200 p-3`}
                          >
                            <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
                            <span
                              className={`${
                                !sideBarOpen && "hidden"
                              } origin-left duration-200 font-semibold`}
                            >
                              Account
                            </span>
                          </li>
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
