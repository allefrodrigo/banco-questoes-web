"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const isLoginPage = pathname === "/"

    if (!isLoggedIn && !isLoginPage) {
      router.push("/")
    } else if (isLoggedIn && isLoginPage) {
      router.push("/dashboard")
    }
  }, [pathname, router])

  return <>{children}</>
}

