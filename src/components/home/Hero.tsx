"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-soft-blue/20 to-pearl-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-soft-blue/40 blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-royal-blue/10 blur-3xl opacity-60 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white border border-gray-100 shadow-sm">
              <span className="text-sm font-semibold tracking-wider text-royal-blue uppercase">
                Premium Laundry Care
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 text-navy-blue">
              Luxury Laundry <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-luxury-gold">
                Care Redefined
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Premium detergent solutions and industrial laundry chemicals for spotless freshness and professional cleaning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-navy-blue text-white font-medium rounded-full hover:bg-royal-blue shadow-[0_8px_30px_rgb(11,31,77,0.2)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-navy-blue font-medium rounded-full border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Get Distributor Price
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Product Render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[700px] flex justify-center items-center"
          >
            {/* Main Product Image with Float Animation */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-20 w-full max-w-[400px] aspect-[3/4]"
            >
              <Image
                src="/images/product/Ultra premium.jpeg"
                alt="Ultra Premium Detergent"
                fill
                className="object-contain drop-shadow-2xl rounded-2xl"
                priority
              />
            </motion.div>

            {/* Floating Elements (Bubbles/Splashes representation) */}
            <motion.div
              animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute top-[20%] right-[10%] w-16 h-16 bg-white/40 backdrop-blur-md rounded-full shadow-lg z-30"
            />
             <motion.div
              animate={{ y: [0, 40, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[20%] left-[10%] w-24 h-24 bg-soft-blue/50 backdrop-blur-md rounded-full shadow-lg z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
