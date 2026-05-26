import { prisma } from "@/lib/prisma"
import { ProductForm, ActionButtons } from "./ProductForm"
import Image from "next/image"

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ editId?: string }> }) {
  const params = await searchParams;
  const editId = params.editId ? parseInt(params.editId) : undefined;
  
  const [products, editItem] = await Promise.all([
    prisma.product.findMany({ orderBy: { id: 'desc' } }),
    editId ? prisma.product.findUnique({ where: { id: editId } }) : Promise.resolve(null)
  ]);

  const serializedEditItem = editItem ? JSON.parse(JSON.stringify(editItem)) : null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      <ProductForm editItem={serializedEditItem} />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative">
                      <Image 
                        src={product.image || "/images/product/pdl.jpeg"} 
                        alt={product.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionButtons id={product.id} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
