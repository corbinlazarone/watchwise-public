import { Metadata } from "next";
import Videos from "../../components/Dashboard/Videos/videos-main";

export const metadata: Metadata = {
    title: "Watchwise | Your Liked Videos",
    description: "Browse and organize all your YouTube liked videos in one place. Filter, sort, and manage your favorite content efficiently.",
    keywords: ["YouTube liked videos", "video organization", "video management", "YouTube favorites", "content library"],
    openGraph: {
        title: "Watchwise | Your Liked Videos",
        description: "Access and manage all your YouTube liked videos in one organized dashboard.",
        type: "website",
        siteName: "Watchwise",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Watchwise | Your Liked Videos",
        description: "Access and manage all your YouTube liked videos in one organized dashboard.",
    },
    robots: {
        index: false, // Protected dashboard page
        follow: false,
        nocache: true,
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
};

export default function page() {
    return <Videos />
}
