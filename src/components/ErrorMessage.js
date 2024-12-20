import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => (
  <div className="flex items-center text-red-600 space-x-2">
    <AlertCircle className="w-6 h-6" />
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
