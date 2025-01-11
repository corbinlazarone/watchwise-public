import { Metadata } from "next";
import Channels from "../../components/Dashboard/Channels/channels-main";

export const metadata: Metadata = {
    title: "Watchwise | Your YouTube Channels",
    description: "View and organize your favorite YouTube channels. See liked videos categorized by channel and stay on top of your content.",
    keywords: ["YouTube channels", "channel management", "content organization", "YouTube playlist", "video management"],
    openGraph: {
        title: "Watchwise | Your YouTube Channels",
        description: "Manage and organize your YouTube channels effectively with Watchwise.",
        type: "website",
        siteName: "Watchwise",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Watchwise | Your YouTube Channels",
        description: "Manage and organize your YouTube channels effectively with Watchwise.",
    },
    robots: {
        index: false, // Since this is a protected dashboard page
        follow: false,
        nocache: true,
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
};

export default function page() {
    return <Channels />
}
