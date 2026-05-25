import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import ProductsSection from "@/components/home/ProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import DistributorCTA from "@/components/home/DistributorCTA";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { id: 'desc' }
  });

  const services = await prisma.service.findMany();

  const activeBanners = await prisma.banner.findMany({
    where: { isActive: true }
  });
  
  const activeAds = await prisma.ad.findMany({
    where: { isActive: true }
  });

  const homeHeroBanner = activeBanners.find(b => b.pageSection === 'home_hero');
  const homeAdBanner = activeBanners.find(b => b.pageSection === 'home_ad');

  return (
    <>
      <Hero banner={homeHeroBanner} />
      <FeaturesStrip />
      
      {/* Display Sidebar Ads as full-width blocks on the homepage since there's no traditional sidebar */}
      {activeAds.filter(ad => ad.placement === 'sidebar').map(ad => (
        <div key={`ad-${ad.id}`} className="container mx-auto px-6 md:px-12 my-8">
          <a href={ad.link || "#"} target={ad.link ? "_blank" : "_self"} className="block group relative overflow-hidden rounded-3xl shadow-md">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto object-cover max-h-[300px] transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-4 right-4 z-20 bg-white/90 text-xs font-bold px-2 py-1 rounded text-gray-500 uppercase tracking-widest">Advertisement</span>
          </a>
        </div>
      ))}

      <ProductsSection products={products} />
      
      {/* Display Home Ad Banner (From Banners Section) */}
      {homeAdBanner && (
        <div className="container mx-auto px-6 md:px-12 my-8">
          <a href={homeAdBanner.link || "#"} target={homeAdBanner.link ? "_blank" : "_self"}>
            <img src={homeAdBanner.imageUrl} alt="Advertisement" className="w-full h-auto rounded-3xl shadow-md object-cover max-h-[300px]" />
          </a>
        </div>
      )}
      
      <ServicesSection services={services} />
      <Testimonials />
      <DistributorCTA />
    </>
  );
}
