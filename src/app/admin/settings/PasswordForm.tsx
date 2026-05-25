"use client"

import { useRef, useState } from "react"
import { requestSettingsOtp, updatePasswordWithOtp } from "./actions"

export function PasswordForm() {
  const [step, setStep] = useState<"request" | "verify">("request")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleRequestOtp() {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      await requestSettingsOtp()
      setStep("verify")
      setSuccess("OTP sent to your email!")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdatePassword(formData: FormData) {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      await updatePasswordWithOtp(formData)
      setStep("request")
      setSuccess("Password updated successfully!")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-4">
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

      {step === "request" ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">To change your password, you first need to receive an OTP on your registered email.</p>
          <button 
            onClick={handleRequestOtp}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP to Email"}
          </button>
        </div>
      ) : (
        <form action={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input type="text" name="otp" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="123456" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" name="newPassword" required minLength={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" name="confirmPassword" required minLength={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setStep("request")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
