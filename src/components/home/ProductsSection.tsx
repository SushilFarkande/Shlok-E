"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { products } from "@/lib/data";

export default function ProductsSection() {
  return (
    <section className="py-24 bg-pearl-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy-blue mb-4">
            Luxury Products For Every Need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the pinnacle of fabric care with our meticulously formulated detergents and softeners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-royal-blue">
                  {product.category}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-heading font-bold text-lg mb-2 text-navy-blue truncate">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-navy-blue">{product.price}</span>
                  <button className="p-3 bg-pearl-white rounded-full text-navy-blue hover:bg-royal-blue hover:text-white transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy-blue text-navy-blue font-medium rounded-full hover:bg-navy-blue hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
