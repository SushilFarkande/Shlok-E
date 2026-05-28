"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Banner {
  id: number;
  pageSection: string;
  imageUrl: string;
  link: string | null;
  isActive: boolean;
}

export default function Hero({ banner }: { banner?: Banner }) {
  const heroImageSrc = banner?.imageUrl || "/images/home/herro image.jpeg";

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-navy-blue">
                Care Redefined
              </span>
            </h1>
            
            <div className="mb-8 p-5 bg-gradient-to-r from-navy-blue to-royal-blue rounded-2xl inline-block shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10 flex flex-col pr-8">
                
                <span className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-yellow-400 tracking-wider drop-shadow-md">
                  SWEEP PLUS™
                </span>
              </div>
            </div>
            
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
                href="/distributorship"
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
            {/* Main Product Image with subtle float */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative z-20 w-full max-w-[500px] aspect-[3/4]"
            >
              <Image
                src={heroImageSrc}
                alt="Shlok Enterprises Product Range"
                fill
                className="object-contain drop-shadow-2xl rounded-3xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
