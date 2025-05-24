'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFootball,
  faTableTennis,
  faBasketball
} from '@fortawesome/free-solid-svg-icons'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SportType } from '@/types'

const sportConfig = {
  padel: {
    name: 'Padel',
    icon: faTableTennis,
    color: 'sport-padel',
    description: 'Courts de padel modernes'
  },
  football: {
    name: 'Football',
    icon: faFootball,
    color: 'sport-football',
    description: 'Terrains de football 5v5 et 11v11'
  },
  tennis: {
    name: 'Tennis',
    icon: faTableTennis,
    color: 'sport-tennis',
    description: 'Courts de tennis professionnels'
  },
  basketball: {
    name: 'Basketball',
    icon: faBasketball,
    color: 'sport-basketball',
    description: 'Terrains de basketball outdoor'
  }
}

interface SportCardComponentProps {
  sportType: SportType
  active?: boolean
  onClick?: (sport: SportType) => void
  size?: 'sm' | 'md' | 'lg'
  showDescription?: boolean
}

export const SportCard = ({ 
  sportType,
  active = false,
  onClick,
  size = 'md',
  showDescription = true
}: SportCardComponentProps) => {
  const sport = sportConfig[sportType]
  
  const handleClick = () => {
    if (onClick) {
      onClick(sportType)
    }
  }

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg border-2",
        active 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-light-gray hover:border-primary/50",
        "animate-fade-in"
      )}
      onClick={handleClick}
    >
      <CardContent className={cn("text-center", sizeClasses[size])}>
        <div className={cn(
          "inline-flex items-center justify-center rounded-full mb-3 transition-all duration-200",
          active ? "bg-primary text-white scale-110" : "bg-gray-100 text-gray",
          size === 'sm' ? 'w-12 h-12' : size === 'md' ? 'w-16 h-16' : 'w-20 h-20'
        )}>
          <FontAwesomeIcon 
            icon={sport.icon} 
            className={cn(iconSizes[size], "transition-transform duration-200")} 
          />
        </div>
        
        <h3 className={cn(
          "font-heading font-semibold text-dark mb-1",
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
        )}>
          {sport.name}
        </h3>
        
        {showDescription && (
          <p className={cn(
            "text-gray text-xs",
            size === 'lg' && 'text-sm'
          )}>
            {sport.description}
          </p>
        )}
        
        {active && (
          <div className="mt-2">
            <div className="w-2 h-2 bg-primary rounded-full mx-auto animate-bounce-subtle" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Export sport configuration for use in other components
export { sportConfig } 