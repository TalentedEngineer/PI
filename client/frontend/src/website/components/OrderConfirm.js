import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderConfirm = () => {
  const { gigId, packageId } = useParams();

  const searchParams = new URLSearchParams(window.location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // console.log(user);

  const createOrder = async (
    seller,
    buyer,
    gigId,
    packageId,
    totalPrice,
    status,
    paymentIntent,
    paymentIntentClientSecret,
    paymentStatus,
    deliveryDays
  ) => {
    const req = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/createOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.jwtToken,
        },
        body: JSON.stringify({
          seller: seller,
          buyer: buyer,
          gigId: gigId,
          packageId: packageId,
          totalPrice: totalPrice,
          status: status,
          paymentIntent: paymentIntent,
          paymentIntentClientSecret: paymentIntentClientSecret,
          paymentStatus: paymentStatus,
          deliveryDays: deliveryDays,
          user: user._id,
        }),
      }
    );
    const res = await req.json();
    return res;
  };

  const fetchGigDetails = async () => {
    const req = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gigId: gigId,
        }),
      }
    );
    const res = await req.json();
    if (res.error) {
      return;
    }

    let _package = {};
    for (const key in res[0].packages) {
      if (res[0].packages.hasOwnProperty(key)) {
        if (res[0].packages[key]._id === packageId) {
          _package = res[0].packages[key];
        }
      }
    }

    const order = await createOrder(
      res[0].user._id,
      user._id,
      res[0]._id,
      packageId,
      _package.price,
      "pending",
      paymentIntentId,
      clientSecret,
      "pending",
      _package.deliveryTime
    );

    if (order) {
      navigate(`/gig/orders/${order._id}`);
    }
  };

  useEffect(() => {
    fetchGigDetails();
  }, [gigId, packageId, paymentIntentId, clientSecret]);

  console.log(gigId, packageId);
  console.log(paymentIntentId, clientSecret);

  return <></>;
};

export default OrderConfirm;
