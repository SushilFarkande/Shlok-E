import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/admin/login",
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
