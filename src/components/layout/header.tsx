'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBell, 
  faCloudSun, 
  faSearch,
  faBars,
  faSignOutAlt,
  faUser,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

interface HeaderProps {
  title?: string
  showSearch?: boolean
  notificationCount?: number
  onMenuClick?: () => void
  onSearchClick?: () => void
}

export const Header = ({ 
  title,
  showSearch = true,
  notificationCount = 0,
  onMenuClick,
  onSearchClick 
}: HeaderProps) => {
  const { user, logout } = useAuth()
  const currentTime = new Date()
  
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Bonjour"
    if (hour < 17) return "Bonne après-midi"
    return "Bonsoir"
  }

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick()
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-light-gray sticky top-0 z-40">
      <div className="px-4 py-4">
        {/* Top Row - Greeting & Notifications */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {onMenuClick && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onMenuClick}
                className="p-2 hover:bg-primary/10"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-gray" />
              </Button>
            )}
            
            <div>
              <h1 className="text-lg font-heading font-semibold text-dark">
                {title || (
                  <>
                    {getGreeting()}, <span className="text-primary">{user?.name || 'Utilisateur'}</span>
                  </>
                )}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray">
                <FontAwesomeIcon icon={faCloudSun} className="w-4 h-4" />
                <span>28°C à Dakar</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative p-2 hover:bg-primary/10"
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-secondary border-white text-white flex items-center justify-center"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/settings" className="flex items-center">
                    <FontAwesomeIcon icon={faCog} className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div 
            onClick={handleSearchClick}
            className="relative cursor-pointer"
          >
            <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-light-gray hover:border-primary/50 transition-colors">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="w-5 h-5 text-gray mr-3" 
              />
              <span className="text-gray flex-1">
                Quel sport aujourd&apos;hui ?
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 