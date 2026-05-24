"use client"

import { useRef, useState } from "react"
import { updatePassword } from "./actions"

export function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    setSuccess("")
    
    try {
      await updatePassword(formData)
      formRef.current?.reset()
      setSuccess("Password updated successfully!")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 text-green-700 text-sm rounded border border-green-200">
          {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <input type="password" name="currentPassword" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input type="password" name="newPassword" required minLength={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input type="password" name="confirmPassword" required minLength={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>

      <button type="submit" disabled={loading} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50">
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  )
}
