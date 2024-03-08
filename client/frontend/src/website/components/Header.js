import { Menu, Transition } from "@headlessui/react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/UserSlice";
import Loader from "../../utils/Loader";
import {
  PlusIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import { setSearchedCategory } from "../../redux/slices/SearchServiceSlice";

function Header({ transparent = false, showCategoriesBar = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    Cookies.remove("authId");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  const user = useSelector((state) => state.user.user);
  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
    });

    return formattedDate;
  }

  const [notifications, setNotifications] = React.useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/get-notifications`,
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
      const data = await response.json();
      console.log("NOT", data);
      if (data.error) {
        setNotifications([]);
        return;
      }
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);
    socket.on("notification", (message) => {
      fetchNotifications();
    });
  }, [user]);

  const categories = [
    { name: "Influencer Services" },
    { name: "Live Streaming" },
    { name: "Music Services" },
    { name: "Art Services" },
    { name: "Consulting Services" },
    { name: "Coaching Services" },
  ];

  const handleCategorySearch = (cat) => {
    dispatch(setSearchedCategory(cat));
    navigate("/services");
  };

  return (
    <>
      <header
        className={
          transparent
            ? "relative inset-x-0 top-0 z-50"
            : "relative inset-x-0 top-0 z-50"
        }
      >
        <nav
          className={
            transparent ? "bg-white border-b border-gray-100" : "bg-transparent"
          }
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <div className="flex items-center">
              <Link className="flex items-center" to="/">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="Nfluencer Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-800"></span>
              </Link>

              <div className="group">
                <button
                  className={`ml-5 px-5 py-4 flex items-center gap-2 text-sm hover:opacity-80 ${
                    transparent ? "text-gray-800" : "text-white"
                  }`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                  <span>Categories</span>
                </button>
                <div
                  className={`hidden group-hover:block absolute  bg-white text-gray-800 shadow-lg border border-gray-100 rounded-xl z-10 overflow-hidden`}
                >
                  <div className="flex flex-col gap-2 items-start">
                    {categories.map((cat) => (
                      <button
                        className="text-sm text-gray-800 font-medium hover:bg-gray-100 p-3 w-full text-left"
                        onClick={() => handleCategorySearch(cat.name)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className=" flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-3 md:mt-0 md:border-0 items-center">
                <li>
                  <Link
                    to="/marketplace"
                    className={`text-sm px-4 py-2 hover:opacity-80 ${
                      transparent ? "text-gray-800" : "text-white"
                    }`}
                  >
                    NFT Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className={`text-sm px-4 py-2 hover:opacity-80 ${
                      transparent ? "text-gray-800" : "text-white"
                    }`}
                  >
                    Find Services
                  </Link>
                </li>
                {user === null ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`text-sm px-4 py-2 hover:opacity-80 ${
                          transparent ? "text-gray-800" : "text-white"
                        }`}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className={`rounded-xl text-sm px-4 py-3 hover:opacity-80 flex items-center gap-2 ${
                          transparent
                            ? "bg-nft-primary-light text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        <span>Sign Up</span>
                        <UserPlusIcon className="w-5 h-5" />
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className={`rounded-xl text-sm px-4 py-3 hover:opacity-80 flex items-center gap-2 ${
                          transparent
                            ? "bg-nft-primary-light text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        <Squares2X2Icon className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>
                    </li>

                    <li>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group bg-gray-100 rounded-full w-10 h-10">
                            <div className="p-2.5">
                              <BellIcon className="w-full h-full text-gray-700" />
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
                          <Menu.Items className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-xl bg-white shadow-lg focus:outline-none p-2 border border-gray-300">
                            {notifications.length > 0 ? (
                              notifications.map((notification, index) => {
                                let url = "";
                                if (
                                  notification.type === "order-message" ||
                                  notification.type === "cancel-request" ||
                                  notification.type === "approved-request" ||
                                  notification.type === "rejected-request" ||
                                  notification.type === "review-order" ||
                                  notification.type === "requirements-submit" ||
                                  notification.type === "delivery-submit" ||
                                  notification.type === "dispute-raised"
                                ) {
                                  url = `/gig/orders/${notification.orderId}`;
                                }

                                return (
                                  <Menu.Item>
                                    <Link
                                      className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 flex gap-2 items-center"
                                      to={url}
                                      target="_blank"
                                    >
                                      <img
                                        src={notification.sender.avatar}
                                        className="w-8 h-8 rounded-full"
                                        alt=""
                                      />
                                      <div className="flex text-sm flex-col items-start w-full">
                                        <span className="flex w-full justify-between">
                                          <span className="text-gray-800">
                                            {notification.sender.name}

                                            {notification.type ===
                                              "delivery-submit" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                submitted their delivery
                                              </span>
                                            )}

                                            {notification.type ===
                                              "dispute-raised" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                raised a dispute
                                              </span>
                                            )}

                                            {notification.type ===
                                              "requirements-submit" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                submitted their requirements
                                              </span>
                                            )}

                                            {notification.type ===
                                              "review-order" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                reviewed your order
                                              </span>
                                            )}

                                            {notification.type ===
                                              "approved-request" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                approved your cancel request
                                              </span>
                                            )}

                                            {notification.type ===
                                              "rejected-request" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                rejected your cancel request
                                              </span>
                                            )}

                                            {notification.type ===
                                              "cancel-request" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                sent you a cancel request
                                              </span>
                                            )}

                                            {notification.type ===
                                              "order-message" && (
                                              <span className="text-xs text-gray-500 ml-2">
                                                sent you a message
                                              </span>
                                            )}
                                          </span>
                                          <span className="text-xs">
                                            {formatDate(notification.createdAt)}
                                          </span>
                                        </span>
                                        <span className="w-full text-xs text-gray-500">
                                          {notification.content &&
                                            notification.content.substring(
                                              0,
                                              40
                                            )}
                                          ...
                                        </span>
                                      </div>
                                    </Link>
                                  </Menu.Item>
                                );
                              })
                            ) : (
                              <Menu.Item>
                                <div className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 flex gap-2 items-center">
                                  <div className="flex flex-col items-start w-full">
                                    <span className="flex w-full justify-between">
                                      <span>No notifications</span>
                                    </span>
                                  </div>
                                </div>
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </li>

                    <li>
                      <Menu as="div" className="relative text-left">
                        <div>
                          <Menu.Button className="group shadow-md rounded-full w-10 h-10">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full rounded-full"
                            />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-xl focus:outline-none p-3 border border-gray-100">
                            <div>
                              <Menu.Item>
                                <div className="w-full border-b pb-3 border-gray-200 mb-1">
                                  <div className="flex gap-3 items-center">
                                    <div>
                                      <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-11 w-11 rounded-full"
                                      />
                                    </div>
                                    <div className="flex flex-col items-center justify-start text-start">
                                      <div className="text-gray-800 text-sm font-semibold text-start w-full flex gap-1">
                                        <span>
                                          {user.name
                                            .concat(" (", user.username, ")")
                                            .substring(0, 18)}
                                          ...
                                        </span>
                                      </div>
                                      <div className="text-gray-500 text-sm w-full">
                                        {user.email.substring(0, 18)}...
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-full text-current mt-4">
                                    <button className="w-full bg-nft-primary-light text-white rounded-xl text-sm p-2 py-3 hover:opacity-80 font-medium">
                                      Switch to Buying
                                    </button>
                                  </div>
                                </div>
                              </Menu.Item>
                              <Menu.Item>
                                <a
                                  href="{option.href}"
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base"
                                >
                                  Profile
                                </a>
                              </Menu.Item>
                              <Menu.Item>
                                <a
                                  href="{option.href}"
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base"
                                >
                                  Settings
                                </a>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base w-full text-start"
                                  onClick={logout}
                                >
                                  Logout
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {showCategoriesBar && (
          <div
            className={`relative flex items-center bg-white justify-center shadow-md p-0 w-full ${
              transparent ? "" : "hidden"
            }`}
          >
            <div className="w-full overflow-x-auto px-3 custom-scrollbar scrollbar-thin">
              <div className="flex space-x-6 w-screen justify-center">
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Graphics & Design
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Digital Marketing
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Writing & Translation
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Video & Animation
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Music & Audio
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Programming & Tech
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Business
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  AI & Data
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Lifestyle
                </button>
                <button className="text-gray-800 hover:opacity-80 text-base hover:border-nft-primary-light border-b-2 border-transparent pt-3 py-2 block text-center whitespace-nowrap">
                  Advertising
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export default Header;
