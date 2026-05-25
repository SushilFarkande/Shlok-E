import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' }
  });

  const activeBanners = await prisma.banner.findMany({
    where: { 
      isActive: true,
      pageSection: 'products_top'
    }
  });

  const productsTopBanner = activeBanners[0] || null;

  return <ProductsClient products={products} banner={productsTopBanner} />;
}
