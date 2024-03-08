import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm({ gigDetails }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    // check if gigdetails has gigId and packageId
    if (!gigDetails.gigId || !gigDetails.package.packageId) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_FRONTEND_URL}/gig/order/confirm/${gigDetails.gigId}/${gigDetails.package.packageId}`,
      },
    });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full block bg-nft-primary-light p-3 text-white rounded-xl mt-4 hover:bg-nft-primary-dark"
      >
        <span id="button-text">
          {isLoading ? (
            <div
              className="h-6 w-6 border-2 border-gray-600 border-t-gray-50 animate-spin rounded-full mx-auto"
              id="spinner"
            ></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
