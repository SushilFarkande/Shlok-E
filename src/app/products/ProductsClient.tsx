"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useCart } from "@/lib/CartContext";
import { Product, Banner } from "@prisma/client";

interface ProductsClientProps {
  products: Product[];
  banner?: Banner | null;
}

export default function ProductsClient({
  products,
  banner,
}: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useCart();

  // Predefined categories
  const predefinedCategories = [
    "Detergents",
    "Softeners",
    "Chemicals",
    "Accessories",
  ];

  // Merge database categories with predefined categories
  const rawCategories = Array.from(
    new Set([
      ...predefinedCategories,
      ...products.map((p) => p.category),
    ])
  );

  // Sort categories
  rawCategories.sort((a, b) => {
    const getScore = (cat: string) => {
      const lower = cat.toLowerCase();

      if (lower.includes("detergent")) return 1;
      if (lower.includes("softner") || lower.includes("softener")) return 2;
      if (lower.includes("chemical")) return 3;
      if (lower.includes("accessori")) return 4;

      return 5;
    };

    return getScore(a) - getScore(b);
  });

  const categories = ["All", ...rawCategories];

  // Filter categories to display
  const categoriesToDisplay =
    activeCategory === "All"
      ? categories.filter((c) => c !== "All")
      : [activeCategory];

  // Group products by category
  const groupedProducts = useMemo(() => {
    return categoriesToDisplay.reduce((acc, cat) => {
      const filteredProducts = products.filter(
        (product) =>
          product.category === cat &&
          product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );

      if (filteredProducts.length > 0) {
        acc[cat] = filteredProducts;
      }

      return acc;
    }, {} as Record<string, Product[]>);
  }, [categoriesToDisplay, products, searchQuery]);

  // Total visible products
  const totalResults = Object.values(groupedProducts).reduce(
    (sum, list) => sum + list.length,
    0
  );

  // Banner background image
  const headerBgImage =
    banner?.imageUrl ||
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="bg-pearl-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-navy-blue text-white py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url('${headerBgImage}')`,
          }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            Our Luxury Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Explore our complete range of premium detergents,
            softeners, and industrial laundry chemicals.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-royal-blue text-white shadow-md"
                    : "bg-white text-navy-blue border border-gray-200 hover:border-royal-blue"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 transition-all bg-white"
            />
          </div>
        </div>

        {/* Products by Category */}
        <div className="space-y-20">
          {Object.entries(groupedProducts).map(
            ([category, categoryProducts]) => (
              <div key={category}>
                {/* Category Header */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy-blue mb-2">
                      {category}
                    </h2>

                    <div className="h-1 w-20 bg-royal-blue rounded-full" />
                  </div>

                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {categoryProducts.length} Items
                  </span>
                </div>

                {/* Product Cards */}
                <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6 snap-x snap-mandatory scroll-smooth">
                  {categoryProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                      }}
                      className="flex-shrink-0 w-[280px] md:w-[350px] bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full snap-start border border-gray-50"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-6">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 280px, 350px"
                            priority={index < 2}
                          />
                        </motion.div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-heading font-bold text-lg mb-2 text-navy-blue line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          {/* Price / WhatsApp */}
                          <button
                            onClick={() => {
                              const text = `Hello Shlok Enterprises, I'm interested in the product: *${product.name}*. Please provide more details and pricing.`;

                              window.open(
                                `https://wa.me/917821098466?text=${encodeURIComponent(
                                  text
                                )}`,
                                "_blank"
                              );
                            }}
                            className="text-sm font-bold text-royal-blue hover:text-navy-blue transition-colors"
                          >
                            Ask for Price
                          </button>

                          {/* Add to Cart */}
                          <button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                category: product.category,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                              })
                            }
                            className="p-3 bg-pearl-white rounded-full text-navy-blue hover:bg-royal-blue hover:text-white transition-colors"
                          >
                            <ShoppingCart size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Empty State */}
        {totalResults === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-heading text-navy-blue mb-2">
              No products found
            </h3>

            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}