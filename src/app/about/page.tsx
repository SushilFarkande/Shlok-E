"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Shield, Droplets, Target } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Sparkles className="text-luxury-gold" size={24} />,
      title: "Premium Quality Ingredients",
      description: "We source only the highest grade raw materials to formulate our signature cleaning solutions."
    },
    {
      icon: <Droplets className="text-luxury-gold" size={24} />,
      title: "Long Lasting Fragrance",
      description: "Our signature scents are meticulously designed to stay fresh and vibrant for weeks."
    },
    {
      icon: <Shield className="text-luxury-gold" size={24} />,
      title: "Fabric Protection Technology",
      description: "Advanced chemistry ensures tough stain removal while extending the lifespan of your fabrics."
    },
    {
      icon: <Target className="text-luxury-gold" size={24} />,
      title: "Industrial Grade Cleaning Power",
      description: "Trusted by top commercial laundries, hotels, and hospitals for uncompromising performance."
    }
  ];

  return (
    <div className="bg-pearl-white min-h-screen">
      {/* Header */}
      <div className="bg-navy-blue text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
          >
            <span className="text-sm font-semibold tracking-wider uppercase text-luxury-gold">
              Shlok Enterprises
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            The Perfect Blend of Luxury & Performance
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Pioneering the standard for premium laundry care and industrial cleaning chemicals since our inception.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-24">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading font-bold text-navy-blue mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded under the banner of Shlok Enterprises, Sweep Plus was born from a singular vision: to revolutionize the laundry industry by providing luxury-grade chemicals that do not compromise on industrial power.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Based in Pune, our manufacturing facility blends advanced chemical engineering with an unwavering commitment to quality. Every drop of our detergent and every grain of our powder is rigorously tested to ensure it meets the highest standards of cleanliness and fabric care.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we are the trusted partner for countless commercial laundries, hotels, and households who refuse to settle for anything less than perfection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200"
              alt="Premium Laundry Facility"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-navy-blue mb-4">Why Choose Sweep Plus</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The fundamental pillars that make our brand the preferred choice for professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-50 flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-pearl-white rounded-full flex items-center justify-center">
                {value.icon}
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-navy-blue mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
