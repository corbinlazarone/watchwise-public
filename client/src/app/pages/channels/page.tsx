import { Metadata } from "next";
import Channels from "../../components/Dashboard/Channels/channels-main";

export const metadata: Metadata = {
    title: "Watchwise | Channels"
}

export default function page() {
    return <Channels />
}