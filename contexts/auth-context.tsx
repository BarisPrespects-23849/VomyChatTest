"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  username: string
  displayName?: string
  email?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string, remember?: boolean) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true)

      // Check localStorage and sessionStorage for auth data
      const storedUser = localStorage.getItem("vomyChat_username") || sessionStorage.getItem("vomyChat_username")
      const isLoggedIn =
        localStorage.getItem("vomyChat_isLoggedIn") === "true" ||
        sessionStorage.getItem("vomyChat_isLoggedIn") === "true"

      if (storedUser && isLoggedIn) {
        setUser({
          username: storedUser,
          displayName: storedUser === "Google User" ? "Google User" : "peer Cena",
        })
      } else {
        setUser(null)
      }

      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Login function
  const login = async (username: string, password: string, remember = false): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock authentication logic
      if (username === "demo" && password === "password") {
        const userData = {
          username,
          displayName: "peer Cena",
        }

        // Store auth data based on remember preference
        if (remember) {
          localStorage.setItem("vomyChat_isLoggedIn", "true")
          localStorage.setItem("vomyChat_username", username)
        } else {
          sessionStorage.setItem("vomyChat_isLoggedIn", "true")
          sessionStorage.setItem("vomyChat_username", username)
        }

        setUser(userData)
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Google login function
  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const userData = {
        username: "Google User",
        displayName: "Google User",
      }

      localStorage.setItem("vomyChat_isLoggedIn", "true")
      localStorage.setItem("vomyChat_username", userData.username)

      setUser(userData)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Google login error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("vomyChat_isLoggedIn")
    localStorage.removeItem("vomyChat_username")
    sessionStorage.removeItem("vomyChat_isLoggedIn")
    sessionStorage.removeItem("vomyChat_username")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

