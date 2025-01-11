"use client";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../utils/user-context";
import { useAuth } from "../../utils/hooks/use-auth";

export default function Header() {
  const router = useRouter();
  const { user, loading } = useUser();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const navItems = [
    {
      name: "Channels",
      path: "/pages/channels",
    },
    {
      name: "Liked Videos",
      path: "/pages/videos",
    },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] flex items-center justify-center shadow-sm">
            <Image
              src="/logo.svg"
              alt="WatchWise Logo"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] bg-clip-text text-transparent">
            WatchWise
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className="text-gray-600 hover:text-[#ff5c00] transition-colors text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Profile Section with Buy Me Coffee Button */}
        <div className="flex items-center gap-4">
          {/* Profile Section - Different behavior for mobile and desktop */}
          <div className="relative profile-dropdown">
            {/* Desktop Profile with Dropdown */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img
                  src={user.profile_url}
                  alt={user.full_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">
                  {user.full_name}
                </span>
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg border border-gray-200"
                  >
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Profile - Direct Sign Out */}
            <button
              onClick={handleSignOut}
              className="md:hidden flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <img
                src={user.profile_url}
                alt={user.full_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <motion.div
              className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-[#ff5c00] transition-colors py-2 text-sm font-medium flex items-center gap-2 px-4"
                  variants={itemVariants}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
