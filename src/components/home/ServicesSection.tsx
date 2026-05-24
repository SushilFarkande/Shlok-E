"use client";

import { motion } from "framer-motion";
import { Wrench, Wind, Settings, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Service } from "@prisma/client";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Wind,
  Settings,
  ShieldCheck,
};

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-soft-blue/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-blue mb-4">
              Premium Equipment Care
            </h2>
            <p className="text-gray-600">
              Beyond luxury chemicals, we provide expert maintenance and repair services to keep your commercial laundry running flawlessly.
            </p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-royal-blue font-semibold hover:text-navy-blue transition-colors group"
          >
            View All Services
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="min-w-[85vw] md:min-w-0 snap-center mr-6 md:mr-0 group p-8 rounded-3xl border border-gray-100 bg-white hover:bg-navy-blue transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-soft-blue/50 text-royal-blue group-hover:bg-white/10 group-hover:text-luxury-gold transition-colors duration-500">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-3 text-navy-blue group-hover:text-white transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
