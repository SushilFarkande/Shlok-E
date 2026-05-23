"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Droplets, Droplet } from "lucide-react";

export default function FeaturesStrip() {
  const features = [
    {
      icon: <Sparkles className="text-luxury-gold" size={32} />,
      title: "Premium Ingredients",
      description: "Highest quality raw materials for professional results."
    },
    {
      icon: <Droplets className="text-luxury-gold" size={32} />,
      title: "Long Lasting Fragrance",
      description: "Signature scents that stay fresh for weeks."
    },
    {
      icon: <Shield className="text-luxury-gold" size={32} />,
      title: "Fabric Protection",
      description: "Advanced formula preserves colors and fabric life."
    },
    {
      icon: <Droplet className="text-luxury-gold" size={32} />,
      title: "Powerful Stain Removal",
      description: "Tough on industrial stains, gentle on clothes."
    }
  ];

  return (
    <section className="relative -mt-16 z-20 container mx-auto px-6 md:px-12">
      <div className="flex overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:pb-0 lg:mx-0 lg:px-0 scrollbar-hide">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[75vw] md:min-w-[40vw] lg:min-w-0 snap-center mr-4 lg:mr-0 glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="mb-4 p-4 bg-pearl-white/50 rounded-full inline-block">
              {feature.icon}
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-navy-blue">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
