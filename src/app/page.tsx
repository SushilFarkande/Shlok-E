import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import ProductsSection from "@/components/home/ProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import DistributorCTA from "@/components/home/DistributorCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <ProductsSection />
      <ServicesSection />
      <Testimonials />
      <DistributorCTA />
    </>
  );
}
