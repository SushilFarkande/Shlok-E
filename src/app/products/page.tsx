import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    });

    const activeBanners = await prisma.banner.findMany({
      where: {
        isActive: true,
        pageSection: 'products_top'
      }
    });

    const serializedProducts = JSON.parse(JSON.stringify(products));
    const serializedBanners = JSON.parse(JSON.stringify(activeBanners));
    const productsTopBanner = serializedBanners[0] || null;

    return <ProductsClient products={serializedProducts} banner={productsTopBanner} />;
  } catch (error) {
    console.error("Products page error:", error);
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600">We couldn&apos;t load the products right now. Please try again later.</p>
      </div>
    );
  }
}
