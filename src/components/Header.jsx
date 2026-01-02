"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logoW.png";

const navItems = [
  { label: "Gallery", href: "/gallery" },
  { label: "Store", href: "/store" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setMobileOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-300
        ${
          isHome
            ? scrolled
              ? "bg-black/70 shadow-lg"
              : "bg-transparent"
            : "bg-black shadow-lg"
        }
      `}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-black/40 blur-xl"></div>
          <Image
            src={logo}
            alt="Frame Studio Logo"
            className="relative h-19 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center flex-1 space-x-12">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.href}
                className={`font-semibold text-l uppercase transition-colors duration-200
                  ${
                    scrolled || !isHome
                      ? "text-white hover:text-[#F2CC0F] hover:drop-shadow-[0_0_10px_white]"
                      : "text-white hover:text-[#F2CC0F]"
                  }
                `}
              >
                {item.label}
                <div className="h-1 mt-1 w-0 group-hover:w-full transition-all duration-300 bg-white" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Book Us */}
        <div className="hidden lg:flex">
          <Link
            href="/book-us"
            className="px-6 py-2 text-l uppercase rounded-full transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "#F2CC0F", color: "#212121" }}
          >
            Book Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full py-4 border-t border-gray-200 bg-white shadow-md z-50 animate-fadeIn">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 group"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-lg font-semibold uppercase text-gray-800 hover:text-[#F2CC0F] transition-colors duration-200 relative"
                  >
                    {item.label}
                    <div className="h-0.5 w-0 group-hover:w-full bg-gray-700 transition-all duration-300 absolute bottom-0 left-0" />
                  </Link>
                </li>
              ))}
              <li className="pt-4 px-4">
                <Link
                  href="/book-us"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-6 py-3 text-lg font-semibold uppercase rounded-full transition-all duration-300"
                  style={{ backgroundColor: "#F2CC0F", color: "#212121" }}
                >
                  Book Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
