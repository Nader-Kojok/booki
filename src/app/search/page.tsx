'use client'

import { Header } from '@/components/layout/header'
import { TerrainCard } from '@/components/features/terrain/terrain-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faFilter, 
  faMapPin, 
  faTableCellsLarge, 
  faList,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons'
import { Terrain, SportType } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock search results
const mockSearchResults: Terrain[] = [
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
  },
  {
    id: '3',
    name: 'Tennis Club Dakar',
    sport: 'tennis',
    description: 'Courts de tennis professionnels en terre battue',
    price: 18000,
    rating: 4.7,
    reviewCount: 65,
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&auto=format&fit=crop'],
    address: 'Plateau, Dakar',
    phone: '+221 77 555 12 34',
    distance: '1.8 km',
    available: false,
    equipment: [],
    location: { lat: 14.6928, lng: -17.4467, city: 'Dakar', district: 'Plateau' },
    owner: { id: '3', name: 'Marie Diop', phone: '+221 77 555 12 34', email: 'marie@example.com' },
    amenities: [
      { id: '1', name: 'Club House', icon: 'faHome', available: true },
      { id: '2', name: 'Parking', icon: 'faParking', available: true }
    ],
    openingHours: {
      monday: { open: '06:00', close: '21:00', closed: false },
      tuesday: { open: '06:00', close: '21:00', closed: false },
      wednesday: { open: '06:00', close: '21:00', closed: false },
      thursday: { open: '06:00', close: '21:00', closed: false },
      friday: { open: '06:00', close: '21:00', closed: false },
      saturday: { open: '06:00', close: '21:00', closed: false },
      sunday: { open: '06:00', close: '21:00', closed: false }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const sports: SportType[] = ['padel', 'football', 'tennis', 'basketball']
const amenitiesList = ['Parking', 'Douches', 'WiFi', 'Vestiaires', 'Éclairage', 'Club House']

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSport, setSelectedSport] = useState<SportType | ''>('')
  const [priceRange, setPriceRange] = useState([10000, 50000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('distance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favoriteTerrains, setFavoriteTerrains] = useState<string[]>([])
  const [filteredResults, setFilteredResults] = useState(mockSearchResults)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    filterResults(e.target.value, selectedSport, priceRange, selectedAmenities)
  }

  const handleSportChange = (sport: SportType | '') => {
    setSelectedSport(sport)
    filterResults(searchQuery, sport, priceRange, selectedAmenities)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    filterResults(searchQuery, selectedSport, value, selectedAmenities)
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked 
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter(a => a !== amenity)
    setSelectedAmenities(newAmenities)
    filterResults(searchQuery, selectedSport, priceRange, newAmenities)
  }

  const filterResults = (query: string, sport: SportType | '', price: number[], amenities: string[]) => {
    let filtered = mockSearchResults

    // Filter by search query
    if (query) {
      filtered = filtered.filter(terrain => 
        terrain.name.toLowerCase().includes(query.toLowerCase()) ||
        terrain.address.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Filter by sport
    if (sport) {
      filtered = filtered.filter(terrain => terrain.sport === sport)
    }

    // Filter by price range
    filtered = filtered.filter(terrain => 
      terrain.price >= price[0] && terrain.price <= price[1]
    )

    // Filter by amenities
    if (amenities.length > 0) {
      filtered = filtered.filter(terrain =>
        amenities.some(amenity => 
          terrain.amenities.some(terrainAmenity => terrainAmenity.name === amenity)
        )
      )
    }

    setFilteredResults(filtered)
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

  const clearFilters = () => {
    setSelectedSport('')
    setPriceRange([10000, 50000])
    setSelectedAmenities([])
    setFilteredResults(mockSearchResults)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title="Recherche"
        showSearch={false}
      />

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray w-5 h-5" 
          />
          <Input
            type="text"
            placeholder="Rechercher un terrain, une zone..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-12 text-base font-medium border-light-gray focus:border-primary"
          />
        </div>

        {/* Quick Filters & Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
                  Filtres
                  {(selectedSport || selectedAmenities.length > 0) && (
                    <Badge className="bg-primary text-white text-xs">
                      {(selectedSport ? 1 : 0) + selectedAmenities.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filtres de recherche</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche pour trouver le terrain parfait
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Sport Filter */}
                  <div>
                    <label className="text-sm font-medium text-dark mb-3 block">Sport</label>
                    <Select value={selectedSport} onValueChange={handleSportChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les sports</SelectItem>
                        {sports.map(sport => (
                          <SelectItem key={sport} value={sport}>
                            {sport.charAt(0).toUpperCase() + sport.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium text-dark mb-3 block">
                      Prix par heure: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} CFA
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      max={50000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-medium text-dark mb-3 block">Équipements</label>
                    <div className="grid grid-cols-2 gap-3">
                      {amenitiesList.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                          />
                          <label htmlFor={amenity} className="text-sm text-gray">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button onClick={clearFilters} variant="outline" className="flex-1">
                      Effacer
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary-dark">
                      Appliquer
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex border border-light-gray rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <FontAwesomeIcon icon={faTableCellsLarge} className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <FontAwesomeIcon icon={faList} className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedSport || selectedAmenities.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedSport && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
                <button onClick={() => handleSportChange('')} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </Badge>
            )}
            {selectedAmenities.map(amenity => (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                {amenity}
                <button 
                  onClick={() => handleAmenityChange(amenity, false)} 
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-dark">
            {filteredResults.length} terrain{filteredResults.length > 1 ? 's' : ''} trouvé{filteredResults.length > 1 ? 's' : ''}
          </h2>
          <Button variant="ghost" size="sm" className="text-primary">
            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4 mr-2" />
            Voir sur la carte
          </Button>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid gap-6' : 'space-y-4'}>
            {filteredResults.map((terrain) => (
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
        ) : (
          <div className="text-center py-12">
            <div className="text-gray text-lg mb-2">Aucun terrain trouvé</div>
            <p className="text-gray mb-4">Essayez de modifier vos critères de recherche</p>
            <Button onClick={clearFilters} variant="outline">
              Effacer les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 