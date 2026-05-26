import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const session = await auth().catch((error) => {
    if (
      error.digest === "NEXT_REDIRECT" || 
      error.digest === "DYNAMIC_SERVER_USAGE" ||
      error.message === "NEXT_REDIRECT" ||
      error.message.includes("DYNAMIC_SERVER_USAGE")
    ) {
      throw error;
    }
    console.error("Admin dashboard auth error:", error)
    return null;
  });

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
                await signOut({ redirectTo: "/admin/login" })
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
}
