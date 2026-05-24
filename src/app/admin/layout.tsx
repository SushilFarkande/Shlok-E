import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white min-h-[200px] md:min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-blue-400">Dashboard</Link>
          <Link href="/admin/products" className="block hover:text-blue-400">Manage Products</Link>
          <Link href="/admin/services" className="block hover:text-blue-400">Manage Services</Link>
          <Link href="/admin/banners" className="block hover:text-blue-400">Manage Banners</Link>
          <Link href="/admin/ads" className="block hover:text-blue-400">Manage Ads</Link>
          <Link href="/admin/settings" className="block hover:text-blue-400 mt-8">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}

