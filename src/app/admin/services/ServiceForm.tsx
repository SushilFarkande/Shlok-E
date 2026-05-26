"use client"

import { useRef, useState } from "react"
import { addService, deleteService, updateService } from "./actions"
import Link from "next/link"
import { Service } from "@prisma/client"

export function ServiceForm({ editItem }: { editItem?: Service | null }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      if (editItem) {
        const result = await updateService(editItem.id, formData)
        if (result.success) {
          alert("Service updated successfully!")
          window.location.href = "/admin/services"
        } else {
          alert("Error: " + result.error)
        }
      } else {
        const result = await addService(formData)
        if (result.success) {
          formRef.current?.reset()
          alert("Service added successfully!")
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
        <h2 className="text-xl font-semibold">{editItem ? "Edit Service" : "Add New Service"}</h2>
        {editItem && (
          <Link href="/admin/services" className="text-sm text-gray-500 hover:text-gray-800">
            Cancel Edit
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Title</label>
          <input type="text" name="title" defaultValue={editItem?.title} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon Name</label>
          <select name="icon" defaultValue={editItem?.icon} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="Wrench">Wrench (Repair)</option>
            <option value="Wind">Wind (Dryer)</option>
            <option value="Settings">Settings (Installation)</option>
            <option value="ShieldCheck">ShieldCheck (Maintenance)</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" defaultValue={editItem?.description} rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50">
        {loading ? (editItem ? "Updating Service..." : "Adding Service...") : (editItem ? "Update Service" : "Add Service")}
      </button>
    </form>
  )
}

export function ActionButtons({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="flex justify-end gap-3">
      <Link href={`/admin/services?editId=${id}`} className="text-blue-600 hover:text-blue-900 text-sm font-medium">
        Edit
      </Link>
      <button 
        disabled={loading}
        onClick={async () => {
          if (confirm("Are you sure you want to delete this service?")) {
            setLoading(true)
            try {
              const result = await deleteService(id)
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
