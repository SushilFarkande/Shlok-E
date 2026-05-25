import { prisma } from "@/lib/prisma";

export default async function DiagnosticPage() {
  let dbStatus = "Checking...";
  let productsCount = 0;
  let error = null;

  try {
    productsCount = await prisma.product.count();
    dbStatus = "Connected";
  } catch (e: any) {
    dbStatus = "Failed";
    error = e.message;
  }

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">Diagnostic Page</h1>
      <p><strong>DB Status:</strong> {dbStatus}</p>
      <p><strong>Products Count:</strong> {productsCount}</p>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      <div className="mt-8">
        <p><strong>Environment Variables:</strong></p>
        <ul className="list-disc ml-6">
          <li>AUTH_SECRET: {process.env.AUTH_SECRET ? "Present" : "Missing"}</li>
          <li>DATABASE_URL: {process.env.DATABASE_URL ? "Present" : "Missing"}</li>
          <li>NODE_ENV: {process.env.NODE_ENV}</li>
        </ul>
      </div>
    </div>
  );
}
