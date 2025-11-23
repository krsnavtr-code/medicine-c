import React from "react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold p-4">Privacy Policy</h1>
        <p className="text-gray-600 p-4">Last updated: October 13, 2025</p>

        {/* INTRODUCTION */}
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At Profacenal, we respect your privacy and are committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website.
          </p>
        </section>

        {/* INFORMATION WE COLLECT */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect, use, store, and process different kinds of personal
            data, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Identity Data</strong> — name, username, etc.
            </li>
            <li>
              <strong>Contact Data</strong> — email address, phone number.
            </li>
            <li>
              <strong>Technical Data</strong> — IP address, browser details,
              time zone, device information.
            </li>
            <li>
              <strong>Usage Data</strong> — how you use our website and
              services.
            </li>
            <li>
              <strong>Marketing Data</strong> — preferences and communication
              choices.
            </li>
          </ul>
        </section>

        {/* HOW WE USE DATA */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Data
          </h2>
          <p className="mb-4">
            We use your information only when allowed by law, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Providing and maintaining the service</li>
            <li>Notifying you about changes</li>
            <li>Allowing participation in site features</li>
            <li>Customer support</li>
            <li>Improving website performance</li>
            <li>Monitoring usage</li>
            <li>Detecting and preventing technical issues</li>
          </ul>
        </section>

        {/* DATA SECURITY */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement strict security measures to prevent your personal data
            from unauthorized access, alteration, or loss. Access to your data
            is limited to authorized personnel only.
          </p>
        </section>

        {/* RETENTION */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary for legal,
            operational, and reporting purposes. Retention duration depends on
            the nature and sensitivity of the data.
          </p>
        </section>

        {/* RIGHTS */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">6. Your Legal Rights</h2>
          <p className="mb-4">
            You have rights under data protection laws, including the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access</li>
            <li>Request correction</li>
            <li>Request deletion</li>
            <li>Object to processing</li>
            <li>Restrict processing</li>
            <li>Request data transfer</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        {/* THIRD-PARTY LINKS */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
          <p className="mb-4">
            Our website may contain links to third-party sites. These websites
            have their own privacy policies, and we are not responsible for
            their content or practices. Please review their policies before use.
          </p>
        </section>

        {/* CHANGES */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with a revised “Last updated” date.
          </p>
        </section>

        {/* CONTACT */}
        <section className="mt-12 pt-6 border-t border-gray-200 p-4">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">
            For any questions or concerns regarding this Privacy Policy, contact
            us at:
          </p>

          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:demo.demo.com"
              className="text-blue-600 font-bold hover:underline"
            >
              demo.demo.com
            </a>
          </p>

          <p>
            Or visit our{" "}
            <Link
              href="/contact"
              className="text-blue-600 font-bold hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
