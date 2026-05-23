"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DistributorCTA() {
  return (
    <section className="py-24 bg-pearl-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-navy-blue text-white shadow-2xl"
        >
          {/* Background Gradient & Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royal-blue/40 via-navy-blue to-navy-blue opacity-80" />
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Become a Premium Distributor
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Join our exclusive network of distributors and grow your business with a trusted, high-performance laundry brand. Benefit from competitive margins and premium support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/distributorship"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-blue font-bold rounded-full hover:bg-luxury-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-luxury-gold/50"
                >
                  Get Distributor Price
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Optional Graphic / Abstract Element */}
            <div className="hidden lg:flex relative w-64 h-64 items-center justify-center">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 bg-gradient-to-br from-royal-blue to-luxury-gold rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
