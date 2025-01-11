import { Metadata } from "next";
import TermsOfService from "../../components/tos";

export const metadata: Metadata = {
  title: "Watchwise | Terms of Service",
  description:
    "Terms and conditions for using Watchwise YouTube management service",
};

export default function page() {
  return <TermsOfService />;
}
