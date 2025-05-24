"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  price: number
  available: boolean
  reserved?: boolean
  popularity?: 'low' | 'medium' | 'high'
}

interface TimeSlotPickerProps {
  selectedDate?: Date
  terrainId: string
  onSlotSelect: (slot: TimeSlot | null) => void
  selectedSlot?: TimeSlot | null
}

// Mock time slots data - in real app this would come from API
const generateTimeSlots = (): TimeSlot[] => {
  const baseSlots = [
    { startTime: "08:00", endTime: "09:00", price: 12000, available: true, popularity: 'low' as const },
    { startTime: "09:00", endTime: "10:00", price: 12000, available: true, popularity: 'medium' as const },
    { startTime: "10:00", endTime: "11:00", price: 15000, available: true, popularity: 'high' as const },
    { startTime: "11:00", endTime: "12:00", price: 15000, available: false, popularity: 'high' as const },
    { startTime: "12:00", endTime: "13:00", price: 15000, available: true, popularity: 'medium' as const },
    { startTime: "13:00", endTime: "14:00", price: 12000, available: true, popularity: 'low' as const },
    { startTime: "14:00", endTime: "15:00", price: 15000, available: true, popularity: 'medium' as const },
    { startTime: "15:00", endTime: "16:00", price: 15000, available: false, reserved: true, popularity: 'high' as const },
    { startTime: "16:00", endTime: "17:00", price: 18000, available: true, popularity: 'high' as const },
    { startTime: "17:00", endTime: "18:00", price: 18000, available: true, popularity: 'high' as const },
    { startTime: "18:00", endTime: "19:00", price: 20000, available: true, popularity: 'high' as const },
    { startTime: "19:00", endTime: "20:00", price: 20000, available: false, popularity: 'high' as const },
    { startTime: "20:00", endTime: "21:00", price: 18000, available: true, popularity: 'medium' as const },
    { startTime: "21:00", endTime: "22:00", price: 15000, available: true, popularity: 'low' as const },
  ]

  return baseSlots.map((slot, index) => ({
    ...slot,
    id: `slot-${index}`,
  }))
}

const getPopularityColor = (popularity: string) => {
  switch (popularity) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'medium':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPopularityLabel = (popularity: string) => {
  switch (popularity) {
    case 'high':
      return 'Très demandé'
    case 'medium':
      return 'Populaire'
    case 'low':
      return 'Calme'
    default:
      return ''
  }
}

export const TimeSlotPicker = ({
  selectedDate,
  terrainId,
  onSlotSelect,
  selectedSlot
}: TimeSlotPickerProps) => {
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots())

  if (!selectedDate) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-primary" />
            Créneaux disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FontAwesomeIcon icon={faClock} className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Sélectionnez d&apos;abord une date pour voir les créneaux disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const availableSlots = timeSlots.filter(slot => slot.available)
  const unavailableSlots = timeSlots.filter(slot => !slot.available)

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available) return
    
    if (selectedSlot?.id === slot.id) {
      onSlotSelect(null) // Deselect if clicking the same slot
    } else {
      onSlotSelect(slot)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-primary" />
          Créneaux pour le {selectedDate.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long' 
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Time Periods Info */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800">Matinée</div>
            <div className="text-blue-600">8h - 12h</div>
            <div className="text-blue-800 font-bold">Moins cher</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <div className="font-semibold text-orange-800">Après-midi</div>
            <div className="text-orange-600">12h - 17h</div>
            <div className="text-orange-800 font-bold">Prix normal</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="font-semibold text-purple-800">Soirée</div>
            <div className="text-purple-600">17h - 22h</div>
            <div className="text-purple-800 font-bold">Prime time</div>
          </div>
        </div>

        {/* Available Slots */}
        {availableSlots.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Créneaux disponibles ({availableSlots.length})
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                  className={`h-auto p-4 justify-start ${
                    selectedSlot?.id === slot.id 
                      ? "bg-primary hover:bg-primary-dark border-primary" 
                      : "hover:bg-primary/5 hover:border-primary"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                        <span className="font-semibold">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getPopularityColor(slot.popularity || 'medium')}
                      >
                        {getPopularityLabel(slot.popularity || 'medium')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-lg">
                        {slot.price.toLocaleString()} CFA
                      </span>
                      <span className="text-gray-600">
                        1 heure
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Unavailable Slots */}
        {unavailableSlots.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-red-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Créneaux indisponibles ({unavailableSlots.length})
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unavailableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 opacity-60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-600 line-through">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      {slot.reserved ? 'Réservé' : 'Complet'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="line-through">
                      {slot.price.toLocaleString()} CFA
                    </span>
                    <span>1 heure</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No slots available */}
        {availableSlots.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faClock} className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-red-800 mb-2">Aucun créneau disponible</h3>
            <p className="text-gray-600 text-sm">
              Tous les créneaux sont réservés pour cette date. 
              Essayez une autre date ou contactez-nous pour la liste d'attente.
            </p>
          </div>
        )}

        {/* Selected Slot Summary */}
        {selectedSlot && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-primary mb-3">Créneau sélectionné</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Heure:</span>
                  <p className="font-semibold">
                    {selectedSlot.startTime} - {selectedSlot.endTime}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Prix:</span>
                  <p className="font-semibold text-primary">
                    {selectedSlot.price.toLocaleString()} CFA
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Durée:</span>
                  <p className="font-semibold">1 heure</p>
                </div>
                <div>
                  <span className="text-gray-600">Popularité:</span>
                  <Badge 
                    variant="outline" 
                    className={getPopularityColor(selectedSlot.popularity || 'medium')}
                  >
                    {getPopularityLabel(selectedSlot.popularity || 'medium')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
} 