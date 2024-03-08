import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  setIsWalletConnected,
  setUser,
  setWaletAddress,
} from "../../../redux/slices/UserSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("adminAuth");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setIsWalletConnected(false));
    dispatch(setWaletAddress(null));
    navigate("/");
  };

  useEffect(() => {
    if (
      Cookies.get("adminAuth") &&
      Cookies.get("adminAuth") === process.env.REACT_APP_ADMIN_AUTH_ID
    ) {
      return;
    } else {
      navigate("/admin-login");
    }
  }, []);

  return (
    <>
      <div className="p-4 px-6 flex justify-end items-center border-b border-gray-700 bg-gray-800">
        <div className="space-x-4 items-center flex justify-between w-full">
          <h1 className="text-white">Admin Dashboard</h1>

          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="group shadow-md rounded-xl p-3 bg-nft-primary-light text-white">
                Admin
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
                    <div className="w-full border-b pb-3 border-gray-200 mb-3">
                      <div className="flex gap-3 items-center">
                        <div className="text-xl font-bold text-gray-800">
                          Admin
                        </div>
                      </div>
                    </div>
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
