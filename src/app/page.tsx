import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import ProductsSection from "@/components/home/ProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import DistributorCTA from "@/components/home/DistributorCTA";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
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
  } catch (error) {
    console.error("Home page error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-blue mb-4">Under Maintenance</h1>
          <p className="text-gray-600">We&apos;re currently updating our system. Please try again in a few minutes.</p>
          {process.env.NODE_ENV !== 'production' && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-left text-xs overflow-auto max-w-full">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
