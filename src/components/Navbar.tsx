"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-royal-blue rounded-full text-white group-hover:bg-luxury-gold transition-colors duration-300">
             <Droplets size={24} />
          </div>
          <span className="font-heading font-bold text-2xl tracking-wide">
            Sweep Plus
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-royal-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2.5 bg-navy-blue text-white text-sm font-medium rounded-full hover:bg-royal-blue shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Distributor Price
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-navy-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass bg-white/95 border-b border-white/20 shadow-xl py-6 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-royal-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-8 py-3 bg-navy-blue text-white text-md font-medium rounded-full hover:bg-royal-blue transition-all duration-300"
            >
              Get Distributor Price
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
