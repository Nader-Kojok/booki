'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStar, 
  faMapPin, 
  faHeart,
  faClock,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { TerrainCardProps } from '@/types'
import { useState } from 'react'

export const TerrainCard = ({ 
  terrain,
  onFavorite,
  onBook,
  isFavorite = false,
  showDistance = true 
}: TerrainCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onFavorite) {
      onFavorite(terrain.id)
    }
  }

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onBook) {
      onBook(terrain.id)
    }
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setIsImageLoading(false)
  }

  // Fallback image URL
  const fallbackImage = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&auto=format&fit=crop"

  return (
    <Link href={`/terrain/${terrain.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer">
      <div className="relative aspect-video">
        {/* Image Container */}
        <div className="relative w-full h-full bg-gray-100">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Chargement...</div>
            </div>
          )}
          
          <Image
            src={imageError ? fallbackImage : (terrain.images[0] || fallbackImage)}
            alt={terrain.name}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              isImageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge 
            className={cn(
              "text-xs font-medium",
              terrain.available 
                ? "bg-success text-white" 
                : "bg-gray text-white"
            )}
          >
            {terrain.available ? "Disponible" : "Complet"}
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-all duration-200",
            isFavorite 
              ? "bg-secondary/20 hover:bg-secondary/30 text-secondary" 
              : "bg-white/80 hover:bg-white text-gray"
          )}
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon 
            icon={faHeart} 
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isFavorite ? "scale-110" : ""
            )} 
          />
        </Button>
      </div>

      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-dark line-clamp-1">
            {terrain.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <FontAwesomeIcon icon={faStar} className="text-accent w-4 h-4" />
            <span className="text-sm font-medium text-dark">{terrain.rating}</span>
            <span className="text-xs text-gray">({terrain.reviewCount})</span>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center gap-2 text-gray mb-3">
          <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
          <span className="text-sm flex-1 line-clamp-1">{terrain.address}</span>
          {showDistance && terrain.distance && (
            <span className="text-xs font-medium text-primary">
              {terrain.distance}
            </span>
          )}
        </div>

        {/* Amenities */}
        {terrain.amenities && terrain.amenities.length > 0 && (
          <div className="flex items-center gap-3 mb-3 text-xs text-gray">
            {terrain.amenities.slice(0, 3).map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUsers} className="w-3 h-3" />
                <span>{amenity.name}</span>
              </div>
            ))}
            {terrain.amenities.length > 3 && (
              <span className="text-gray">+{terrain.amenities.length - 3}</span>
            )}
          </div>
        )}

        {/* Price & Book Button */}
        <div className="flex items-center justify-between pt-2 border-t border-light-gray">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">{terrain.price}</span>
              <span className="text-gray text-sm">CFA/h</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
              <span>Réservation instantanée</span>
            </div>
          </div>
          
          <Button 
            className="bg-primary hover:bg-primary-dark text-white font-accent font-semibold px-6 py-2 transition-all duration-200 hover:scale-105"
            onClick={handleBookClick}
            disabled={!terrain.available}
          >
            {terrain.available ? "Réserver" : "Complet"}
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
} 