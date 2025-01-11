"use client";

import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import { ALERT_TYPE } from "../../utils/types/alert";

export default function Contact({ onAlert }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleInputChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const sendID = process.env.NEXT_PUBLIC_SEND_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    if (!templateID || !sendID || !publicKey) {
      console.log("Email service not setup correctly!");
      setIsLoading(false);
      return;
    }

    emailjs.init({
      publicKey: publicKey,
    });

    try {
      await emailjs.send(sendID, templateID, {
        from_name: formData.name,
        to_name: "Watchwise Team",
        message: formData.message,
        reply_to: formData.email,
      });

      onAlert(
        "Message sent successfully! We'll get back to you soon.",
        ALERT_TYPE.SUCCESS
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      onAlert(
        "Failed to send message. Please try again later.",
        ALERT_TYPE.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have questions about Watchwise? We'd love to hear from you.
            </p>
          </div>

          {/* Status Message */}
          {status.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleEmailSend} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChanges}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                         transition-all duration-200 outline-none
                         bg-white text-gray-900"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChanges}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                         transition-all duration-200 outline-none
                         bg-white text-gray-900"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChanges}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                         transition-all duration-200 outline-none resize-none
                         bg-white text-gray-900"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg 
                         hover:from-orange-700 hover:to-orange-800
                         transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-orange-500 
                         focus:ring-offset-2
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
