import { signIn, auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function LoginPage() {
  try {
    const session = await auth()

    if (session?.user) {
      redirect("/admin")
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form
            action={async (formData) => {
              "use server"
              await signIn("credentials", formData)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                defaultValue="shlokmanufacturers@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/admin/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"      
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  } catch (error: any) {
    if (
      error.digest === "NEXT_REDIRECT" || 
      error.digest === "DYNAMIC_SERVER_USAGE" ||
      error.message === "NEXT_REDIRECT" ||
      error.message.includes("DYNAMIC_SERVER_USAGE")
    ) {
      throw error;
    }
    console.error("Login page error:", error)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Auth Service Error</h1>
          <p className="text-gray-600 mb-4">We encountered an error while starting the authentication service.</p>
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-xs overflow-auto text-left mb-6">
            <strong>Error:</strong> {error instanceof Error ? error.message : String(error)}
          </div>
          <Link href="/" className="text-blue-600 hover:underline">Go to Home Page</Link>
        </div>
      </div>
    )
  }
}
