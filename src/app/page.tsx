import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import ProductsSection from "@/components/home/ProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import DistributorCTA from "@/components/home/DistributorCTA";
import { prisma } from "@/lib/prisma";
import { Product, Service, Banner, Ad } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: Product[] = [];
  let services: Service[] = [];
  let activeBanners: Banner[] = [];
  let activeAds: Ad[] = [];
  let errorState: any = null;

  try {
    products = await prisma.product.findMany({
      take: 3,
      orderBy: { id: 'desc' }
    });

    services = await prisma.service.findMany();

    activeBanners = await prisma.banner.findMany({
      where: { isActive: true }
    });

    activeAds = await prisma.ad.findMany({
      where: { isActive: true }
    });
  } catch (error) {
    console.error("Home page error:", error);
    errorState = error;
  }

  if (errorState) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-pearl-white">
        <div className="glass p-12 rounded-3xl max-w-lg">
          <h1 className="text-3xl font-bold text-navy-blue mb-4">Under Maintenance</h1>
          <p className="text-gray-600 mb-6">We&apos;re currently updating our system to provide a better experience. Please check back shortly.</p>
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-2xl text-left text-xs overflow-auto border border-red-100">
            <strong>Debug Info:</strong> {errorState instanceof Error ? errorState.message : String(errorState)}
          </div>
        </div>
      </div>
    );
  }

  // Serialize data to avoid issues with Date objects being passed to Client Components
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedServices = JSON.parse(JSON.stringify(services));
  const serializedBanners = JSON.parse(JSON.stringify(activeBanners));
  const serializedAds = JSON.parse(JSON.stringify(activeAds));

  const homeHeroBanner = serializedBanners.find((b: any) => b.pageSection === 'home_hero');
  const homeAdBanner = serializedBanners.find((b: any) => b.pageSection === 'home_ad');

  return (
    <>
      <Hero banner={homeHeroBanner} />
      <FeaturesStrip />

      {/* Display Sidebar Ads as full-width blocks on the homepage since there's no traditional sidebar */}     
      {serializedAds.filter((ad: any) => ad.placement === 'sidebar').map((ad: any) => (
        <div key={`ad-${ad.id}`} className="container mx-auto px-6 md:px-12 my-8">
          <a href={ad.link || "#"} target={ad.link ? "_blank" : "_self"} className="block group relative overflow-hidden rounded-3xl shadow-md">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto object-cover max-h-[300px] transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-4 right-4 z-20 bg-white/90 text-xs font-bold px-2 py-1 rounded text-gray-500 uppercase tracking-widest">Advertisement</span>
          </a>
        </div>
      ))}

      <ProductsSection products={serializedProducts} />

      {/* Display Home Ad Banner (From Banners Section) */}
      {homeAdBanner && (
        <div className="container mx-auto px-6 md:px-12 my-8">
          <a href={homeAdBanner.link || "#"} target={homeAdBanner.link ? "_blank" : "_self"}>
            <img src={homeAdBanner.imageUrl} alt="Advertisement" className="w-full h-auto rounded-3xl shadow-md object-cover max-h-[300px]" />
          </a>
        </div>
      )}

      <ServicesSection services={serializedServices} />
      <Testimonials />
      <DistributorCTA />
    </>
  );
}
