import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"

const useSecureCookies = process.env.NODE_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Fallback absolute expiry of 1 day
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        // Omit maxAge to create a true "Session Cookie" that expires on browser close
      },
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      const isPublicRoute = nextUrl.pathname === "/admin/login" || nextUrl.pathname === "/admin/forgot-password"

      if (isOnAdmin && !isPublicRoute) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      if (isPublicRoute && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
