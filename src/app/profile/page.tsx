'use client'

import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faCalendar, 
  faHeart, 
  faCog, 
  faPhone, 
  faEnvelope,
  faMapPin,
  faStar,
  faEdit,
  faSignOutAlt,
  faBell,
  faShield,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { Terrain } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Amadou Diallo',
  email: 'amadou.diallo@example.com',
  phone: '+221 77 123 45 67',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&face=center',
  location: 'Dakar, Sénégal',
  memberSince: '2023',
  totalBookings: 45,
  favoriteTerrains: 12,
  totalSpent: 675000
}

// Mock booking history
const mockBookings = [
  {
    id: '1',
    terrain: {
      id: '1',
      name: 'Complexe Sportif Almadies',
      sport: 'padel',
      address: 'Almadies, Dakar',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-15',
    time: '18:00-19:00',
    status: 'completed',
    price: 15000,
    rating: 5
  },
  {
    id: '2',
    terrain: {
      id: '2',
      name: 'Terrain de Football Parcelles',
      sport: 'football',
      address: 'Parcelles Assainies, Dakar',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-12',
    time: '16:00-17:00',
    status: 'completed',
    price: 25000,
    rating: 4
  },
  {
    id: '3',
    terrain: {
      id: '3',
      name: 'Tennis Club Dakar',
      sport: 'tennis',
      address: 'Plateau, Dakar',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-20',
    time: '10:00-11:00',
    status: 'upcoming',
    price: 18000,
    rating: null
  }
]

// Mock favorite terrains
const mockFavorites: Terrain[] = [
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
      { id: '2', name: 'Douches', icon: 'faShower', available: true }
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
  }
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-white'
      case 'upcoming': return 'bg-info text-white'
      case 'cancelled': return 'bg-error text-white'
      default: return 'bg-gray text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'upcoming': return 'À venir'
      case 'cancelled': return 'Annulé'
      default: return status
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < rating ? 'text-accent' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title="Mon Profil"
        showSearch={false}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-primary text-white text-xl font-bold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-xl font-heading font-bold text-dark">{mockUser.name}</h1>
                    <p className="text-gray">Membre depuis {mockUser.memberSince}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
                
                <div className="space-y-1 text-sm text-gray">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    <span>{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                    <span>{mockUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
                    <span>{mockUser.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-light-gray">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockUser.totalBookings}</div>
                <div className="text-xs text-gray">Réservations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockUser.favoriteTerrains}</div>
                <div className="text-xs text-gray">Favoris</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(mockUser.totalSpent / 1000).toFixed(0)}k</div>
                <div className="text-xs text-gray">CFA dépensés</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-primary" />
                  Réservations récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-3 border border-light-gray rounded-lg">
                    <img 
                      src={booking.terrain.image} 
                      alt={booking.terrain.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-dark">{booking.terrain.name}</h4>
                      <p className="text-sm text-gray">{booking.date} • {booking.time}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(booking.status)} variant="secondary">
                          {getStatusText(booking.status)}
                        </Badge>
                        {booking.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(booking.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{booking.price.toLocaleString()} CFA</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Voir tout l'historique
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Terrains */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-secondary" />
                  Terrains favoris
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockFavorites.slice(0, 1).map((terrain) => (
                    <div key={terrain.id} className="flex items-center gap-4 p-3 border border-light-gray rounded-lg">
                      <img 
                        src={terrain.images[0]} 
                        alt={terrain.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-dark">{terrain.name}</h4>
                        <p className="text-sm text-gray">{terrain.address}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <FontAwesomeIcon icon={faStar} className="text-accent w-3 h-3" />
                          <span className="text-sm font-medium">{terrain.rating}</span>
                          <span className="text-xs text-gray">({terrain.reviewCount})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{terrain.price.toLocaleString()} CFA/h</div>
                        <Button 
                          size="sm" 
                          className="mt-2"
                          onClick={() => router.push(`/booking?terrain=${terrain.id}`)}
                        >
                          Réserver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir tous les favoris
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {mockBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={booking.terrain.image} 
                      alt={booking.terrain.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-dark mb-1">{booking.terrain.name}</h4>
                      <p className="text-sm text-gray mb-2">{booking.terrain.address}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-dark">{booking.date}</span>
                        <span className="text-dark">{booking.time}</span>
                        <Badge className={getStatusColor(booking.status)} variant="secondary">
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>
                      {booking.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-sm text-gray mr-2">Ma note:</span>
                          {renderStars(booking.rating)}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-lg">{booking.price.toLocaleString()}</div>
                      <div className="text-xs text-gray">CFA</div>
                      {booking.status === 'upcoming' && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Modifier
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-light-gray">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray" />
                    <span className="font-medium">Notifications</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-light-gray">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-gray" />
                    <span className="font-medium">Confidentialité</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-light-gray">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faQuestionCircle} className="w-5 h-5 text-gray" />
                    <span className="font-medium">Aide & Support</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                  </Button>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50">
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 