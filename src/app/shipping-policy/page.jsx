import React from "react";

const ShippingPolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold p-4">Shipping Policy</h1>
        <p className="text-gray-600 p-4">Last updated: November 26, 2025</p>

        {/* 1. Introduction */}
        <section className="p-4">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At our Online Medicine Store, we are committed to delivering your
            healthcare products safely and efficiently. This Shipping Policy
            outlines our delivery procedures, shipping times, and related
            information.
          </p>
        </section>

        {/* 2. Shipping Areas */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">2. Shipping Areas</h2>
          <p className="mb-4">
            We currently ship to all major cities and towns across India. Our
            standard shipping covers:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>All major cities and towns in India</li>
            <li>Serviceable pin codes as per our courier partners</li>
            <li>Some remote locations may have extended delivery times</li>
          </ul>
          <p>
            For international shipping inquiries, please contact our customer
            support.
          </p>
        </section>

        {/* 3. Shipping Methods & Delivery Times */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            3. Shipping Methods & Delivery Times
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Service Type</th>
                  <th className="py-2 px-4 border-b text-left">
                    Delivery Time
                  </th>
                  <th className="py-2 px-4 border-b text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Standard Shipping</td>
                  <td className="py-2 px-4 border-b">3-7 business days</td>
                  <td className="py-2 px-4 border-b">
                    Free on orders above ₹499
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Express Shipping</td>
                  <td className="py-2 px-4 border-b">1-3 business days</td>
                  <td className="py-2 px-4 border-b">₹99</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Same Day Delivery*</td>
                  <td className="py-2 px-4 border-b">Within 6 hours</td>
                  <td className="py-2 px-4 border-b">₹149</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            *Available in select cities and for orders placed before 2 PM
          </p>
        </section>

        {/* 4. Order Processing */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">4. Order Processing</h2>
          <p className="mb-4">
            We process orders within 24-48 hours of receiving them. Orders
            placed on weekends or public holidays will be processed the next
            business day.
          </p>
          <p className="font-semibold mb-2">Please note:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Prescription orders require verification and may take additional
              time
            </li>
            <li>Delivery times are estimates and not guaranteed</li>
            <li>
              Some items may be shipped separately if they have different
              availability
            </li>
          </ul>
        </section>

        {/* 5. Order Tracking */}
        <section className="mb-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">5. Order Tracking</h2>
          <p className="mb-4">
            Once your order is shipped, you will receive a confirmation email
            with tracking information. You can track your order using the
            following methods:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Click the tracking link in your shipping confirmation email</li>
            <li>Log in to your account and check 'My Orders'</li>
            <li>Contact our customer support with your order number</li>
          </ul>
        </section>

        {/* 6. Shipping Restrictions */}
        <section className="mb-8 bg-[var(--container-color-in)] p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            6. Shipping Restrictions
          </h2>
          <p className="mb-4">
            Certain products may have shipping restrictions due to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Temperature control requirements (refrigerated items)</li>
            <li>Legal restrictions in certain areas</li>
            <li>Fragile or hazardous materials</li>
            <li>High-value items requiring signature on delivery</li>
          </ul>
          <p>
            For restricted items, we will contact you to discuss alternative
            arrangements.
          </p>
        </section>

        {/* 7. Contact Us */}
        <section className="p-4 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">7. Need Help?</h2>
          <p className="mb-4">
            For any shipping-related inquiries, please contact our customer
            support:
          </p>
          <p className="mb-2">Email: sales@ayushaushadhi.com</p>
          <p>Phone: +91 9319978460</p>
          <p className="mt-4 text-sm text-gray-500">
            Our customer service team is available Monday to Saturday, 10:00 AM
            to 6:00 PM IST.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
