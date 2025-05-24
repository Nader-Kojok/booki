// Sport Types
export type SportType = 'padel' | 'football' | 'tennis' | 'basketball'

export interface Sport {
  id: string
  name: string
  type: SportType
  icon: string
  color: string
  description?: string
}

// Terrain Types
export interface Terrain {
  id: string
  name: string
  sport: SportType
  description: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  address: string
  phone: string
  distance?: string
  available: boolean
  equipment: Equipment[]
  location: Location
  owner: TerrainOwner
  amenities: Amenity[]
  openingHours: OpeningHours
  createdAt: Date
  updatedAt: Date
}

export interface Equipment {
  id: string
  name: string
  icon: string
  included: boolean
  price?: number
}

export interface Amenity {
  id: string
  name: string
  icon: string
  available: boolean
}

export interface Location {
  lat: number
  lng: number
  city: string
  district: string
  zipCode?: string
}

export interface TerrainOwner {
  id: string
  name: string
  phone: string
  email: string
  avatar?: string
}

export interface OpeningHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  open: string // Format: "HH:mm"
  close: string // Format: "HH:mm"
  closed: boolean
}

// Booking Types
export interface Booking {
  id: string
  terrainId: string
  terrain: Terrain
  userId: string
  user: User
  date: Date
  startTime: string
  endTime: string
  duration: number // in hours
  totalPrice: number
  status: BookingStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  createdAt: Date
  updatedAt: Date
  notes?: string
  guestCount?: number
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type PaymentMethod = 'orange_money' | 'wave' | 'credit_card' | 'cash'

export interface TimeSlot {
  time: string // Format: "HH:mm"
  available: boolean
  price: number
  duration: number
}

// User Types
export interface User {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  avatar?: string
  dateOfBirth?: Date
  preferences: UserPreferences
  favoriteTerrains: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  favoriteSpots: SportType[]
  notifications: NotificationSettings
  language: 'fr' | 'en'
  currency: 'CFA'
}

export interface NotificationSettings {
  bookingReminders: boolean
  promotions: boolean
  newTerrains: boolean
  email: boolean
  sms: boolean
}

// Review Types
export interface Review {
  id: string
  terrainId: string
  userId: string
  user: Pick<User, 'firstName' | 'lastName' | 'avatar'>
  rating: number
  comment: string
  images?: string[]
  createdAt: Date
  helpful: number
}

// Search & Filter Types
export interface SearchFilters {
  sport?: SportType
  location?: string
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  distance?: number
  amenities?: string[]
  availability?: {
    date: Date
    startTime: string
    endTime: string
  }
}

export interface SearchResult {
  terrains: Terrain[]
  total: number
  page: number
  limit: number
  filters: SearchFilters
}

// UI Component Types
export interface TerrainCardProps {
  terrain: Terrain
  onFavorite?: (terrainId: string) => void
  onBook?: (terrainId: string) => void
  isFavorite?: boolean
  showDistance?: boolean
}

export interface SportCardProps {
  sport: Sport
  onClick?: (sport: SportType) => void
  active?: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Form Types
export interface BookingFormData {
  terrainId: string
  date: Date
  startTime: string
  endTime: string
  guestCount: number
  notes?: string
  paymentMethod: PaymentMethod
}

export interface UserRegistrationData {
  email: string
  phone: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  dateOfBirth?: Date
}

export interface UserLoginData {
  email: string
  password: string
  rememberMe?: boolean
} 