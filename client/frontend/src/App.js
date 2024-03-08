import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./nftmarketplace/pages/Home";
import Explore from "./nftmarketplace/pages/Explore";
import NFTDetail from "./nftmarketplace/pages/NFTDetail";
import LandingPage from "./website/pages/LandingPage";
import Register from "./website/pages/Register";
import Services from "./website/pages/Services";
import GigDetails from "./website/pages/GigDetails";
import Login from "./website/pages/Login";
import Stats from "./nftmarketplace/pages/Stats";
import { SellerHomePage } from "./dashboard/seller/pages/SellerHomePage";
import SellerDashboardLayout from "./dashboard/seller/layout/SellerDashboardLayout";
import { SellerAbout } from "./dashboard/seller/pages/SellerAbout";
import { SellerGigs } from "./dashboard/seller/pages/SellerGigs";
import SellerCreateGig from "./dashboard/seller/pages/SellerCreateGig";
import SellerNewNFT from "./dashboard/seller/pages/SellerNewNFT";
import RegisterUserDetails from "./website/pages/RegisterUserDetails";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/UserSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./utils/Loader";
import SellerManageNFT from "./dashboard/seller/pages/SellerManageNFT";
import SellerInbox from "./dashboard/seller/pages/SellerInbox";
import Collection from "./nftmarketplace/pages/Collection";
import MyItems from "./dashboard/seller/pages/MyItems";
import OrderCheckout from "./website/pages/OrderCheckout";
import OrderConfirm from "./website/components/OrderConfirm";
import Order from "./website/pages/Order";
import Orders from "./dashboard/seller/pages/Orders";
import AdminHome from "./dashboard/admin/AdminHome";
import AdminLogin from "./dashboard/admin/AdminLogin";
import AdminGigs from "./dashboard/admin/AdminGigs";
import AdminTickets from "./dashboard/admin/AdminTickets";
import AdminUsers from "./dashboard/admin/AdminUsers";
import Dispute from "./website/pages/Dispute";
import PurchasedOrders from "./dashboard/seller/pages/PurchasedOrders";
import MyDisputes from "./dashboard/seller/pages/MyDisputes";
import Invoices from "./dashboard/seller/pages/Invoices";
import Policies from "./website/pages/Policies";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // New loading state

  const getUser = async (jwtAuthId) => {
    const user = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": jwtAuthId,
        },
        body: JSON.stringify({
          jwtToken: jwtAuthId,
        }),
      }
    );

    const res = await user.json();
    if (res.error) {
      setLoading(false);
      return {};
    }
    return res.user;
  };

  const fetchUser = async () => {
    if (Cookies.get("authId") === undefined) {
      localStorage.removeItem("user");
      dispatch(setUser(null));
      setLoading(false);
      return;
    }

    const jwtAuthId = Cookies.get("authId");
    if (localStorage.getItem("user") === null) {
      const user = await getUser(jwtAuthId);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      setLoading(false);
      return;
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* general */}
        <Route path="/signup" Component={Register} />
        <Route path="/terms-and-conditions" Component={Policies} />
        <Route path="/login" Component={Login} />
        <Route
          path="/user-details/:verificationToken"
          Component={RegisterUserDetails}
        />

        {/* freelance */}
        <Route path="/" Component={LandingPage} />
        <Route path="/services" Component={Services} />
        <Route path="/gigdetails/:gigtitle/:gigId" Component={GigDetails} />
        <Route
          path="/gig/order/checkout/:gigId/:packageId"
          Component={OrderCheckout}
        />
        <Route
          path="/gig/order/confirm/:gigId/:packageId"
          Component={OrderConfirm}
        />
        <Route path="/gig/orders/:orderId" Component={Order} />
        <Route path="/order/:disputeId/dispute" Component={Dispute} />

        {/* admin */}
        <Route path="/admin" Component={AdminHome} />
        <Route path="/admin-login" Component={AdminLogin} />
        <Route path="/admin-gigs" Component={AdminGigs} />
        <Route path="/admin-tickets" Component={AdminTickets} />
        <Route path="/admin-users" Component={AdminUsers} />

        {/* marketplace */}
        <Route path="/marketplace" Component={Home} />
        <Route path="/marketplace/stats" Component={Stats} />
        <Route path="/marketplace/explore" Component={Explore} />
        <Route path="/marketplace/nft/:itemId" Component={NFTDetail} />
        <Route
          path="/marketplace/collection/:collectionId"
          Component={Collection}
        />

        {/* Dashboard Section */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <SellerDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" Component={SellerHomePage} />
          <Route path="about" Component={SellerAbout} />
          <Route path="gigs" Component={SellerGigs} />
          <Route path="newgig" Component={SellerCreateGig} />
          <Route path="newnft" Component={SellerNewNFT} />
          <Route path="nfts" Component={SellerManageNFT} />
          <Route path="inbox" Component={SellerInbox} />
          <Route path="my-items" Component={MyItems} />
          <Route path="my-orders" Component={Orders} />
          <Route path="purchased-orders" Component={PurchasedOrders} />
          <Route path="my-disputes" Component={MyDisputes} />
          <Route path="invoices" Component={Invoices} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
