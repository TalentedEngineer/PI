import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AdminSidebar from "./components/AdminSidebar";
import { Link } from "react-router-dom";

const AdminTickets = () => {
  const [disputes, setDisputes] = useState([]);

  const fetchAllDisputes = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/admin-disputes`
      );
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching disputes:", data.error);
        return;
      }

      setDisputes(data.disputes);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    }
  };

  useEffect(() => {
    fetchAllDisputes();
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

  return (
    <>
      <Header />

      <div className="flex justify-between">
        <AdminSidebar />

        <div className="w-5/6 p-5">
          <div className="mt-5">
            <h2 className="font-semibold text-lg">Order Disputes</h2>

            <div className="mt-5 overflow-hidden">
              <div className="overflow-auto">
                <div>
                  <div className="bg-white rounded-xl shadow-lg shadow-gray-200">
                    <div className="p-4">
                      <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                        <table className="w-full text-sm text-left text-gray-700">
                          <thead className="text-xs text-gray-500 uppercase border-b">
                            <tr className="uppercase">
                              <th scope="col" className="p-3">
                                Initiated by
                              </th>
                              <th scope="col" className="p-3">
                                Order
                              </th>
                              <th scope="col" className="p-3">
                                Subject
                              </th>
                              <th scope="col" className="p-3">
                                Status
                              </th>
                              <th scope="col" className="p-3">
                                Resolution
                              </th>
                              <th scope="col" className="p-3">
                                Date
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {disputes.map((dispute) => (
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 py-5 text-gray-800">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={dispute.disputeInitiator.avatar}
                                      alt=""
                                      className="w-11 h-11 rounded-full object-cover"
                                    />
                                    <span>{dispute.disputeInitiator.name}</span>
                                  </div>
                                </td>

                                <td className="p-3 py-5 text-gray-800">
                                  <div className="flex items-center gap-2 flex-row">
                                    <img
                                      src={dispute.gig.images[0]}
                                      alt=""
                                      className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div className="flex flex-col">
                                      <Link
                                        to={`/gig/orders/${dispute.order._id}`}
                                        target="_blank"
                                        className="hover:text-nft-primary-light"
                                      >
                                        {dispute.gig.title}
                                      </Link>
                                      <span className="text-gray-400">
                                        Order: {dispute.order._id}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-3 py-5">
                                  {dispute.disputeResponseSubject &&
                                    dispute.disputeResponseSubject.substring(
                                      0,
                                      20
                                    )}
                                  ...
                                </td>

                                <td className="p-3 py-5">
                                  <span className="p-1 bg-gray-500 rounded-md text-white text-sm">
                                    {dispute.disputeStatus}
                                  </span>
                                </td>

                                <td className="p-3 py-5">
                                  <span className="p-1 bg-gray-200 rounded-md text-gray-700 text-sm">
                                    {dispute.disputeResolution}
                                  </span>
                                </td>

                                <td className="p-3 py-5">
                                  {formatDate(dispute.createdAt)}
                                </td>

                                <td className="p-3 py-5">
                                  <Link
                                    target="_blank"
                                    to={`/order/${dispute._id}/dispute`}
                                    className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTickets;
