"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { BarChart2, ThumbsUp, Users, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserResult } from "../utils/types/user";
import { supabase } from "../utils/supabsae-config";
import { useAuth } from "../utils/hooks/use-auth";

const Landing: React.FC = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserResult | null>();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 64;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error checking session:", error);
          return;
        }

        if (session?.user) {
          const userData: UserResult = {
            id: session.user.id,
            full_name: session.user.user_metadata.full_name,
            email: session.user.email,
            profile_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
            providers: session.user.app_metadata.providers,
            created_at: session.user.created_at,
          };

          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to check session:", err);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const fadeInFromTop = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fadeInFromBottom = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // mobile menu animation variants
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

  // navigation item animation variants
  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  // feature item list
  const features = [
    {
      icon: <Users size={32} className="text-[#ff5c00]" />,
      title: "Channel Insights",
      desc: "See all your subscribed YouTube channels and track how many videos you've liked from each one."
    },
    {
      icon: <BarChart2 size={32} className="text-[#ff5c00]" />,
      title: "Engagement Ranking",
      desc: "Channels are ranked based on the number of videos you've liked, showing which channels truly resonate with you."
    },
    {
      icon: <ThumbsUp size={32} className="text-[#ff5c00]" />,
      title: "Liked Videos Library",
      desc: "Access your complete library of liked videos in one place, sorted by most recent or oldest first."
    }
  ];
  

  // how it work list
  const howItWorks = [
    {
      step: "1",
      title: "Connect Account",
      desc: "Securely connect your YouTube account with just one click",
    },
    {
      step: "2",
      title: "Data Analysis",
      desc: "We analyze your viewing history and engagement patterns",
    },
    {
      step: "3",
      title: "Get Insights",
      desc: "Receive detailed insights about your YouTube preferences",
    },
  ];

  const handleLogin = () => {
    router.push("/pages/auth");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  return (
    <>
      {/* Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInFromTop}
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
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
          </div>

     {/* Desktop Navigation */}
<nav className="hidden md:flex items-center gap-8">
  <div className="flex items-center gap-6">
    <button
      onClick={() => scrollToSection("features")}
      className="text-gray-600 hover:text-[#ff5c00] transition-colors text-sm font-medium cursor-pointer"
    >
      Features
    </button>
    <button
      onClick={() => scrollToSection("how-it-works")}
      className="text-gray-600 hover:text-[#ff5c00] transition-colors text-sm font-medium cursor-pointer"
    >
      How it Works
    </button>
    {user && (
      <button
        onClick={() => router.push('/pages/channels')}
        className="text-gray-600 hover:text-[#ff5c00] transition-colors text-sm font-medium cursor-pointer"
      >
        Channels
      </button>
    )}
  </div>
  <button
    onClick={user ? handleSignOut : handleLogin}
    className="bg-[#ff5c00] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#ff7c2a] transition-all duration-300 hover:shadow-md"
  >
    {user ? 'Sign Out' : 'Get Started'}
  </button>
</nav>

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
        <motion.button
          onClick={() => scrollToSection("features")}
          className="text-left text-gray-600 hover:text-[#ff5c00] transition-colors py-2 text-sm font-medium"
          variants={itemVariants}
        >
          Features
        </motion.button>
        <motion.button
          onClick={() => scrollToSection("how-it-works")}
          className="text-left text-gray-600 hover:text-[#ff5c00] transition-colors py-2 text-sm font-medium"
          variants={itemVariants}
        >
          How it Works
        </motion.button>
        {user && (
          <motion.button
            onClick={() => router.push('/pages/channels')}
            className="text-left text-gray-600 hover:text-[#ff5c00] transition-colors py-2 text-sm font-medium"
            variants={itemVariants}
          >
            Channels
          </motion.button>
        )}
        <motion.button
          onClick={user ? handleSignOut : handleLogin}
          className="bg-[#ff5c00] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#ff7c2a] transition-all duration-300 w-full"
          variants={itemVariants}
        >
          {user ? 'Sign Out' : 'Get Started'}
        </motion.button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 sm:mt-20">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between py-8 sm:py-16 gap-8 sm:gap-12"
        >
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text font-bold leading-tight">
              Discover Your True YouTube Favorites
            </h1>
            <p className="text-lg sm:text-xl md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Uncover your viewing patterns and find out which channels truly
              capture your attention. Get personalized insights about your
              YouTube journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#ff5c00] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:bg-[#ff7c2a] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started Free
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-300 text-gray-600 font-bold hover:border-[#ff5c00] hover:text-[#ff5c00] transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 w-full px-4 sm:px-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] rounded-lg blur opacity-30"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-20 sm:h-24 bg-gray-100 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          transition={{ delay: 0.4 }}
          id="features"
          className="py-12 sm:py-16 scroll-mt-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text px-4">
            Powerful Features for YouTube Enthusiasts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 p-3 bg-orange-50 rounded-lg w-fit group-hover:bg-orange-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-[#ff5c00] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          transition={{ delay: 0.6 }}
          id="how-it-works"
          className="py-12 sm:py-16 bg-gray-50 rounded-2xl px-4 sm:px-8 scroll-mt-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text">
            Simple Steps to Get Started
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          transition={{ delay: 0.8 }}
          className="py-12 sm:py-16 px-4 sm:px-0"
        >
          <div className="bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] rounded-2xl p-6 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Ready to Discover Your YouTube Journey?
            </h2>
            <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Join thousands of YouTube enthusiasts who have already uncovered
              their viewing patterns and favorite content.
            </p>
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#ff5c00] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.section>
        {/* Footer */}
        <motion.footer
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          transition={{ delay: 1 }}
          className="bg-gray-50 border-t border-gray-100"
        >
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">
                  © {new Date().getFullYear()} WatchWise. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="/pages/terms"
                  className="text-sm text-gray-600 hover:text-[#ff5c00] transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/pages/privacy"
                  className="text-sm text-gray-600 hover:text-[#ff5c00] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/pages/contact"
                  className="text-sm text-gray-600 hover:text-[#ff5c00] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Landing;
