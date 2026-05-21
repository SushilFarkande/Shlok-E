"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { Wrench, Wind, Settings, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Wind,
  Settings,
  ShieldCheck,
};

export default function ServicesPage() {
  return (
    <div className="bg-pearl-white min-h-screen">
      {/* Header */}
      <div className="bg-navy-blue text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-navy-blue pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            Premium Equipment Care
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            We offer expert maintenance, repair, and installation services to keep your commercial and home laundry machines running flawlessly.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-4 bg-soft-blue/30 inline-flex rounded-2xl text-royal-blue mb-6">
                  <Icon size={40} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy-blue mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Fast response time",
                    "Certified technicians",
                    "Premium replacement parts",
                    "Satisfaction guaranteed"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-luxury-gold" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-block w-full text-center px-6 py-3 bg-pearl-white text-navy-blue font-medium rounded-full hover:bg-navy-blue hover:text-white transition-all duration-300"
                >
                  Book Service
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Support Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 max-w-4xl mx-auto bg-gradient-to-r from-navy-blue to-royal-blue rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=1200')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Need immediate assistance?
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Our support team is available 24/7 to handle your emergency repair needs and minimize downtime.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-luxury-gold text-white font-bold rounded-full hover:bg-white hover:text-navy-blue transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Support Team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
