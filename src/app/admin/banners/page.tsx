import { prisma } from "@/lib/prisma"
import { BannerForm, ActionButtons } from "./BannerForm"
import Image from "next/image"

export default async function AdminBannersPage({ searchParams }: { searchParams: Promise<{ editId?: string }> }) {
  const params = await searchParams;
  const editId = params.editId ? parseInt(params.editId) : undefined;
  
  const [banners, editItem] = await Promise.all([
    prisma.banner.findMany({ orderBy: { id: 'desc' } }),
    editId ? prisma.banner.findUnique({ where: { id: editId } }) : Promise.resolve(null)
  ]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Banners</h1>
      
      <BannerForm editItem={editItem} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-20 w-40 relative">
                    <Image 
                      src={banner.imageUrl} 
                      alt={banner.pageSection}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {banner.pageSection}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${banner.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {banner.isActive ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionButtons id={banner.id} isActive={banner.isActive} />
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No banners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
