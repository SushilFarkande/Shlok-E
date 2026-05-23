"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, Send } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, totalItems } = useCart();

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "91XXXXXXXXXX"; // Replace with real number
    let message = "Hello Shlok Enterprises, I would like to order:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Quantity: ${item.quantity}\n`;
    });

    message += `\nTotal Items: ${totalItems}\n`;
    message += "\nPlease provide me with the pricing and delivery details.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-navy-blue text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-luxury-gold" />
                <h2 className="text-xl font-heading font-bold">Your Cart</h2>
                <span className="bg-royal-blue text-xs font-bold px-2.5 py-1 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-6 bg-pearl-white rounded-full">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-blue">Your cart is empty</h3>
                    <p className="text-gray-500">Add some luxury products to get started.</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-pearl-white rounded-2xl overflow-hidden flex-shrink-0 p-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-navy-blue leading-tight pr-4">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-navy-blue transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-navy-blue transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-royal-blue text-sm">
                          {item.price === "Ask for Price" ? "Enquiry Item" : item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-pearl-white/50 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-bold text-navy-blue">{totalItems}</span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all active:scale-95"
                >
                  <Send size={20} />
                  Checkout on WhatsApp
                </button>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Secure WhatsApp Ordering
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
