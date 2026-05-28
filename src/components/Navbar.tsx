"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Droplets, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

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
          <div className="relative w-32 md:w-40 h-10 md:h-12 flex-shrink-0">
            <Image 
              src="/images/home/logo.png" 
              alt="Shlok Enterprises Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
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
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-navy-blue hover:text-royal-blue transition-colors"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-royal-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href="/distributorship"
            className="ml-4 px-6 py-2.5 bg-navy-blue text-white text-sm font-medium rounded-full hover:bg-royal-blue shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Distributor Price
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-navy-blue"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-royal-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
          
          <button
            className="text-navy-blue"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
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
              href="/distributorship"
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
