import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";

function SellerDashboardLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {user && (
        <div className="flex h-screen false w-full">
          <Sidebar />

          <div className="flex flex-col flex-1 w-full">
            <Header />

            <main className="h-full overflow-y-auto bg-gray-100 p-8 pt-10 w-full custom-scrollbar">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default SellerDashboardLayout;
