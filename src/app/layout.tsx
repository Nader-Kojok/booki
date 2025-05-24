import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNavigation } from "@/components/layout/bottom-nav";
import { AuthProvider } from "@/hooks/use-auth";
import { ToastProvider } from "@/components/providers/toast-provider";
import '@/lib/fontawesome'; // Initialize Font Awesome

export const metadata: Metadata = {
  title: "Booki - Réservez vos terrains de sport à Dakar",
  description: "La plateforme #1 pour réserver des terrains de sport à Dakar. Padel, Football, Tennis, Basketball - Réservez en 3 clics !",
  keywords: "terrain sport dakar, réservation terrain, padel dakar, football dakar, tennis dakar, basketball dakar",
  authors: [{ name: "Booki Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00D4AA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-background min-h-screen">
        <AuthProvider>
          <ToastProvider>
            {/* Main App Container */}
            <div className="flex flex-col min-h-screen">
              {/* Content Area */}
              <main className="flex-1 pb-20">
                {children}
              </main>
              
              {/* Bottom Navigation */}
              <BottomNavigation />
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
