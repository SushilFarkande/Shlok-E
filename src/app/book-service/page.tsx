"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, MessageSquare, Send } from "lucide-react";

function BookServiceForm() {
  const searchParams = useSearchParams();
  const serviceRequired = searchParams.get("service") || "General Service";

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    datetime: "",
    issue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Sweep Plus Team,

I would like to book a service.

*Service Required:* ${serviceRequired}

Here are my details:
- *Name:* ${formData.name}
- *Location/City:* ${formData.location}
- *Preferred Date/Time:* ${formData.datetime}
- *Issue Description:* ${formData.issue}

Please let me know your availability. Thank you!`;
    
    const url = `https://wa.me/917821098466?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-pearl-white">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-soft-blue/20 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-royal-blue/10 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy-blue mb-6">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-luxury-gold">Service</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Fill out your details below for the <strong>{serviceRequired}</strong>. You will be redirected to WhatsApp to send your request directly to our team.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden"
          >
            {/* Form decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-soft-blue/30 to-royal-blue/10 rounded-bl-full -z-10" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-blue mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-royal-blue transition-all outline-none"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-navy-blue mb-2">
                  Location / City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-royal-blue transition-all outline-none"
                    placeholder="Your City or Address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="datetime" className="block text-sm font-medium text-navy-blue mb-2">
                  Preferred Date & Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="text"
                    id="datetime"
                    name="datetime"
                    value={formData.datetime}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-royal-blue transition-all outline-none"
                    placeholder="e.g., Tomorrow morning or 15th Aug, 2 PM"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-navy-blue mb-2">
                  Issue Description
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-4 pointer-events-none text-gray-400">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royal-blue focus:border-royal-blue transition-all outline-none resize-none"
                    placeholder="Briefly describe what needs to be serviced..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1DA851] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Request on WhatsApp
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function BookServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookServiceForm />
    </Suspense>
  );
}
