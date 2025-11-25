import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui";

const Banner = () => {
  // 🔥 STATIC WEBSITE DATA
  const user = {
    image: "/assets/Logo-Ayush-Aushadhi.png",
    name: "Ayush Aushadhi",
    tagline: "Your Trusted Online Medicine & Health-Kit Store",
    description:
      "Get genuine medicines, health kits, and wellness essentials delivered right to your doorstep.",
    role: "Health • Wellness • Medicines",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="max-w-[1650px] mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 mt-10 lg:mt-0">
      {/* LEFT SIDE */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Tag */}
        <motion.span
          className="inline-block bg-[var(--container-color-in)] text-[var(--text-color)] px-5 py-1 rounded-full text-sm font-medium mb-4"
          variants={itemVariants}
        >
          {user.role}
        </motion.span>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
          variants={itemVariants}
        >
          {user.tagline}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg mb-10 text-[var(--text-color-light)] max-w-xl"
          variants={itemVariants}
        >
          {user.description}
        </motion.p>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[var(--text-color-light)] mb-10"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl">🚚</span>
            <p className="text-sm mt-1 font-medium">Fast Delivery</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl">💊</span>
            <p className="text-sm mt-1 font-medium">100% Genuine Medicines</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl">📞</span>
            <p className="text-sm mt-1 font-medium">24×7 Customer Support</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants}>
          <Button
            as="a"
            href="/shop"
            variant="default"
            className="px-6 py-3 font-semibold text-lg"
          >
            Shop Now
          </Button>
        </motion.div>

        {/* Trust Badge */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-sm text-[var(--text-color-light)]"
        >
          ✔ Trusted by 10,000+ Customers Across India
        </motion.p>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="hidden lg:flex flex-1 mt-16 lg:mt-0 relative justify-center items-center"
        style={{ minWidth: "500px", maxWidth: "501px" }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Circle */}
        <div className="w-64 h-64 lg:w-80 lg:h-80 bg-[var(--logo-bg-color)] rounded-full absolute"></div>

        {/* Profile / Logo Image */}
        <motion.div
          className="relative w-56 lg:w-80 rounded-full z-10"
          variants={itemVariants}
        >
          <motion.img
            src={user.image}
            alt="Ayush Aushadhi Logo"
            className="relative w-56 lg:w-80 rounded-full z-10"
            variants={itemVariants}
          />

          <motion.h1
            className="text-4xl text-center leading-tight font-bold text-white z-20 mt-4"
            style={{
              textShadow:
                "0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px #4ade80",
            }}
            variants={itemVariants}
          >
            {user.name}
          </motion.h1>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
