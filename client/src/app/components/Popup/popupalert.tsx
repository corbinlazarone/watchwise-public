import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertPropsForPopup } from "../../utils/types/alert";

const PopupAlert: React.FC<AlertPropsForPopup> = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    info: "bg-blue-100 border-blue-500 text-blue-800",
    success: "bg-green-100 border-green-500 text-green-800",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
    error: "bg-red-100 border-red-500 text-red-800",
  }[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-4 right-4 max-w-sm w-full z-50"
        >
          <motion.div
            className={`${bgColor} shadow-lg rounded-lg pointer-events-auto`}
            layout
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {type === "info" && (
                    <i className="fas fa-info-circle text-blue-400" />
                  )}
                  {type === "success" && (
                    <i className="fas fa-check-circle text-green-400" />
                  )}
                  {type === "warning" && (
                    <i className="fas fa-exclamation-circle text-yellow-400" />
                  )}
                  {type === "error" && (
                    <i className="fas fa-times-circle text-red-400" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                    onClick={() => {
                      setIsVisible(false);
                      onClose();
                    }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupAlert;