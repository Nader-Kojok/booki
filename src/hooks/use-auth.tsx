'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for development
const MOCK_USER: User = {
  id: '1',
  name: 'Mamadou Diallo',
  email: 'mamadou@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('booki_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    // Removed auto-login for development - user starts logged out
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock login - in real app, validate credentials
    const loggedInUser = { ...MOCK_USER, email }
    setUser(loggedInUser)
    localStorage.setItem('booki_user', JSON.stringify(loggedInUser))
    
    setIsLoading(false)
    router.push('/')
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock registration
    const newUser = { ...MOCK_USER, name, email }
    setUser(newUser)
    localStorage.setItem('booki_user', JSON.stringify(newUser))
    
    setIsLoading(false)
    router.push('/')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('booki_user')
    router.push('/login')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 