import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setIsWalletConnected,
  setUser,
  setWaletAddress,
} from "../../../redux/slices/UserSlice";
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { io } from "socket.io-client";

const Header = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const isWalletConnected = useSelector(
    (state) => state.user.isWalletConnected
  );

  const logout = () => {
    Cookies.remove("authId");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setIsWalletConnected(false));
    dispatch(setWaletAddress(null));
    navigate("/");
  };

  const handleCopyToClipboard = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const fetchWalletInfo = async () => {
    try {
      const w3modal = new Web3Modal();
      const connection = await w3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const account = await signer.getAddress();

      // Fetch balance using 'getBalance' method
      const balance = await provider.getBalance(account);
      const balanceInEther = ethers.utils.formatEther(balance);

      setBalance(balanceInEther.substring(0, 6));
    } catch (error) {
      console.error("Error fetching wallet information:", error);
    }
  };

  useEffect(() => {
    if (isWalletConnected) {
      fetchWalletInfo();
    }
  }, [isWalletConnected]);

  const [notifications, setNotifications] = useState([]);

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

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
    });

    return formattedDate;
  }

  return (
    <>
      <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white">
        <div className="flex items-center">
          <div className="w-full">
            <div className="relative w-full max-w-xl pl-6">
              <div className="absolute inset-y-0 flex items-center pl-2 text-gray-100">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="text-sm rounded-lg pl-8 block w-full p-2.5 bg-gray-100 outline-none border ring-purple-700 focus:ring-2 focus:bg-transparent hover:bg-gray-200 hover:bg-opacity-70"
                placeholder="Search..."
                required
              />
            </div>
          </div>
        </div>

        <div className="space-x-4 items-center flex">
          {isWalletConnected && (
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="group hover:opacity-80">
                  <div className="flex justify-between items-center gap-5 bg-gray-100 p-2.5 rounded-xl">
                    <div className="flex gap-2 items-center text-gray-800">
                      <CreditCardIcon className="w-6 h-6" />
                      <span className="font-semibold">{balance} ETH</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <img
                        src={require("../../../nftmarketplace/assets/metamask.png")}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    </div>
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
                <Menu.Items className="absolute right-0 z-20 mt-2 w-72 origin-top-right rounded-xl bg-white shadow-xl focus:outline-none p-3 border border-gray-100">
                  <div>
                    <Menu.Item>
                      <div className="w-full text-gray-800">
                        <div className="flex items-center gap-4 p-1 py-3 hover:bg-gray-100 rounded-xl">
                          <img
                            src={require("../../../nftmarketplace/assets/metamask.png")}
                            alt=""
                            className="w-9 h-9 object-contain"
                          />
                          <div className="font-semibold">
                            {walletAddress.substring(0, 6) +
                              "..." +
                              walletAddress.substring(
                                walletAddress.length - 4,
                                walletAddress.length
                              )}
                          </div>
                          <button
                            onClick={() => handleCopyToClipboard(walletAddress)}
                            className="flex gap-1 items-center text-sm bg-nft-primary-transparent p-1 rounded-md text-nft-primary-light font-medium"
                          >
                            <ClipboardIcon className="w-3 h-3" />
                            <span>copy</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-4 p-1 py-3 hover:bg-gray-100 rounded-xl">
                          <img
                            src={require("../../../nftmarketplace/assets/eth.png")}
                            alt=""
                            className="w-9 h-9 object-contain"
                          />
                          <div className="font-semibold">Ethereum</div>
                          <div className="bold">·</div>
                          <div className="text-gray-500 font-semibold text-sm">
                            {balance} ETH
                          </div>
                        </div>
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}

          <Menu as="div" className="relative inline-block text-left">
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

                                {notification.type === "delivery-submit" && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    submitted their delivery
                                  </span>
                                )}

                                {notification.type === "dispute-raised" && (
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

                                {notification.type === "review-order" && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    reviewed your order
                                  </span>
                                )}

                                {notification.type === "approved-request" && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    approved your cancel request
                                  </span>
                                )}

                                {notification.type === "rejected-request" && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    rejected your cancel request
                                  </span>
                                )}

                                {notification.type === "cancel-request" && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    sent you a cancel request
                                  </span>
                                )}

                                {notification.type === "order-message" && (
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
                                notification.content.substring(0, 40)}
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

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group bg-gray-100 rounded-full w-10 h-10">
                <div className="p-2.5">
                  <ChatBubbleLeftEllipsisIcon className="w-full h-full text-gray-700" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-lg p-2 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    <a
                      href="{option.href}"
                      className={"text-gray-500 block px-3 py-4 rounded-lg"}
                    >
                      Link 1
                    </a>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="group shadow-md rounded-full w-10 h-10">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
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
              <Menu.Items className="absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-xl focus:outline-none p-3 border border-gray-100">
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
        </div>
      </div>
    </>
  );
};

export default Header;
