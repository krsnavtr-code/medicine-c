'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCode, FaLaptopCode, FaGraduationCap, FaTools } from 'react-icons/fa';

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const whatWeProvide = [
    "Genuine Medicines at Best Price",
    "24/7 Online Medicine Ordering",
    "Express Home Delivery",
    "Doctor Prescription Upload",
    "Certified & Licensed Pharmacy",
    "Over-the-Counter (OTC) Products",
    "Health & Wellness Supplements",
    "Baby Care & Personal Care Products",
    "Diabetes, Heart & BP Medicines",
    "Secure Online Payment & Cash on Delivery",
  ];


  const whatWeAre = [
    {
      role: "Trusted Online Pharmacy",
      company: "YourHealth Pharmacy",
      duration: "Serving Since 2020",
      description:
        "Providing authentic medicines and wellness products with a focus on safety, affordability, and fast delivery.",
    },
    {
      role: "Customer-Focused Healthcare Platform",
      company: "YourHealth Marketplace",
      duration: "4+ Years",
      description:
        "Ensuring hassle-free medicine ordering, expert support, and complete transparency in the healthcare shopping experience.",
    },
  ];


  const whatWeDo = [
    {
      degree: "Ensuring Medicine Authenticity",
      institution: "Licensed & Verified Suppliers",
      year: "100% Genuine Products Guarantee",
    },
    {
      degree: "Making Healthcare Accessible",
      institution: "Online Consultation & Easy Ordering",
      year: "Delivering to 25,000+ Pin Codes",
    },
  ];


  return (
    <div className="min-h-screen bg-[var(--container-color)] text-[var(--text-color)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A trusted online pharmacy committed to delivering genuine medicines,
            fast service, and accessible healthcare at your doorstep.
          </p>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="mb-6">
              We are a certified and customer-first online pharmacy dedicated to
              making healthcare simple, affordable, and accessible for everyone.
              From essential medicines to wellness products, we provide a
              reliable platform where you can order everything you need with
              complete trust and transparency.
            </p>
            <p>
              Our mission is to ensure safe and genuine medicines, fast doorstep
              delivery, verified products, and a seamless shopping experience —
              because your health deserves the best care.
            </p>
          </div>

          <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with your actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span>Pharmacy Image</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center mb-8">
            <FaTools className="text-[var(--text-color)] text-2xl mr-3" />
            <h2 className="text-2xl font-semibold">Services & Features</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {whatWeProvide.map((skill, index) => (
              <div
                key={index}
                className="bg-[var(--container-color-in)] p-4 rounded-lg shadow-sm border border-[var(--container-color)] hover:shadow-md transition-shadow"
              >
                <p className="text-[var(--text-color)]">{skill}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-12">
          {/* What We Are Section */}
          <motion.section initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex items-center mb-8">
              <FaLaptopCode className="text-[var(--text-color)] text-2xl mr-3" />
              <h2 className="text-2xl font-semibold">What We Are</h2>
            </div>
            <div className="space-y-8">
              {whatWeAre.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-[var(--container-color)]"
                >
                  <div className="absolute -left-2 w-4 h-4 bg-[var(--container-color)] rounded-full"></div>
                  <h3 className="text-xl font-medium">{exp.role}</h3>
                  <p className="text-[var(--text-color)] font-medium">
                    {exp.company}
                  </p>
                  <p className="text-[var(--text-color-light)] text-sm mb-2">{exp.duration}</p>
                  <p className="text-[var(--text-color-light)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* What We Do Section */}
          <motion.section initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex items-center mb-8">
              <FaGraduationCap className="text-[var(--text-color)] text-2xl mr-3" />
              <h2 className="text-2xl font-semibold">What We Do</h2>
            </div>
            <div className="space-y-8">
              {whatWeDo.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-[var(--container-color)]"
                >
                  <div className="absolute -left-2 w-4 h-4 bg-[var(--container-color)] rounded-full"></div>
                  <h3 className="text-xl font-medium">{edu.degree}</h3>
                  <p className="text-[var(--text-color)] font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-[var(--text-color-light)]">{edu.year}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;