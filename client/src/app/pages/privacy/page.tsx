import { Metadata } from "next";
import PrivacyPolicy from "../../components/privacy";

export const metadata: Metadata = {
  title: "Watchwise | Privacy Policy",
  description:
    "Privacy policy and data handling practices for Watchwise YouTube management service",
};

export default function page() {
  return <PrivacyPolicy />;
}
