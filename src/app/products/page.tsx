import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";
import { Product, Banner } from "@prisma/client";

export const revalidate = 60; // Cache and revalidate every 60 seconds

export default async function ProductsPage() {
  let products: Product[] = [];
  let activeBanners: Banner[] = [];
  let errorState: any = null;

  try {
    // Run database queries in parallel
    [products, activeBanners] = await Promise.all([
      prisma.product.findMany({
        orderBy: { id: 'desc' }
      }),
      prisma.banner.findMany({
        where: {
          isActive: true,
          pageSection: 'products_top'
        }
      })
    ]);
  } catch (error) {
    console.error("Products page error:", error);
    errorState = error;
  }

  if (errorState) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600">We couldn&apos;t load the products right now. Please try again later.</p>
      </div>
    );
  }

  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedBanners = JSON.parse(JSON.stringify(activeBanners));
  const productsTopBanner = serializedBanners[0] || null;

  return <ProductsClient products={serializedProducts} banner={productsTopBanner} />;
}
