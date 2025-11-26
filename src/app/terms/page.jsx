import React from "react";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold p-4">Terms and Conditions</h1>
        <p className="text-gray-600 p-4">Last updated: October 13, 2025</p>

        {/* 1. Introduction */}
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to our Online Medicine Store (“we”, “our”, “us”). These
            Terms and Conditions outline the rules and regulations for the use
            of our e-commerce platform for purchasing medicines, wellness
            products, and healthcare items.
          </p>
          <p>
            By accessing or using this website, you agree to comply with these
            Terms. If you do not agree, please discontinue using our services.
          </p>
        </section>

        {/* 2. Product & Prescription Policy */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            2. Product & Prescription Policy
          </h2>
          <p className="mb-4">
            Some medicines listed on our website require a valid prescription
            from a certified medical practitioner. You agree to upload a valid
            and clear prescription where required.
          </p>
          <p>
            We reserve the right to verify prescriptions before processing an
            order. Orders may be cancelled if the prescription is invalid,
            unclear, or not genuine.
          </p>
        </section>

        {/* 3. Use License */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
          <p className="mb-4">
            You are granted permission to use the website for personal,
            non-commercial purposes such as browsing, purchasing products, and
            managing your account.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Do not copy or redistribute content</li>
            <li>Do not engage in fraudulent or illegal transactions</li>
            <li>
              Do not attempt to reverse engineer, hack, or disrupt the website
            </li>
          </ul>
        </section>

        {/* 4. Disclaimer */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
          <p className="mb-4">
            All products and information offered on this website are provided on
            an “as is” basis. We do not guarantee that product descriptions,
            images, pricing, or stock availability are error-free.
          </p>
          <p>
            Health-related information provided on the website is for
            informational purposes only and should not replace medical advice
            from a qualified doctor.
          </p>
        </section>

        {/* 5. Limitations */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
          <p>
            We shall not be liable for any direct, indirect, or consequential
            damages resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Incorrect use of medicines</li>
            <li>Delay or failure in delivering products</li>
            <li>Technical issues on the website</li>
            <li>
              Medical emergencies — please contact your doctor immediately in
              case of adverse effects.
            </li>
          </ul>
        </section>

        {/* 6. Revisions */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            6. Revisions and Updates
          </h2>
          <p>
            We may update product details, pricing, stock, or these Terms and
            Conditions at any time without prior notice. By continuing to use
            our website, you agree to the updated Terms.
          </p>
        </section>

        {/* 7. Third-party Links */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
          <p className="mb-4">
            Our website may contain links to third-party websites. We are not
            responsible for the content, privacy practices, or services of those
            websites. Users visit third-party sites at their own risk.
          </p>
        </section>

        {/* 8. Modifications */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
          <p className="mb-4">
            We may revise these Terms & Conditions at any time. Continued use of
            the website means you agree to the modified terms.
          </p>
        </section>

        {/* 9. Governing Law */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes will be
            handled under the jurisdiction of courts located in India.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mt-12 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">
            For any queries regarding these Terms & Conditions, feel free to
            reach out:
          </p>

          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:sales@ayushaushadhi.com"
              className="text-blue-600 font-bold hover:underline"
            >
              sales@ayushaushadhi.com
            </a>
          </p>

          <p>
            Or visit our{" "}
            <Link
              href="/contact"
              className="text-blue-600 font-bold hover:underline"
            >
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
