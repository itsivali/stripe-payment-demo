import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessMessage = () => (
  <div className="flex flex-col items-center space-y-4">
    <CheckCircle className="w-12 h-12 text-green-500" />
    <h2 className="text-lg font-semibold text-gray-700">Payment Successful!</h2>
    <p className="text-gray-600">Thank you for your payment.</p>
  </div>
);

export default SuccessMessage;
