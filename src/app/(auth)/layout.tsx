import { ProtectedRoute } from '@/components/auth/protected-route'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen">
        {children}
      </div>
    </ProtectedRoute>
  )
} 