"use client";

import React, { useEffect, useState } from "react";

const productsMenuItems = ["Frames", "Printing", "Albums", "Cup Printing"];

const navItems = [
  { label: "Gallery", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Pricing", href: "#" },
];

function ProductsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 text-base font-medium text-gray-800 hover:text-[#F2CC0F] transition-colors duration-200"
      >
        Products
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          {productsMenuItems.map((item, index) => (
            <li key={index} className="border-b border-gray-100 last:border-b-0">
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#212121] transition-colors duration-150"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setMobileOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            Frame<span className="text-[#F2CC0F]">Studio</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-6">
            <ProductsMenu />

            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="font-medium text-gray-800 hover:text-[#F2CC0F] transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <button
                type="button"
                className="px-6 py-2 font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "#F2CC0F",
                  color: "#212121",
                }}
              >
                Sign Up
              </button>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 py-4 border-t border-gray-200 bg-white rounded-lg shadow-md z-50 animate-fadeIn">
            <ul className="space-y-2">
              <ProductsMenu />

              {navItems.map((item, index) => (
                <li key={index} className="border-b border-gray-100 last:border-b-0">
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:text-[#F2CC0F] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="pt-4">
                <button
                  type="button"
                  className="w-full px-6 py-3 font-medium rounded-full transition-all duration-300 text-center"
                  style={{
                    backgroundColor: "#F2CC0F",
                    color: "#212121",
                  }}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
