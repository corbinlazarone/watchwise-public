import { Metadata } from "next";
import Videos from "../../components/Dashboard/Videos/videos-main";

export const metadata: Metadata = {
    title: "Watchwise | Videos"
}

export default function page() {
    return <Videos />
}