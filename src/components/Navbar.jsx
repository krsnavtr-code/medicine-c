"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiSettings,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Logo from "assets/Ayush-Aushadhi-Logo-Fit.jpeg";
import ThemeToggle from "./ThemeToggle";
import CartIcon from "./CartIcon";
import { useCart } from '@/contexts/CartContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
   const { totalItems } = useCart();

  // Close mobile menu when authentication state changes
  useEffect(() => {
    setIsOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Store admin after check it if admin
  const isAdmin = user?.role === "admin";

  const navItems = [
    { name: "Admin", path: "/admin", hidden: !isAdmin },
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    // { name: "Health Packages", path: "/health-packages" },
    { name: "Blog", path: "/blog" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--container-color-in)] dark:bg-[var(--container-color-in)] backdrop-blur-md shadow-sm"
          : "bg-[var(--container-color-in)]"
      }`}
    >
      <div className="container mx-auto py-2 px-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src={Logo}
              alt="Logo"
              width={70}
              height={70}
              className="rounded-sm"
            />
            {/* <span>Ayush</span> <br />
            <span style={{ fontSize: "8px" }}>Aushadhi</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-8">
              {navItems.map(
                (item) =>
                  !item.hidden && (
                    <Link
                      key={item.name}
                      href={item.path}
                      className="transition-colors duration-50 font-medium group relative"
                    >
                      {item.name}
                      <span className="absolute left-0 -bottom-[6px] h-[1px] w-0 bg-[var(--logo-bg-color)] transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-[var(--logo-bg-color)] transition-all duration-300 delay-100 group-hover:w-full"></span>
                    </Link>
                  )
              )}
            </nav>

            <Link href="/cart" className="relative p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  {user.photo ? (
                    <Image
                      src={user.photo}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--button-bg-color)] flex items-center justify-center ">
                      <span className="text-[var(--text-color)] font-semibold p-1 bg-[var(--container-color)] rounded-full">
                        {user?.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2) // only first 2 initials
                          : "U"}
                      </span>
                    </div>
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[var(--container-color-in)] rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/me"
                      className="block px-4 py-2 text-sm hover:bg-[var(--container-color)] flex items-center gap-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiUser size={14} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-[var(--container-color)] flex items-center space-x-2 cursor-pointer"
                    >
                      <FiLogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-1 rounded-lg text-sm font-medium border border-gray-400 hover:bg-[var(--container-color)] transition-colors duration-50"
                  >
                    Login
                    <FiLogIn size={16} />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[var(--text-color)] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[var(--container-color-in)] mt-3 pb-4 max-w-[200px] border rounded border-[var(--border-color)] border-[3px] p-2">
          <nav className="flex flex-col space-y-3">
            {navItems.map(
              (item) =>
                !item.hidden && (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block p-2 hover:bg-[var(--container-color-in)] rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
            )}

            <hr className="bg-[var(--logo-bg-color)] h-[1px]" />
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  href="/me"
                  className="block p-2 hover:bg-[var(--container-color-in)] rounded-md transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser size={16} />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center space-x-2"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-max p-2 font-medium text-center rounded-md flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                  <FiLogIn size={16} />
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
