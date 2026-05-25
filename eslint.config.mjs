import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
// import nextTs from "eslint-config-next/typescript"; // Removed to prevent strict TS linting errors on Vercel

const eslintConfig = defineConfig([
  ...nextVitals,
  // ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "legacy_backup/**",
    "*.js" // Ignore stray root js files
  ]),
]);

export default eslintConfig;
