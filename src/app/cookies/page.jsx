import React from "react";

const CookiePolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold p-4">Cookie Policy</h1>
        <p className="text-gray-600 p-4">Last updated: October 17, 2025</p>

        {/* 1. Introduction */}
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            This Cookie Policy explains how our Online Pharmacy ("we," "us," or
            "our") uses cookies and similar tracking technologies to provide a
            secure, personalized, and reliable shopping experience for medicines
            and healthcare products. By using our platform, you agree to the use
            of cookies as described in this policy.
          </p>
        </section>

        {/* 2. What Are Cookies */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files stored on your device when you visit a
            website. They help the website function properly, improve
            performance, enhance user experience, and remember your preferences
            such as cart items, login sessions, and browsing activity.
          </p>
          <p>
            Cookies may be "persistent" (stored until you delete them) or
            "session" cookies (deleted when you close your browser).
          </p>
        </section>

        {/* 3. How We Use Cookies */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
          <p className="mb-4">
            We use cookies on our Online Pharmacy for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Required for basic functions
              like adding items to cart, secure login, and protecting your
              account.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Help us track website
              performance, loading speed, and user activity to improve your
              shopping experience.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Remember your preferences
              such as saved addresses, recently viewed medicines, and user
              settings.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Allow us to analyze website
              usage and most visited pages to improve our services and content.
            </li>
            <li>
              <strong>Advertising & Retargeting Cookies:</strong> Used to show
              relevant medicine offers, health product discounts, and
              personalized ads.
            </li>
          </ul>
        </section>

        {/* 4. Third-Party Cookies */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            4. Third-Party Cookies
          </h2>
          <p className="mb-4">
            We may use third-party services such as analytics providers, payment
            gateways, and advertising networks. These partners may set their own
            cookies to deliver secure payments, analyze traffic, and show
            relevant health-related promotions.
          </p>
        </section>

        {/* 5. Your Choices */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            5. Your Choices Regarding Cookies
          </h2>
          <p className="mb-4">
            You can control or disable cookies through your browser settings.
            However, disabling certain cookies may limit your ability to use
            essential features like logging in, managing prescriptions, or
            completing purchases.
          </p>
          <p className="mb-4">
            Most browsers automatically accept cookies, but you can modify
            settings through the “Help” or “Settings” section of your browser.
          </p>
        </section>

        {/* 6. Updates */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            6. Changes to This Cookie Policy
          </h2>
          <p>
            We may update this Cookie Policy periodically to reflect changes in
            our practices or legal requirements. When we make updates, we will
            revise the "Last Updated" date at the top of this page.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-12 pt-6 border-t border-gray-200 p-4">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">
            If you have any questions regarding our Cookie Policy or how we use
            cookies on our online pharmacy website, feel free to contact us:
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
        </section>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
