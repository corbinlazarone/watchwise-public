"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsOfService() {
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
        Terms of Service
      </h1>

      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Terms</h2>
          <p>
            By accessing Watchwise, you agree to be bound by these terms of
            service and agree that you are responsible for compliance with any
            applicable local laws. If you do not agree with any of these terms,
            you are prohibited from using or accessing Watchwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily access Watchwise for personal,
            non-commercial use. This is the grant of a license, not a transfer
            of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose;</li>
            <li>
              attempt to reverse engineer any software contained on Watchwise;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials;
            </li>
            <li>
              transfer the materials to another person or "mirror" the materials
              on any other server.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. YouTube Data
          </h2>
          <p>
            Watchwise uses the YouTube API Services to provide functionality. By
            using our service, you are also agreeing to be bound by the{" "}
            <a
              href="https://www.youtube.com/t/terms"
              className="text-[#ff5c00] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube Terms of Service
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Disclaimer
          </h2>
          <p>
            The materials on Watchwise are provided on an 'as is' basis.
            Watchwise makes no warranties, expressed or implied, and hereby
            disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Limitations
          </h2>
          <p>
            In no event shall Watchwise or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use Watchwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Revisions and Errata
          </h2>
          <p>
            The materials appearing on Watchwise could include technical,
            typographical, or photographic errors. Watchwise does not warrant
            that any of the materials on its website are accurate, complete, or
            current. Watchwise may make changes to the materials contained on
            its website at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Links</h2>
          <p>
            Watchwise has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Watchwise of the
            site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Terms of Use Modifications
          </h2>
          <p>
            Watchwise may revise these terms of use for its website at any time
            without notice. By using this website you are agreeing to be bound
            by the then current version of these Terms and Conditions of Use.
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
