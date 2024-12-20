import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");
    setPaymentSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      setIsProcessing(false);
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      setIsProcessing(false);
      return;
    }

    try {
      const { data: { clientSecret } } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: Math.round(parseFloat(amount) * 100),
        currency: "kes",
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="transition-opacity duration-300 ease-in-out">
        {paymentSuccess ? (
          <div className="transform transition-all duration-500 ease-in-out">
            <SuccessMessage />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
              <p className="text-gray-600 mt-2">Enter your payment information below</p>
            </div>

            <div className="relative">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount (KES)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Card Details</label>
              <CardElement
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#fa755a" },
                  },
                }}
              />
            </div>

            {error && (
              <div className="transition-all duration-300 ease-in-out">
                <ErrorMessage message={error} />
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isProcessing || !amount}
              className={`w-full p-3 flex items-center justify-center space-x-2 text-white rounded-md transition-all duration-200 ${
                isProcessing || !amount
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5"
              }`}
            >
              {isProcessing ? (
                <LoadingSpinner />
              ) : (
                <span>{`Pay KES ${amount || '0'}`}</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
