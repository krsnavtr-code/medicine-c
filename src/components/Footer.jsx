"use client";

import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Social Links
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 110 2 1 1 0 010-2z" />
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <path d="M8 19c7 0 11-6 11-11v-.5A7.8 7.8 0 0021 5a7.7 7.7 0 01-2.2.6A3.8 3.8 0 0020.4 3a7.7 7.7 0 01-2.4.9A3.8 3.8 0 0011 7.8a10.7 10.7 0 01-7.8-4A3.8 3.8 0 003 8a3.8 3.8 0 01-1.7-.5v.1a3.8 3.8 0 003 3.7 3.8 3.8 0 01-1 .1 3.8 3.8 0 003.6 2.7A7.7 7.7 0 012 17.5a10.7 10.7 0 005.9 1.7" />
      ),
    },
  ];

  // Pages
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop Medicines", href: "/medicines" },
    { name: "Doctors Consultation", href: "/consultation" },
    { name: "Health Packages", href: "/health-packages" },
    { name: "My Orders", href: "/orders" },
  ];

  // Legal Links
  const legalLinks = [
    { name: "Return & Refund", href: "/refund" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Shipping Policy", href: "/shipping" },
  ];

  // Contact
  const contactInfo = [
    { type: "Email", value: "support@medicare.com" },
    { type: "Phone", value: "+91 9000000000" },
    { type: "Address", value: "Noida, Uttar Pradesh, India" },
  ];

  return (
    <footer className="bg-[var(--container-color-in)] text-text-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              MediCart – Online Pharmacy
            </h3>
            <p className="mb-4">
              Your trusted online medicine store. Get 100% genuine medicines,
              health products, and doctor consultations delivered to your
              doorstep.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-text transition-colors"
                  aria-label={item.name}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-text transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="capitalize mr-2">{info.type}:</span>
                  <span>{info.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="mb-4">
              Get updates on offers, health tips, and new medicines.
            </p>

            {isSubscribed ? (
              <div className="bg-green-100 text-green-800 p-3 rounded">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--border-color)]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--button-color)] py-1 px-2 rounded hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-color)] mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {currentYear} MediCart. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm hover:text-[var(--text-color)]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
