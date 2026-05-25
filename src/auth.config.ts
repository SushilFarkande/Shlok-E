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
      const isLogin = nextUrl.pathname === "/admin/login"

      if (isOnAdmin && !isLogin) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      if (isLogin && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
