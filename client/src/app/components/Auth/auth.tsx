"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useAuth } from "../../utils/hooks/use-auth";

export default function Auth() {
  const { signInWithGoogle } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="WatchWise Logo"
            width={48}
            height={48}
            className="text-white"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] bg-clip-text text-transparent">
            Welcome to WatchWise
          </h1>
          <p className="text-gray-600">
            Discover and track your favorite YouTube content
          </p>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full relative flex items-center justify-center gap-3 px-6 py-3 
           text-base font-medium rounded-xl
           bg-white border-2 border-gray-200
           hover:border-[#ff5c00] 
           hover:text-[#ff5c00] text-gray-600
           transition-all duration-300 ease-in-out
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5c00]
           disabled:opacity-50 disabled:cursor-not-allowed
           group"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-[#ff5c00] border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            <>
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Continue with Google</span>
            </>
          )}
        </button>

        {/* Additional info */}
        <p className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <Link
            href="/pages/tos"
            className="text-[#ff5c00] hover:text-[#ff0c0c] transition-colors duration-300 underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/pages/privacy"
            className="text-[#ff5c00] hover:text-[#ff0c0c] transition-colors duration-300 underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
