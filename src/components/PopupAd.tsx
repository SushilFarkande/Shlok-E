"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Ad {
  id: number;
  title: string;
  imageUrl: string;
  link: string | null;
  placement: string;
}

export default function PopupAd({ ads }: { ads: Ad[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);

  useEffect(() => {
    // Check if there are any active popup ads
    const popupAds = ads.filter((ad) => ad.placement === "popup");
    
    if (popupAds.length > 0) {
      // Check if we've already shown a popup in this session
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      
      if (!hasSeenPopup) {
        // Pick a random popup ad if there are multiple
        const randomAd = popupAds[Math.floor(Math.random() * popupAds.length)];
        setCurrentAd(randomAd);
        
        // Add a slight delay before showing the popup
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [ads]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  const handleAdClick = () => {
    sessionStorage.setItem("hasSeenPopup", "true");
    setIsVisible(false);
  };

  if (!currentAd) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-w-lg w-full"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-gray-800 transition-colors shadow-sm"
              aria-label="Close advertisement"
            >
              <X size={20} />
            </button>
            
            <a 
              href={currentAd.link || "#"} 
              target={currentAd.link ? "_blank" : "_self"}
              onClick={handleAdClick}
              className="block relative aspect-square sm:aspect-[4/3] w-full"
            >
              <Image 
                src={currentAd.imageUrl} 
                alt={currentAd.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-heading font-bold text-xl drop-shadow-md">{currentAd.title}</span>
              </div>
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
