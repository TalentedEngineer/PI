import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-1/6 flex flex-col gap-5 p-3 bg-gray-800 text-white h-screen">
      <Link
        to={`/admin`}
        className="block p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
      >
        Home
      </Link>
      <Link
        to={`/admin-users`}
        className="block p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
      >
        Users
      </Link>
      <Link
        to={`/admin-gigs`}
        className="block p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
      >
        Gigs
      </Link>
      <Link
        to={`/admin-tickets`}
        className="block p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors"
      >
        Order Disputes
      </Link>
    </aside>
  );
};

export default AdminSidebar;
