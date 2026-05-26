"use client"

import { useRef, useState } from "react"
import { addBanner, deleteBanner, toggleBanner, updateBanner } from "./actions"
import Link from "next/link"
import { Banner } from "@prisma/client"

export function BannerForm({ editItem }: { editItem?: Banner | null }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      if (editItem) {
        const result = await updateBanner(editItem.id, formData)
        if (result.success) {
          alert("Banner updated successfully!")
          window.location.href = "/admin/banners"
        } else {
          alert("Error: " + result.error)
        }
      } else {
        const result = await addBanner(formData)
        if (result.success) {
          formRef.current?.reset()
          alert("Banner added successfully!")
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
        <h2 className="text-xl font-semibold">{editItem ? "Edit Banner" : "Upload New Banner"}</h2>
        {editItem && (
          <Link href="/admin/banners" className="text-sm text-gray-500 hover:text-gray-800">
            Cancel Edit
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Placement Section</label>
          <select name="pageSection" defaultValue={editItem?.pageSection} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="home_hero">Home Hero Background</option>
            <option value="home_ad">Home Advertisement Section</option>
            <option value="products_top">Products Top Banner</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Link URL (Optional)</label>
          <input type="text" name="link" defaultValue={editItem?.link || ""} placeholder="e.g. /products or https://..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Banner Image {editItem && "(Leave empty to keep current)"}</label>
          <input type="file" name="image" accept="image/*" required={!editItem} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
      </div>
      
      <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50">
        {loading ? (editItem ? "Updating Banner..." : "Uploading Banner...") : (editItem ? "Update Banner" : "Upload Banner")}
      </button>
    </form>
  )
}

export function ActionButtons({ id, isActive }: { id: number, isActive: boolean }) {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="flex justify-end gap-3 items-center">
      <Link href={`/admin/banners?editId=${id}`} className="text-blue-600 hover:text-blue-900 text-sm font-medium">
        Edit
      </Link>
      <button 
        disabled={loading}
        onClick={async () => {
          setLoading(true)
          try {
            const result = await toggleBanner(id, !isActive)
            if (!result.success) {
              alert("Error: " + result.error)
            }
          } catch (e: any) {
            alert("Error: " + e.message)
          } finally {
            setLoading(false)
          }
        }}
        className={`${isActive ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"} text-sm font-medium disabled:opacity-50`}
      >
        {isActive ? "Hide" : "Show"}
      </button>
      <button 
        disabled={loading}
        onClick={async () => {
          if (confirm("Are you sure you want to delete this banner?")) {
            setLoading(true)
            try {
              const result = await deleteBanner(id)
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
