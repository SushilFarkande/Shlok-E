const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  const ads = await prisma.ad.findMany();
  const banners = await prisma.banner.findMany();
  
  console.log('PRODUCTS COUNT:', products.length);
  console.log('ADS:', ads);
  console.log('BANNERS:', banners);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
