"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Commercial Laundry Owner",
    content: "Switching to Sweep Plus was the best decision for our business. The ultra premium detergent powder cuts through the toughest stains instantly.",
  },
  {
    name: "Sneha Patel",
    role: "Hotel Manager",
    content: "The fabric softener leaves our hotel linens incredibly soft with a long-lasting, luxurious fragrance. Our guests frequently compliment the freshness.",
  },
  {
    name: "Amit Desai",
    role: "Distributor",
    content: "As a distributor, the margins and support from Shlok Enterprises are unmatched. The products practically sell themselves due to their premium quality.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-soft-blue/30 rounded-full blur-3xl pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-blue mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what industry leaders and commercial business owners have to say about our premium products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6 text-luxury-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-heading font-bold text-navy-blue">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
