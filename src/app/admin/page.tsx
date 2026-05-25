import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  try {
    const session = await auth()

    if (!session?.user) {
      redirect("/admin/login")
    }

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{session?.user?.email}</span>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
          <p>Welcome to the admin panel. Here we will add product and service management.</p>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Error</h1>
          <p className="text-gray-600 mb-4">Failed to load the dashboard. This might be due to a database connection issue.</p>
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-xs overflow-auto">
            <strong>Error:</strong> {error instanceof Error ? error.message : String(error)}
          </div>
          <a href="/admin/login" className="mt-6 inline-block text-blue-600 hover:underline">Return to Login</a>
        </div>
      </div>
    )
  }
}
