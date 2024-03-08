import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/UserSlice";
import {
  PlusIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { setSearchQuery } from "../../redux/slices/SearchNftSlice";

const Header = ({ transparent = false, shadow = true }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("authId");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);

  const [query, setquery] = useState("");
  const handleSearch = (e) => {
    setquery(e);
    dispatch(setSearchQuery(e));
  };

  const handlekeywordInputKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      navigate("/marketplace/explore");
    }
  };

  return (
    <>
      <header
        className={
          transparent
            ? "relative inset-x-0 top-0 z-50"
            : "absolute inset-x-0 top-0 z-50"
        }
      >
        <nav
          className={
            transparent
              ? `bg-white ${shadow && "shadow-md shadow-gray-200"}`
              : "bg-transparent"
          }
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center">
              <Link to="/marketplace" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="Nfluencer Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </Link>
              {transparent ? (
                <div className="flex relative max-sm:hidden items-center">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 left-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search items, collections"
                    className="bg-gray-100 p-3 rounded-xl outline-none px-6 pl-10 md:w-96 text-gray-800 placeholder:text-gray-500 focus:ring-2 text-sm focus:shadow-sm focus:ring-nft-primary-light focus:bg-white"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handlekeywordInputKeyDown}
                  />
                </div>
              ) : (
                ""
              )}
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
              <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-3 md:mt-0 md:border-0 items-center">
                <li>
                  <Link
                    to="/marketplace"
                    className="text-sm text-gray-800 px-4 py-2 hover:opacity-80"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/stats"
                    className="text-sm text-gray-800 px-4 py-2 hover:opacity-80"
                  >
                    Stats
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/explore"
                    className="text-sm text-gray-800 px-4 py-2 hover:opacity-80"
                  >
                    Explore
                  </Link>
                </li>

                {!user && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`rounded-xl text-sm px-4 py-3 hover:opacity-80 flex items-center gap-2 ${
                          transparent
                            ? "text-nft-primary-light bg-nft-primary-transparent"
                            : "text-gray-800 bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50"
                        }`}
                      >
                        <span>Login</span>
                        <ArrowDownTrayIcon className="w-5 h-5 transform -rotate-90" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="rounded-xl bg-nft-primary-light text-sm text-white px-4 py-3 hover:opacity-80 flex items-center gap-2"
                      >
                        <span>Sign Up</span>
                        <UserPlusIcon className="w-5 h-5" />
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className={`text-sm px-4 py-2 hover:opacity-80 text-gray-800 `}
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/nfts"
                        className="rounded-xl bg-nft-primary-light text-sm text-white px-4 py-3 hover:opacity-80 flex items-center gap-2"
                      >
                        <PlusIcon className="w-5 h-5 inline-block" />
                        <span>Create</span>
                      </Link>
                    </li>

                    <li>
                      <Menu as="div" className="relative text-left">
                        <div className="flex h-full items-center">
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
                                      <div className="text-gray-500 text-sm w-full font-normal">
                                        {user.email.substring(0, 5) +
                                          "..." +
                                          user.email.substring(
                                            user.email.indexOf("@")
                                          )}
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
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base font-normal"
                                >
                                  Profile
                                </a>
                              </Menu.Item>
                              <Menu.Item>
                                <a
                                  href="{option.href}"
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base font-normal"
                                >
                                  Settings
                                </a>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-gray-600 block p-2 rounded-xl hover:bg-gray-100 text-base w-full text-start font-normal"
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
      </header>
    </>
  );
};

export default Header;
