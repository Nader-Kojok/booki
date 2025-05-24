'use client'

import { Header } from '@/components/layout/header'
import { SportCard } from '@/components/features/search/sport-card'
import { TerrainCard } from '@/components/features/terrain/terrain-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFire, 
  faLocationDot, 
  faClock,
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons'
import { SportType, Terrain } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data for demonstration
const popularSports: SportType[] = ['padel', 'football', 'tennis', 'basketball']

const mockTerrains: Terrain[] = [
  {
    id: '1',
    name: 'Complexe Sportif Almadies',
    sport: 'padel',
    description: 'Court de padel moderne avec éclairage LED',
    price: 15000,
    rating: 4.8,
    reviewCount: 142,
    images: ['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&auto=format&fit=crop'],
    address: 'Almadies, Dakar',
    phone: '+221 77 123 45 67',
    distance: '2.1 km',
    available: true,
    equipment: [],
    location: { lat: 14.7167, lng: -17.4677, city: 'Dakar', district: 'Almadies' },
    owner: { id: '1', name: 'Ahmed Diallo', phone: '+221 77 123 45 67', email: 'ahmed@example.com' },
    amenities: [
      { id: '1', name: 'Parking', icon: 'faParking', available: true },
      { id: '2', name: 'Douches', icon: 'faShower', available: true },
      { id: '3', name: 'WiFi', icon: 'faWifi', available: true }
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
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Terrain de Football Parcelles',
    sport: 'football',
    description: 'Terrain de football 5v5 avec gazon synthétique',
    price: 25000,
    rating: 4.6,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&auto=format&fit=crop'],
    address: 'Parcelles Assainies, Dakar',
    phone: '+221 77 987 65 43',
    distance: '3.5 km',
    available: true,
    equipment: [],
    location: { lat: 14.7644, lng: -17.4161, city: 'Dakar', district: 'Parcelles' },
    owner: { id: '2', name: 'Fatou Seck', phone: '+221 77 987 65 43', email: 'fatou@example.com' },
    amenities: [
      { id: '1', name: 'Vestiaires', icon: 'faUsers', available: true },
      { id: '2', name: 'Éclairage', icon: 'faLightbulb', available: true }
    ],
    openingHours: {
      monday: { open: '07:00', close: '23:00', closed: false },
      tuesday: { open: '07:00', close: '23:00', closed: false },
      wednesday: { open: '07:00', close: '23:00', closed: false },
      thursday: { open: '07:00', close: '23:00', closed: false },
      friday: { open: '07:00', close: '23:00', closed: false },
      saturday: { open: '07:00', close: '23:00', closed: false },
      sunday: { open: '07:00', close: '23:00', closed: false }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const flashOffers = [
  {
    id: '1',
    title: 'Offre Flash Padel',
    description: 'Réduction de 30% sur tous les courts de padel',
    discount: 30,
    timeLeft: '2h 15min',
    terrain: mockTerrains[0]
  },
  {
    id: '2',
    title: 'Weekend Football',
    description: 'Tarif spécial weekend pour les terrains de football',
    discount: 20,
    timeLeft: '1j 8h',
    terrain: mockTerrains[1]
  }
]

export default function HomePage() {
  const router = useRouter()
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null)
  const [favoriteTerrains, setFavoriteTerrains] = useState<string[]>([])

  const handleSportClick = (sport: SportType) => {
    setSelectedSport(selectedSport === sport ? null : sport)
  }

  const handleFavoriteToggle = (terrainId: string) => {
    setFavoriteTerrains(prev => 
      prev.includes(terrainId) 
        ? prev.filter(id => id !== terrainId)
        : [...prev, terrainId]
    )
  }

  const handleBookTerrain = (terrainId: string) => {
    router.push(`/booking?terrain=${terrainId}`)
  }

  const handleSearchClick = () => {
    router.push('/search')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title="Amadou"
        notificationCount={3}
        onSearchClick={handleSearchClick}
      />

      <div className="px-4 py-6 space-y-8">
        {/* Sports Populaires */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-dark">
              Sports Populaires
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Voir tout
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSports.map((sport) => (
              <SportCard
                key={sport}
                sportType={sport}
                active={selectedSport === sport}
                onClick={handleSportClick}
                size="md"
              />
            ))}
          </div>
        </section>

        {/* Réservations Flash */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFire} className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-heading font-bold text-dark">
                Réservations Flash
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Voir tout
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid gap-4">
            {flashOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden border-2 border-secondary/20 bg-gradient-to-r from-secondary/5 to-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-secondary text-white">
                        -{offer.discount}%
                      </Badge>
                      <span className="font-heading font-semibold text-dark">
                        {offer.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                      <span className="text-sm font-medium">{offer.timeLeft}</span>
                    </div>
                  </div>
                  <p className="text-gray text-sm mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray">
                      <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                      <span>{offer.terrain.address}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-secondary hover:bg-secondary/90"
                      onClick={() => router.push(`/booking?terrain=${offer.terrain.id}`)}
                    >
                      Profiter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Près de chez vous */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-heading font-bold text-dark">
                Près de chez vous
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Voir sur la carte
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid gap-6">
            {mockTerrains.map((terrain) => (
              <TerrainCard
                key={terrain.id}
                terrain={terrain}
                isFavorite={favoriteTerrains.includes(terrain.id)}
                onFavorite={handleFavoriteToggle}
                onBook={handleBookTerrain}
                showDistance={true}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-heading font-bold mb-2">
              Prêt à jouer ?
            </h3>
            <p className="text-primary-light mb-4">
              Découvrez tous les terrains disponibles près de chez vous
            </p>
            <Button 
              className="bg-white text-primary hover:bg-white/90 font-accent font-semibold px-8 py-3"
              onClick={handleSearchClick}
            >
              Explorer les terrains
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
