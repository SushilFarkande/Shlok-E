import Link from "next/link";
import { Droplets, MapPin, Phone, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const footerAds = await prisma.ad.findMany({
    where: { isActive: true, placement: 'footer' }
  });

  return (
    <footer className="bg-white pt-10 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Ads */}
        {footerAds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {footerAds.map(ad => (
              <a key={ad.id} href={ad.link || "#"} target={ad.link ? "_blank" : "_self"} className="block group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">{ad.title}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 mt-10">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-2 bg-royal-blue rounded-full text-white group-hover:bg-luxury-gold transition-colors duration-300">
                <Droplets size={20} />
              </div>
              <span className="font-heading font-bold text-xl tracking-wide">
                Sweep Plus
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium detergent solutions and industrial laundry chemicals for spotless freshness and professional cleaning.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-pearl-white flex items-center justify-center text-navy-blue hover:bg-royal-blue hover:text-white transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/_sushil_0807?igsh=Ym15aHZ6Z2V1dHZs" target="_blank" className="w-10 h-10 rounded-full bg-pearl-white flex items-center justify-center text-navy-blue hover:bg-royal-blue hover:text-white transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pearl-white flex items-center justify-center text-navy-blue hover:bg-royal-blue hover:text-white transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Products', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 text-sm hover:text-royal-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="text-royal-blue shrink-0 mt-1" size={20} />
                <span className="text-gray-500 text-sm leading-relaxed">
                  Shlok Enterprises and Manufacturers<br />
                  Gat no 353, Pirangut, Mulshi, Pune 412115
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-royal-blue shrink-0" size={20} />
                <span className="text-gray-500 text-sm">
                  +91 7821098466 / +91 7387585242
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-royal-blue shrink-0" size={20} />
                <span className="text-gray-500 text-sm">
                  shlokmanufacturers@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Shlok Enterprises and Manufacturer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-royal-blue transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-royal-blue transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
