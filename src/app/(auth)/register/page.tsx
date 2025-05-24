"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/use-auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faPhone, faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Validation schema
const registerSchema = z.object({
  firstName: z.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string()
    .email("Adresse email invalide"),
  phone: z.string()
    .min(9, "Le numéro doit contenir au moins 9 chiffres")
    .regex(/^[0-9+\s-]+$/, "Format de numéro invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean()
    .refine(val => val === true, "Vous devez accepter les conditions d'utilisation"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const { register, isLoading: authLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      const fullName = `${data.firstName} ${data.lastName}`
      await register(fullName, data.email, data.password)
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const handleSocialRegister = (provider: 'google' | 'facebook') => {
    console.log(`Register with ${provider}`)
    // Social registration implementation would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Welcome */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-primary">Booki</h1>
          <p className="text-gray-600">Rejoignez la communauté sportive de Dakar</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-heading">Créer un compte</CardTitle>
            <CardDescription>
              Inscrivez-vous pour commencer à réserver vos terrains
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Registration Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => handleSocialRegister('google')}
              >
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2 text-red-500" />
                S'inscrire avec Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => handleSocialRegister('facebook')}
              >
                <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 mr-2 text-blue-600" />
                S'inscrire avec Facebook
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

            {/* Registration Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FontAwesomeIcon 
                              icon={faUser} 
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                            />
                            <Input
                              {...field}
                              placeholder="Amadou"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FontAwesomeIcon 
                              icon={faUser} 
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                            />
                            <Input
                              {...field}
                              placeholder="Diallo"
                              className="pl-10 h-12"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FontAwesomeIcon 
                            icon={faEnvelope} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                          />
                          <Input
                            {...field}
                            type="email"
                            placeholder="amadou@exemple.com"
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
                            placeholder="Mot de passe sécurisé"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FontAwesomeIcon 
                            icon={faLock} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                          />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmer le mot de passe"
                            className="pl-10 pr-10 h-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <FontAwesomeIcon 
                              icon={showConfirmPassword ? faEyeSlash : faEye} 
                              className="w-4 h-4 text-gray-400 hover:text-gray-600" 
                            />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          J'accepte les{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            politique de confidentialité
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-primary hover:bg-primary-dark"
                  disabled={authLoading}
                >
                  {authLoading ? "Création du compte..." : "Créer mon compte"}
                </Button>
              </form>
            </Form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link 
                  href="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          En créant un compte, vous acceptez de recevoir des notifications par SMS pour vos réservations.
        </div>
      </div>
    </div>
  )
} 