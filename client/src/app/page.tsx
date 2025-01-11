import React from "react";
import Landing from "./components/landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchwise | Organize Your YouTube Experience",
  description: "Discover and manage your YouTube liked videos and channels more efficiently with Watchwise. A smarter way to organize your YouTube content.",
  keywords: ["YouTube management", "video organization", "YouTube likes", "channel management", "content curation"],
  openGraph: {
    title: "Watchwise | Organize Your YouTube Experience",
    description: "Discover and manage your YouTube liked videos and channels more efficiently with Watchwise.",
    type: "website",
    siteName: "Watchwise",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchwise | Organize Your YouTube Experience",
    description: "Discover and manage your YouTube liked videos and channels more efficiently with Watchwise.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function Page() {
  return <Landing />;
}
