import { prisma } from "@/lib/prisma"
import { AdForm, ActionButtons } from "./AdForm"
import Image from "next/image"

export default async function AdminAdsPage({ searchParams }: { searchParams: Promise<{ editId?: string }> }) {
  const params = await searchParams;
  const editId = params.editId ? parseInt(params.editId) : undefined;
  
  const [ads, editItem] = await Promise.all([
    prisma.ad.findMany({ orderBy: { id: 'desc' } }),
    editId ? prisma.ad.findUnique({ where: { id: editId } }) : Promise.resolve(null)
  ]);

  const serializedEditItem = editItem ? JSON.parse(JSON.stringify(editItem)) : null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Advertisements</h1>
      
      <AdForm editItem={serializedEditItem} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Placement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-20 w-40 relative">
                    <Image 
                      src={ad.imageUrl} 
                      alt={ad.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                  <div className="text-sm text-gray-500">{ad.placement}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ad.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {ad.isActive ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionButtons id={ad.id} isActive={ad.isActive} />
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No advertisements found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
