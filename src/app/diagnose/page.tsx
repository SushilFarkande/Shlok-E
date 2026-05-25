import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export default async function DiagnosticPage() {
  const results: Record<string, string | number> = {};
  const errors: Record<string, string> = {};

  const tables = ['product', 'service', 'banner', 'ad', 'user'];

  for (const table of tables) {
    try {
      results[table] = await (prisma as any)[table].count();
    } catch (e: any) {
      results[table] = "Error";
      errors[table] = e.message;
    }
  }

  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, "prisma", "dev.db"),
    path.join(cwd, "dev.db"),
    path.join(cwd, ".next", "server", "prisma", "dev.db"),
    "./prisma/dev.db",
    "./dev.db"
  ];

  const fileChecks = possiblePaths.map(p => ({
    path: p,
    exists: fs.existsSync(p) ? "✅ Yes" : "❌ No"
  }));

  return (
    <div className="p-8 font-mono bg-pearl-white min-h-screen text-navy-blue">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">System Diagnostics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-3xl">
          <h2 className="text-xl font-bold mb-4">Database Stats</h2>
          <ul className="space-y-2">
            {Object.entries(results).map(([table, count]) => (
              <li key={table} className="flex justify-between border-b border-gray-100 pb-1">
                <span className="capitalize font-bold">{table}s:</span>
                <span className={count === "Error" ? "text-red-500" : "text-royal-blue"}>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h2 className="text-xl font-bold mb-4">File System Checks</h2>
          <ul className="space-y-2 text-[10px]">
            {fileChecks.map((check, i) => (
              <li key={i} className="border-b border-gray-100 pb-1 break-all">
                <strong>{check.path}</strong>: {check.exists}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 glass p-6 rounded-3xl">
          <h2 className="text-xl font-bold mb-4">Environment</h2>
          <ul className="space-y-2">
            <li><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</li>
            <li><strong>CWD:</strong> {cwd}</li>
            <li><strong>DATABASE_URL:</strong> {process.env.DATABASE_URL || "Not Set"}</li>
          </ul>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-3xl">
          <h2 className="text-xl font-bold text-red-700 mb-4">Error Details</h2>
          {Object.entries(errors).map(([table, msg]: any) => (
            <div key={table} className="mb-4 last:mb-0">
              <h3 className="font-bold text-red-600 uppercase text-sm">{table} Table:</h3>
              <pre className="mt-1 p-3 bg-white rounded-xl text-xs overflow-auto border border-red-50 whitespace-pre-wrap">
                {msg}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
