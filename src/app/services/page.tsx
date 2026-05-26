import { prisma } from "@/lib/prisma";
import ServicesClient from "./ServicesClient";
import { Service } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  let services: Service[] = [];
  let errorState: any = null;

  try {
    services = await prisma.service.findMany();
  } catch (error) {
    console.error("Services page error:", error);
    errorState = error;
  }

  if (errorState) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">Service Unavailable</h2>
        <p className="text-gray-600">We&apos;re currently unable to load our service list. Please contact us directly.</p>
      </div>
    );
  }

  const serializedServices = JSON.parse(JSON.stringify(services));

  return <ServicesClient services={serializedServices} />;
}
