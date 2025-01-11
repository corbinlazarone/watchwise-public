"use client";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Watchwise | Privacy Policy",
  description:
    "Privacy policy and data handling practices for Watchwise YouTube management service",
};

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#ff5c00] transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Back</span>
      </button>
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#ff0c0c] to-[#ff5c00] text-transparent bg-clip-text">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you use Watchwise, we collect certain information about you and
            your YouTube activity:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              Basic profile information (name, email) from your authentication
              provider
            </li>
            <li>YouTube channel subscriptions</li>
            <li>Liked videos data</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Providing our core service features</li>
            <li>Analyzing and organizing your YouTube engagement</li>
            <li>Improving our services</li>
            <li>Communication about service updates</li>
            <li>Technical service administration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Data Storage and Security
          </h2>
          <p>
            We use Supabase for secure data storage and authentication. All data
            is encrypted in transit and at rest. We implement appropriate
            security measures to protect against unauthorized access,
            alteration, disclosure, or destruction of your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. YouTube API Services
          </h2>
          <p>
            Watchwise uses the YouTube API Services. By using our service, you
            are agreeing to be bound by the{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-[#ff5c00] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Data Retention
          </h2>
          <p>
            We retain your information only for as long as necessary to provide
            you with our services and as described in this privacy policy. We
            will also retain and use your information as necessary to comply
            with our legal obligations, resolve disputes, and enforce our
            agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
            <li>Opt-out of communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Third-Party Services
          </h2>
          <p>We use third-party services for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Authentication (Supabase)</li>
            <li>Data Storage (Supabase)</li>
            <li>YouTube API Services</li>
          </ul>
          <p className="mt-2">
            Each third-party service has its own privacy policy governing how
            they handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us through our contact form.
          </p>
        </section>

        <section className="pt-6">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
}
