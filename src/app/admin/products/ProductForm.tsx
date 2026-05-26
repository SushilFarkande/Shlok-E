"use client"

import { useRef, useState } from "react"
import { addProduct, deleteProduct, updateProduct } from "./actions"
import Link from "next/link"
import { Product } from "@prisma/client"

export function ProductForm({ editItem }: { editItem?: Product | null }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      if (editItem) {
        const result = await updateProduct(editItem.id, formData)
        if (result.success) {
          alert("Product updated successfully!")
          window.location.href = "/admin/products"
        } else {
          alert("Error: " + result.error)
        }
      } else {
        const result = await addProduct(formData)
        if (result.success) {
          formRef.current?.reset()
          alert("Product added successfully!")
        } else {
          alert("Error: " + result.error)
        }
      }
    } catch (e: any) {
      alert("Error: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{editItem ? "Edit Product" : "Add New Product"}</h2>
        {editItem && (
          <Link href="/admin/products" className="text-sm text-gray-500 hover:text-gray-800">
            Cancel Edit
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" defaultValue={editItem?.name} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" defaultValue={editItem?.category || "Detergents"} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
            <option value="Detergents">Detergents</option>
            <option value="Softeners">Softeners</option>
            <option value="Chemicals">Chemicals</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="text" name="price" defaultValue={editItem?.price || "₹125"} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image {editItem && "(Leave empty to keep current)"}</label>
          <input type="file" name="image" accept="image/*" required={!editItem} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" defaultValue={editItem?.description} rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50">
        {loading ? (editItem ? "Updating Product..." : "Adding Product...") : (editItem ? "Update Product" : "Add Product")}
      </button>
    </form>
  )
}

export function ActionButtons({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="flex justify-end gap-3">
      <Link href={`/admin/products?editId=${id}`} className="text-blue-600 hover:text-blue-900 text-sm font-medium">
        Edit
      </Link>
      <button 
        disabled={loading}
        onClick={async () => {
          if (confirm("Are you sure you want to delete this product?")) {
            setLoading(true)
            try {
              const result = await deleteProduct(id)
              if (!result.success) {
                alert("Error: " + result.error)
              }
            } catch (e: any) {
              alert("Error: " + e.message)
            } finally {
              setLoading(false)
            }
          }
        }}
        className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
