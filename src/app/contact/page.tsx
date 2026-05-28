"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
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
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Whether you&apos;re looking to become a distributor, need industrial services, or have a product inquiry, our team is here to help.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-navy-blue mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-royal-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-navy-blue mb-1">Our Headquarters</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Shlok Enterprises and Manufacturers<br />
                    Gat no 353, Pirangut, Mulshi<br />
                    Pune, Maharashtra 412115
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Shlok+Enterprises+And+Manufacturers/@18.5082158,73.6894944,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bd51ecf27039:0x8fd3c210d47c175f!8m2!3d18.5082158!4d73.6920693!16s%2Fg%2F11zblm0b_9?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-blue hover:underline text-sm font-semibold mt-2 inline-block transition-all hover:gap-1 flex items-center gap-1"
                  >
                    View on Google Maps <span>→</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-royal-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-navy-blue mb-1">Phone</h4>
                  <p className="text-gray-600 leading-relaxed">
                    +91 7821098466<br />
                    +91 7387585242
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-royal-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-navy-blue mb-1">Email</h4>
                  <p className="text-gray-600 leading-relaxed">
                    shlokmanufacturers@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm text-royal-blue">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-navy-blue mb-1">Working Hours</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Available 24/7 for emergency support and inquiries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-heading font-bold text-navy-blue mb-6">Send us a message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all appearance-none">
                  <option>Distributor Inquiry</option>
                  <option>Product Purchase</option>
                  <option>Service & Repair Booking</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-navy-blue text-white font-bold rounded-xl hover:bg-royal-blue transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 h-[500px] w-full rounded-3xl overflow-hidden bg-gray-200 relative shadow-xl border-4 border-white"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15137.77736951578!2d73.6920693!3d18.5082158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bd51ecf27039%3A0x8fd3c210d47c175f!2sShlok%20Enterprises%20And%20Manufacturers!5e0!3m2!1sen!2sin!4v1716913665392!5m2!1sen!2sin" 
            className="absolute inset-0 w-full h-full border-0" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Shlok Enterprises Location"
          ></iframe>
          
          {/* Custom Overlay (Vector and Name) */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-gray-100 hidden md:flex items-center gap-4 max-w-sm">
            <div className="bg-navy-blue p-3 rounded-xl text-white shadow-lg shadow-navy-blue/20">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-navy-blue">Shlok Enterprises</h4>
              <p className="text-xs text-gray-500 mb-2">Pirangut, Mulshi, Pune</p>
              <a 
                href="https://www.google.com/maps/place/Shlok+Enterprises+And+Manufacturers/@18.5082158,73.6894944,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bd51ecf27039:0x8fd3c210d47c175f!8m2!3d18.5082158!4d73.6920693!16s%2Fg%2F11zblm0b_9?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-royal-blue text-white rounded-lg text-xs font-bold hover:bg-navy-blue transition-colors shadow-sm"
              >
                Get Directions <Send size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
