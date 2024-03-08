import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import GigDetails from "./GigDetails";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function OrderCheckout() {
  const { gigId, packageId } = useParams();

  const [gig, setGig] = useState({});
  const navigate = useNavigate();
  const [packageInfo, setPackageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [platformFee, setPlatformFee] = useState(0); //10% of the total price

  const user = useSelector((state) => state.user.user);

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
      navigate("/");
      return;
    }
    setGig(res[0]);

    let _package = {};

    for (const key in res[0].packages) {
      if (res[0].packages.hasOwnProperty(key)) {
        if (res[0].packages[key]._id === packageId) {
          setPackageInfo(res[0].packages[key]);
          _package = res[0].packages[key];
        }
      }
    }

    const platformFee = (_package.price * 10) / 100;
    setPlatformFee(platformFee);

    setGigDetails({
      title: res[0].title,
      gigId: res[0]._id,
      image: res[0].images[0],
      seller: res[0].user._id,
      buyer: user._id,
      package: {
        packageId: _package._id,
        revisions: _package.revisions,
        deliveryTime: `${_package.deliveryTime} days`,
        price: _package.price,
      },
      price: _package.price,
      platformFee: platformFee,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!gigId) {
      navigate("/");
      return;
    }
    fetchGigDetails();
    setIsLoading(false);
  }, [gigId, navigate, packageId]);

  const [clientSecret, setClientSecret] = useState("");
  const [gigDetails, setGigDetails] = useState({});

  const fetchIntent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/gig/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "xl-tshirt" }],
          gigDetails: gigDetails,
        }),
      }
    );

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  useEffect(() => {
    setIsLoading(true);
    if (gig && packageInfo && gig.images && GigDetails) {
      fetchIntent();
    }

    setIsLoading(false);
  }, [gig, gigId, gigDetails]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-transparent hombg">
        <Header transparent={true} />
      </div>

      {gig && (
        <div className="flex justify-center items-center p-10 py-20 gap-20">
          <div className="w-1/4">
            <div className="bg-white shadow-lg rounded-xl p-3">
              <h1 className="text-2xl font-medium border-b pb-3 text-gray-800">
                Confirm and Pay
              </h1>

              <div className="flex items-center gap-3 mt-3 border-b pb-3">
                {gig && packageInfo && gig.images && (
                  <img
                    src={gig.images[0]}
                    alt=""
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                )}
                <h3 className="text-sm font-medium text-gray-800">
                  {gig.title}
                </h3>
              </div>

              <div className="mt-3 p-3 flex flex-col gap-2">
                <div>
                  <div className="flex items-center justify-between text-gray-800 font-semibold text-lg">
                    <p>{packageInfo.name}</p>
                    <p className="font-normal text-gray-500">
                      ${packageInfo.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between gap-1">
                  <span>Support</span>
                  <span>
                    {packageInfo.support ? (
                      <CheckIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </span>
                </div>

                <div className="flex flex-row justify-between gap-1">
                  <span>Revisions</span>
                  <span className="text-gray-500">{packageInfo.revisions}</span>
                </div>

                <div className="flex flex-row justify-between gap-1">
                  <span>Delivery Time</span>
                  <span className="text-gray-500">
                    {packageInfo.deliveryTime} Day(s)
                  </span>
                </div>

                <div className="flex flex-row justify-between gap-1">
                  <span>Platform Fee</span>
                  <span className="text-gray-500">${platformFee}</span>
                </div>

                <div className="border-t mt-3 pt-3">
                  <div className="flex items-center justify-between text-gray-800 font-semibold text-lg">
                    <p>Total</p>
                    <p>$ {packageInfo.price + platformFee}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm gigDetails={gigDetails} />
              </Elements>
            ) : (
              <div
                className="h-6 w-6 border-2 border-gray-600 border-t-gray-50 animate-spin rounded-full mx-auto"
                id="spinner"
              ></div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
