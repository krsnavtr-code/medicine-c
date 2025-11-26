import React from "react";

const ReturnRefundPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold p-4">Return & Refund Policy</h1>
        <p className="text-gray-600 p-4">Last updated: November 26, 2025</p>

        {/* 1. Introduction */}
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At our Online Medicine Store, we strive to ensure your complete
            satisfaction with every purchase. This Return & Refund Policy
            outlines the terms and conditions for returning products and
            requesting refunds.
          </p>
          <p>
            Please read this policy carefully before making a purchase or
            requesting a return.
          </p>
        </section>

        {/* 2. Return Eligibility */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">2. Return Eligibility</h2>
          <p className="mb-4">
            Due to the sensitive nature of pharmaceutical products, we can only
            accept returns under the following conditions:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Damaged or defective products received</li>
            <li>Incorrect product delivered</li>
            <li>
              Expired products (if received close to or past expiration date)
            </li>
          </ul>
          <p>
            For hygiene and safety reasons, we cannot accept returns of opened
            or used products unless they are defective.
          </p>
        </section>

        {/* 3. Return Process */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
          <p className="mb-4">To initiate a return:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              Contact our customer support within 7 days of receiving your order
            </li>
            <li>Provide your order number and details of the issue</li>
            <li>
              Our team will verify the issue and provide return instructions if
              eligible
            </li>
            <li>
              Package the product securely with all original packaging and
              labels
            </li>
            <li>
              Ship the product back using the provided return shipping label
            </li>
          </ol>
        </section>

        {/* 4. Refund Policy */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
          <p className="mb-4">
            Once we receive and inspect the returned product, we will process
            your refund within 5-7 business days. The refund will be issued to
            your original payment method.
          </p>
          <p className="font-semibold mb-2">Refund Amounts:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Full refund for defective, damaged, or incorrect products</li>
            <li>
              Original shipping fees are non-refundable unless the return is due
              to our error
            </li>
            <li>
              Return shipping costs will be covered by us for eligible returns
            </li>
          </ul>
        </section>

        {/* 5. Non-Returnable Items */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            5. Non-Returnable Items
          </h2>
          <p>The following items are not eligible for return or refund:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Opened or used products (unless defective)</li>
            <li>Products without original packaging</li>
            <li>
              Temperature-sensitive medications that require refrigeration
            </li>
            <li>Personal care items and cosmetics</li>
            <li>Items marked as final sale or clearance</li>
          </ul>
        </section>

        {/* 6. Contact Us */}
        <section className="bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">6. Need Help?</h2>
          <p className="mb-4">
            If you have any questions about our Return & Refund Policy, please
            contact our customer support team:
          </p>
          <p className="mb-2">Email: sales@ayushaushadhi.com</p>
          <p>Phone: +91 9319978460</p>
          <p className="mt-4 text-sm text-gray-500">
            Our customer service team is available Monday to Friday, 9:00 AM to
            6:00 PM EST.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnRefundPage;
