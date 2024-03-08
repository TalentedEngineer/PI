import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AdminSidebar from "./components/AdminSidebar";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [adminStats, setAdminStats] = useState({});

  const getAdminStats = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/getAdminStats`
    );
    const data = await res.json();
    console.log(data);
    if (data.error) {
      return;
    }

    setAdminStats(data.stats);
  };

  useState(() => {
    getAdminStats();
  }, []);

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
        `${process.env.REACT_APP_API_URL}/api/user/get-admin-notifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
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
    if (Cookies.get("adminAuth") === process.env.REACT_APP_ADMIN_AUTH_ID) {
      fetchNotifications();
    }
  }, []);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    setSocket(socket);
    socket.on("notification", (message) => {
      fetchNotifications();
    });
  }, []);

  return (
    <>
      <Header />

      <div className="flex">
        <AdminSidebar />

        <div className="w-5/6 p-5 bg-gray-100">
          <div className="flex justify-center items-center gap-5 flex-wrap">
            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/5 mb-5">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Total Users
              </h2>
              <p className="text-gray-700 text-3xl font-bold">
                {adminStats.users}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/5 mb-5">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Total Gigs
              </h2>
              <p className="text-gray-700 text-3xl font-bold">
                {adminStats.gigs}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/5 mb-5">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Total Disputes
              </h2>
              <p className="text-gray-700 text-3xl font-bold">
                {adminStats.disputes}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/5 mb-5">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Total Invoices
              </h2>
              <p className="text-gray-700 text-3xl font-bold">
                {adminStats.invoices}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/5 mb-5">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Total Orders
              </h2>
              <p className="text-gray-700 text-3xl font-bold">
                {adminStats.orders}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-lg mt-6 mb-5">Notifications</h1>

            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                let url = "";
                if (notification.type === "dispute-raised") {
                  url = `/gig/orders/${notification.orderId}`;
                  return (
                    <div>
                      <div className="text-gray-800 p-2 rounded-lg hover:bg-gray-100 bg-gray-300 flex gap-2 items-center w-fit">
                        <img
                          src={notification.sender.avatar}
                          className="w-12 h-12 rounded-full"
                          alt=""
                        />
                        <div className="flex text-base flex-col items-start w-full">
                          <span className="flex w-fit justify-start items-center gap-4">
                            <span className="text-gray-800">
                              {notification.sender.name}

                              {notification.type === "dispute-raised" && (
                                <span className="text-sm text-gray-800 ml-2">
                                  raised a dispute
                                </span>
                              )}
                            </span>
                            <span className="text-sm">
                              {formatDate(notification.createdAt)}
                            </span>
                          </span>
                          <span className="w-full text-sm text-gray-800">
                            {notification.content &&
                              notification.content.substring(0, 40)}
                            ...
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div>
                <div className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 flex gap-2 items-center">
                  <div className="flex flex-col items-start w-full">
                    <span className="flex w-full justify-between">
                      <span>No notifications</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
