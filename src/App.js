import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";

const stripePromise = loadStripe("pk_test_51OVsg2CDSokPhjdKAzH8kUdtkvUil05bUhdSt2djvCaCxf0q7GfrBwnVebMHPMH6G9A8ZUdOfZmEYiG01plU0QSY00IqfNUlXW"); 

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  </div>
);

export default App;
