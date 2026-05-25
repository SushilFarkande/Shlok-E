import { prisma } from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  try {
    const services = await prisma.service.findMany();
    const serializedServices = JSON.parse(JSON.stringify(services));

    return <ServicesClient services={serializedServices} />;
  } catch (error) {
    console.error("Services page error:", error);
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">Service Unavailable</h2>
        <p className="text-gray-600">We&apos;re currently unable to load our service list. Please contact us directly.</p>
      </div>
    );
  }
}
