import { Metadata } from "next";
import Auth from "../../components/Auth/auth";

export const metadata: Metadata = {
  title: "Watchwise | Sign In",
  description: "Sign in to Watchwise to manage your YouTube channels and liked videos. Secure authentication powered by Supabase.",
  keywords: ["login", "sign in", "authentication", "Watchwise account", "YouTube management"],
  openGraph: {
    title: "Watchwise | Sign In",
    description: "Access your Watchwise account to manage your YouTube content.",
    type: "website",
    siteName: "Watchwise",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchwise | Sign In",
    description: "Access your Watchwise account to manage your YouTube content.",
  },
  robots: {
    index: false, // Don't index auth pages
    follow: false, // Don't follow links from auth pages
    nocache: true, // Prevent caching of auth pages
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function page() {
  return <Auth />;
}
