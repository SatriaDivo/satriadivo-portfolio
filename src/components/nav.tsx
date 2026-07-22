"use client";

import { useEffect, useState } from "react";
import { siteMetadata } from "@/data/metadata";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#resume", label: "Resume" },
  { href: "#proyek", label: "Proyek" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm py-2"
          : "bg-white/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo/Name */}
        <a
          href="#"
          className="text-lg font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition-colors flex items-center"
        >
          <span>{siteMetadata.name}</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full rounded-full"></span>
            </a>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative items-center group">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="bg-gray-100/70 border border-transparent text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-100/50 transition-all w-48 focus:w-64" 
            />
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors py-2 border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="relative mt-2 sm:hidden">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="bg-gray-100 w-full border border-transparent text-sm rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-100/50 transition-all" 
            />
          </div>
        </div>
      )}
    </nav>
  );
}
