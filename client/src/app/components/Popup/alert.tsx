import React from "react";
import { AlertCircle } from "lucide-react";
import { AlertProps } from "../../utils/types/alert";

const Alert: React.FC<AlertProps> = ({ children, variant = "info" }) => {
  const baseClasses = "p-4 rounded-md flex items-start space-x-3";
  const variantClasses = {
    info: "bg-blue-50 text-blue-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
    success: "bg-green-50 text-green-800",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <AlertCircle className="flex-shrink-0 h-5 w-5 mt-0.5" />
      <div>{children}</div>
    </div>
  );
};

export default Alert;