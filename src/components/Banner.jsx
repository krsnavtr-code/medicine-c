import React from "react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiMysql,
} from "react-icons/si";

import { motion } from "framer-motion";
import { Button } from "./ui";

const Banner = () => {
  // 🔥 STATIC USER DATA
  const user = {
    image: "/assets/Logo-Ayush-Aushadhi.png",
    role: "Medicine Seller",
    name: "Krishna Avtar",
    description: "Medicine Selling Platform",
    sortDescription: "Medicine Selling Platform",
    experience: "5",
    projects: "20",
    cvPdf: "/assets/cv.pdf",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="max-w-[1650px] mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 mt-16 lg:mt-0">
      {/* LEFT SIDE */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span
          className="inline-block bg-[var(--container-color-in)] text-[var(--text-color)] px-4 py-1 rounded-full text-sm font-medium mb-4"
          variants={itemVariants}
        >
          {user.role}
        </motion.span>

        <motion.h1
          className="text-4xl font-bold mb-4 leading-tight"
          variants={itemVariants}
        >
          {user.description}
        </motion.h1>

        <motion.p
          className="text-lg mb-10 text-[var(--text-color-light)]"
          variants={itemVariants}
        >
          {user.sortDescription}
        </motion.p>

        <motion.div
          className="flex items-center justify-center md:justify-start gap-10 mb-10"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-4xl font-bold">{user.experience}</h2>
            <p className="text-sm text-[var(--text-color-light)]">
              Years of Experience
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">{user.projects}</h2>
            <p className="text-sm text-[var(--text-color-light)]">
              Projects / Contributions
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button as="a" href={user.cvPdf} download variant="secondary">
            View CV
          </Button>
        </motion.div>
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

        {/* Profile Image */}
        <motion.div
          className="relative w-56 lg:w-78 rounded-full z-10"
          variants={itemVariants}
        >
          <motion.img
            src={user.image}
            alt="profile"
            className="relative w-56 lg:w-78 rounded-full z-10"
            variants={itemVariants}
          />

          <motion.h1
            className="text-4xl text-center leading-tight font-bold text-white z-20 mt-4"
            style={{
              textShadow:
                "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6",
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
