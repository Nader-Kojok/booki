"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/use-auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faPhone, faLock } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Validation schema
const loginSchema = z.object({
  phone: z.string()
    .min(9, "Le numéro doit contenir au moins 9 chiffres")
    .regex(/^[0-9+\s-]+$/, "Format de numéro invalide"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login, isLoading: authLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login(data.phone, data.password)
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`)
    // Social login implementation would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Welcome */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-primary">Booki</h1>
          <p className="text-gray-600">Réservez. Jouez. Gagnez.</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-heading">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à vos réservations
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => handleSocialLogin('google')}
              >
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2 text-red-500" />
                Continuer avec Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => handleSocialLogin('facebook')}
              >
                <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 mr-2 text-blue-600" />
                Continuer avec Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">ou</span>
              </div>
            </div>

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FontAwesomeIcon 
                            icon={faPhone} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                          />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+221 77 123 45 67"
                            className="pl-10 h-12"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FontAwesomeIcon 
                            icon={faLock} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                          />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Votre mot de passe"
                            className="pl-10 pr-10 h-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <FontAwesomeIcon 
                              icon={showPassword ? faEyeSlash : faEye} 
                              className="w-4 h-4 text-gray-400 hover:text-gray-600" 
                            />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-primary hover:bg-primary-dark"
                  disabled={authLoading}
                >
                  {authLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </Form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link 
                  href="/register" 
                  className="text-primary hover:underline font-medium"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          En vous connectant, vous acceptez nos{" "}
          <Link href="/terms" className="underline">
            Conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="underline">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </div>
  )
} 