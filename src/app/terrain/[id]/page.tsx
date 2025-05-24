'use client'

import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStar, 
  faMapPin, 
  faPhone, 
  faHeart,
  faClock,
  faUsers,
  faParking,
  faShower,
  faWifi,
  faCalendar,
  faShare,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// Mock terrain data - in real app, this would be fetched based on ID
const mockTerrain = {
  id: '1',
  name: 'Complexe Sportif Almadies',
  sport: 'padel',
  description: 'Court de padel moderne avec éclairage LED dernière génération. Situé dans le quartier résidentiel des Almadies, ce complexe sportif offre un cadre exceptionnel pour la pratique du padel. Surface professionnelle en gazon synthétique de haute qualité.',
  price: 15000,
  rating: 4.8,
  reviewCount: 142,
  images: [
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&auto=format&fit=crop'
  ],
  address: 'Route des Almadies, Dakar',
  phone: '+221 77 123 45 67',
  distance: '2.1 km',
  available: true,
  location: { lat: 14.7167, lng: -17.4677, city: 'Dakar', district: 'Almadies' },
  owner: { 
    id: '1', 
    name: 'Ahmed Diallo', 
    phone: '+221 77 123 45 67', 
    email: 'ahmed@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&face=center'
  },
  amenities: [
    { id: '1', name: 'Parking', icon: faParking, available: true },
    { id: '2', name: 'Douches', icon: faShower, available: true },
    { id: '3', name: 'WiFi gratuit', icon: faWifi, available: true },
    { id: '4', name: 'Vestiaires', icon: faUsers, available: true }
  ],
  openingHours: {
    monday: { open: '08:00', close: '22:00', closed: false },
    tuesday: { open: '08:00', close: '22:00', closed: false },
    wednesday: { open: '08:00', close: '22:00', closed: false },
    thursday: { open: '08:00', close: '22:00', closed: false },
    friday: { open: '08:00', close: '22:00', closed: false },
    saturday: { open: '08:00', close: '22:00', closed: false },
    sunday: { open: '08:00', close: '22:00', closed: false }
  },
  rules: [
    'Réservation minimum 1 heure',
    'Annulation gratuite jusqu\'à 2h avant',
    'Équipement de sport obligatoire',
    'Respect des autres joueurs'
  ],
  priceDetails: {
    weekday: 15000,
    weekend: 18000,
    evening: 20000
  }
}

// Mock reviews
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'Fatou Seck',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b35c?w=50&h=50&auto=format&fit=crop&face=center'
    },
    rating: 5,
    comment: 'Excellent terrain, très bien entretenu. L\'éclairage est parfait pour jouer en soirée.',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: '2',
    user: {
      name: 'Moussa Diop',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop&face=center'
    },
    rating: 4,
    comment: 'Bon terrain, parking facile. Juste un peu cher pour la durée.',
    date: '2024-01-12',
    helpful: 8
  }
]

export default function TerrainDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockTerrain.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockTerrain.images.length - 1 : prev - 1
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < rating ? 'text-accent w-4 h-4' : 'text-gray-300 w-4 h-4'}
      />
    ))
  }

  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    }
    return days[day] || day
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title=""
        showSearch={false}
      />

      <div className="space-y-6">
        {/* Image Gallery */}
        <div className="relative aspect-video">
          <Image
            src={mockTerrain.images[currentImageIndex]}
            alt={mockTerrain.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation arrows */}
          {mockTerrain.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={prevImage}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={nextImage}
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Image indicators */}
          {mockTerrain.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {mockTerrain.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={mockTerrain.available ? 'bg-success text-white' : 'bg-gray text-white'}>
              {mockTerrain.available ? 'Disponible' : 'Complet'}
            </Badge>
            <Badge className="bg-primary text-white capitalize">
              {mockTerrain.sport}
            </Badge>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 hover:bg-white text-gray rounded-full p-2"
            >
              <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full p-2 ${
                isFavorite 
                  ? 'bg-secondary/20 hover:bg-secondary/30 text-secondary' 
                  : 'bg-white/80 hover:bg-white text-gray'
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="px-4 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-heading font-bold text-dark">{mockTerrain.name}</h1>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{mockTerrain.price.toLocaleString()}</div>
                <div className="text-sm text-gray">CFA/heure</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {renderStars(Math.floor(mockTerrain.rating))}
                <span className="text-sm font-medium ml-1">{mockTerrain.rating}</span>
                <span className="text-xs text-gray">({mockTerrain.reviewCount} avis)</span>
              </div>
              {mockTerrain.distance && (
                <div className="flex items-center gap-1 text-sm text-gray">
                  <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
                  <span>{mockTerrain.distance}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray mb-4">
              <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
              <span>{mockTerrain.address}</span>
            </div>

            <p className="text-gray leading-relaxed">{mockTerrain.description}</p>
          </div>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Équipements & Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {mockTerrain.amenities.slice(0, showAllAmenities ? undefined : 4).map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-3">
                    <FontAwesomeIcon 
                      icon={amenity.icon} 
                      className={`w-5 h-5 ${amenity.available ? 'text-primary' : 'text-gray'}`} 
                    />
                    <span className={amenity.available ? 'text-dark' : 'text-gray line-through'}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
              {mockTerrain.amenities.length > 4 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? 'Voir moins' : `Voir ${mockTerrain.amenities.length - 4} autres`}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Opening Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Horaires d'ouverture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(mockTerrain.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium">{getDayName(day)}</span>
                    <span className={hours.closed ? 'text-red-500' : 'text-gray'}>
                      {hours.closed ? 'Fermé' : `${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact & Owner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img 
                  src={mockTerrain.owner.avatar} 
                  alt={mockTerrain.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-dark">{mockTerrain.owner.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                    <span>{mockTerrain.phone}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Appeler
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avis clients ({mockReviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-light-gray pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <img 
                      src={review.user.avatar} 
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-dark">{review.user.name}</h5>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray text-sm mb-2">{review.comment}</p>
                      <div className="flex items-center gap-4 text-xs text-gray">
                        <span>{review.date}</span>
                        <span>{review.helpful} personnes trouvent cet avis utile</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Voir tous les avis
              </Button>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Règlement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockTerrain.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray">
                    <span className="text-primary mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Fixed bottom booking bar */}
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-light-gray p-4 shadow-lg">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <div className="text-xl font-bold text-primary">{mockTerrain.price.toLocaleString()} CFA</div>
              <div className="text-xs text-gray">par heure</div>
            </div>
            <Button 
              className="flex-1 bg-primary hover:bg-primary-dark"
              disabled={!mockTerrain.available}
              onClick={() => router.push(`/booking?terrain=${mockTerrain.id}`)}
            >
              <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2" />
              {mockTerrain.available ? 'Réserver' : 'Indisponible'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 