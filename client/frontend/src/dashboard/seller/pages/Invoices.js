import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Invoices = () => {
  const user = useSelector((state) => state.user.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);

  const formatDate = (date) => {
    const originalDate = new Date(date);
    const options = {
      day: "numeric",
      month: "short",
      hour12: false,
      timeZone: "UTC",
      year: "numeric",
    };
    const formattedDate = originalDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const [invoices, setInvoices] = useState([]);
  const getAllUserInvoices = async (user) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/getAllUserInvoices`,
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
    console.log(data);
    if (data.error) {
      return;
    }

    setInvoices(data.invoices);
  };

  useEffect(() => {
    if (user) {
      getAllUserInvoices(user);
    }
  }, [user]);

  const filteredInvoices = invoices.filter((invoice) => {
    if (!startDate || !endDate) {
      return invoice;
    }
    const invoiceDate = new Date(invoice.createdAt);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return invoiceDate >= start && invoiceDate <= end;
  });

  return (
    <div className="w-full">
      <div>
        <h2 className="font-extrabold tracking-tight text-3xl text-gray-800 block mb-10">
          Your Invoices
        </h2>

        <div>
          <div className="bg-white rounded-xl shadow-lg shadow-gray-200">
            <div className="p-4">
              <div className="relative w-full h-full rounded-xl shadow-lg shadow-gray-50">
                <div className="flex items-center gap-5 text-sm justify-end mb-1 border-b pb-6">
                  <div>
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                      type="date"
                      id="startDate"
                      className="bg-gray-200 p-2 rounded-lg cursor-pointer outline-nft-primary-light"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate">End Date: </label>
                    <input
                      type="date"
                      id="endDate"
                      className="bg-gray-200 p-2 rounded-lg cursor-pointer outline-nft-primary-light"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr className="uppercase">
                      <th scope="col" className="p-3">
                        Date
                      </th>
                      <th scope="col" className="p-3">
                        Order
                      </th>
                      <th scope="col" className="p-3">
                        Seller
                      </th>
                      <th scope="col" className="p-3">
                        Platform Fee
                      </th>
                      <th scope="col" className="p-3">
                        Gig Price
                      </th>
                      <th scope="col" className="p-3">
                        Total Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInvoices.map((dispute, index) => (
                      <tr
                        className="hover:bg-gray-50 transition-colors"
                        key={index}
                      >
                        <td className="p-3 py-5">
                          {formatDate(dispute.createdAt)}
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

                        <td className="p-3 py-5 text-gray-800">
                          <div className="flex items-center gap-2">
                            <img
                              src={dispute.seller.avatar}
                              alt=""
                              className="w-11 h-11 rounded-full object-cover"
                            />
                            <span>{dispute.seller.name}</span>
                          </div>
                        </td>

                        <td className="p-3 py-5">
                          ${dispute.platformFee.toFixed(3)}
                        </td>

                        <td className="p-3 py-5">
                          <span className="p-1 bg-gray-500 rounded-md text-white text-sm">
                            ${dispute.totalPrice}
                          </span>
                        </td>

                        <td className="p-3 py-5">
                          <span className="p-1 bg-gray-500 rounded-md text-white text-sm">
                            ${dispute.totalPrice + dispute.platformFee}
                          </span>
                        </td>

                        <td className="p-3 py-5">
                          <Link
                            target="_blank"
                            to={`/gig/orders/${dispute.order._id}`}
                            className="p-2 bg-nft-primary-light text-white rounded-md px-4"
                          >
                            View Order
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
  );
};

export default Invoices;
