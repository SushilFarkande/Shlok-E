import { PasswordForm } from "./PasswordForm"

export default function AdminSettingsPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PasswordForm />
        </div>
        {/* Additional settings can be added here in the future */}
      </div>
    </div>
  )
}
