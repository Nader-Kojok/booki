'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faSearch, 
  faCalendar, 
  faMessage, 
  faUser 
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

const navigationItems = [
  {
    id: 'home',
    label: 'Accueil',
    icon: faHome,
    href: '/',
  },
  {
    id: 'search',
    label: 'Recherche',
    icon: faSearch,
    href: '/search',
  },
  {
    id: 'bookings',
    label: 'Mes Résa',
    icon: faCalendar,
    href: '/bookings',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: faMessage,
    href: '/messages',
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: faUser,
    href: '/profile',
  },
]

export const BottomNavigation = () => {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Don't show bottom navigation if user is not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-light-gray z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-gray hover:text-primary hover:bg-primary/5"
              )}
            >
              <FontAwesomeIcon 
                icon={item.icon} 
                className={cn(
                  "w-5 h-5 mb-1 transition-all duration-200",
                  isActive ? "scale-110" : ""
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  isActive ? "font-semibold" : ""
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 