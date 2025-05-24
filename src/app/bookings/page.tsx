'use client'

import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCalendar, 
  faClock, 
  faMapPin, 
  faPhone,
  faEdit,
  faTrash,
  faQrcode,
  faPlus,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Mock bookings data
const mockBookings = [
  {
    id: '1',
    terrain: {
      id: '1',
      name: 'Complexe Sportif Almadies',
      sport: 'padel',
      address: 'Almadies, Dakar',
      phone: '+221 77 123 45 67',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-20',
    time: '18:00-19:00',
    status: 'upcoming',
    price: 15000,
    bookingCode: 'BK001',
    participants: 4,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    terrain: {
      id: '2',
      name: 'Terrain de Football Parcelles',
      sport: 'football',
      address: 'Parcelles Assainies, Dakar',
      phone: '+221 77 987 65 43',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-22',
    time: '16:00-17:00',
    status: 'upcoming',
    price: 25000,
    bookingCode: 'BK002',
    participants: 10,
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    terrain: {
      id: '3',
      name: 'Tennis Club Dakar',
      sport: 'tennis',
      address: 'Plateau, Dakar',
      phone: '+221 77 555 12 34',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-15',
    time: '10:00-11:00',
    status: 'completed',
    price: 18000,
    bookingCode: 'BK003',
    participants: 2,
    createdAt: '2024-01-10',
    rating: 5
  },
  {
    id: '4',
    terrain: {
      id: '4',
      name: 'Basketball Court Yoff',
      sport: 'basketball',
      address: 'Yoff, Dakar',
      phone: '+221 77 456 78 90',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&auto=format&fit=crop'
    },
    date: '2024-01-10',
    time: '14:00-15:00',
    status: 'cancelled',
    price: 12000,
    bookingCode: 'BK004',
    participants: 8,
    createdAt: '2024-01-05'
  }
]

export default function BookingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('upcoming')

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

  const upcomingBookings = mockBookings.filter(booking => booking.status === 'upcoming')
  const pastBookings = mockBookings.filter(booking => booking.status === 'completed' || booking.status === 'cancelled')

  const handleCancelBooking = (bookingId: string) => {
    console.log('Cancelling booking:', bookingId)
    // Implement cancel logic
  }

  const handleModifyBooking = (bookingId: string) => {
    console.log('Modifying booking:', bookingId)
    // Implement modify logic
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title="Mes Réservations"
        showSearch={false}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link href="/search" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary-dark">
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
              Nouvelle réservation
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{upcomingBookings.length}</div>
              <div className="text-sm text-gray">Réservations à venir</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{pastBookings.length}</div>
              <div className="text-sm text-gray">Réservations passées</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">À venir ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Historique ({pastBookings.length})</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-24 h-24 relative">
                        <img 
                          src={booking.terrain.image} 
                          alt={booking.terrain.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge 
                          className={`absolute top-2 left-2 text-xs ${getStatusColor(booking.status)}`}
                        >
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-semibold text-dark text-lg">
                              {booking.terrain.name}
                            </h3>
                            <p className="text-sm text-gray">{booking.terrain.address}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary text-lg">
                              {booking.price.toLocaleString()} CFA
                            </div>
                            <div className="text-xs text-gray">#{booking.bookingCode}</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 text-primary" />
                            <span className="font-medium">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary" />
                            <span className="font-medium">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4 text-primary" />
                            <span>{booking.participants} participants</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleModifyBooking(booking.id)}
                            className="flex-1"
                          >
                            <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                          >
                            <FontAwesomeIcon icon={faQrcode} className="w-4 h-4 mr-1" />
                            QR Code
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-500 border-red-500 hover:bg-red-50"
                          >
                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-3 pt-3 border-t border-light-gray">
                          <div className="flex items-center gap-2 text-xs text-gray">
                            <FontAwesomeIcon icon={faPhone} className="w-3 h-3" />
                            <span>{booking.terrain.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FontAwesomeIcon icon={faCalendar} className="w-16 h-16 text-gray mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-dark mb-2">Aucune réservation à venir</h3>
                  <p className="text-gray mb-4">Vous n'avez pas de réservations prévues pour le moment.</p>
                  <Link href="/search">
                    <Button className="bg-primary hover:bg-primary-dark">
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                      Réserver un terrain
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Bookings */}
          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-24 h-24 relative">
                        <img 
                          src={booking.terrain.image} 
                          alt={booking.terrain.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge 
                          className={`absolute top-2 left-2 text-xs ${getStatusColor(booking.status)}`}
                        >
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-semibold text-dark">
                              {booking.terrain.name}
                            </h3>
                            <p className="text-sm text-gray">{booking.terrain.address}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-dark">
                              {booking.price.toLocaleString()} CFA
                            </div>
                            <div className="text-xs text-gray">#{booking.bookingCode}</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray">
                            <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                            <span>{booking.date} • {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray">
                            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
                            <span>{booking.participants} participants</span>
                          </div>
                        </div>

                        {/* Actions for completed bookings */}
                        {booking.status === 'completed' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => router.push(`/booking?terrain=${booking.terrain.id}`)}
                            >
                              Réserver à nouveau
                            </Button>
                            {!booking.rating && (
                              <Button size="sm" className="bg-accent hover:bg-accent/90 text-dark">
                                Noter
                              </Button>
                            )}
                          </div>
                        )}

                        {/* Cancellation warning for cancelled bookings */}
                        {booking.status === 'cancelled' && (
                          <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-700">Réservation annulée</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FontAwesomeIcon icon={faCalendar} className="w-16 h-16 text-gray mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-dark mb-2">Aucun historique</h3>
                  <p className="text-gray">Vous n'avez pas encore effectué de réservations.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 