import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white min-h-[200px] md:min-h-screen p-6 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <Link href="/admin" className="block hover:text-blue-400">Dashboard</Link>
            <Link href="/admin/products" className="block hover:text-blue-400">Manage Products</Link>
            <Link href="/admin/services" className="block hover:text-blue-400">Manage Services</Link>
            <Link href="/admin/banners" className="block hover:text-blue-400">Manage Banners</Link>
            <Link href="/admin/ads" className="block hover:text-blue-400">Manage Ads</Link>
            <Link href="/admin/settings" className="block hover:text-blue-400 mt-8">Settings</Link>
          </nav>
        </div>
        <div className="mt-auto pt-8">
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/admin/login" })
            }}
          >
            <button type="submit" className="w-full text-left text-red-400 hover:text-red-300 font-medium py-2">
              Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}

