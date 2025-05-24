"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faCalendarXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

interface AvailabilityData {
  [key: string]: {
    available: boolean
    slots: number
    price?: number
  }
}

interface AvailabilityCalendarProps {
  onDateSelect: (date: Date | undefined) => void
  selectedDate?: Date
}

// Mock availability data - in real app this would come from API
const mockAvailability: AvailabilityData = {
  "2024-01-15": { available: true, slots: 8, price: 15000 },
  "2024-01-16": { available: true, slots: 6, price: 15000 },
  "2024-01-17": { available: true, slots: 12, price: 15000 },
  "2024-01-18": { available: false, slots: 0 },
  "2024-01-19": { available: true, slots: 4, price: 18000 }, // Weekend price
  "2024-01-20": { available: true, slots: 10, price: 18000 },
  "2024-01-21": { available: true, slots: 8, price: 15000 },
  "2024-01-22": { available: true, slots: 12, price: 15000 },
  "2024-01-23": { available: true, slots: 6, price: 15000 },
  "2024-01-24": { available: false, slots: 0 },
  "2024-01-25": { available: true, slots: 2, price: 18000 }, // Few slots left
  "2024-01-26": { available: true, slots: 8, price: 18000 },
}

const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

const getAvailabilityStatus = (date: Date) => {
  const dateKey = formatDateKey(date)
  const availability = mockAvailability[dateKey]
  
  if (!availability || !availability.available) {
    return { status: 'unavailable', className: 'bg-gray-100 text-gray-400 line-through' }
  }
  
  if (availability.slots <= 2) {
    return { status: 'limited', className: 'bg-orange-100 text-orange-800 border-orange-200' }
  }
  
  return { status: 'available', className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' }
}

export const AvailabilityCalendar = ({
  onDateSelect,
  selectedDate
}: AvailabilityCalendarProps) => {
  const [month, setMonth] = useState<Date>(new Date())

  const modifiers = {
    available: (date: Date) => {
      const availability = mockAvailability[formatDateKey(date)]
      return availability?.available && availability.slots > 2
    },
    limited: (date: Date) => {
      const availability = mockAvailability[formatDateKey(date)]
      return availability?.available && availability.slots <= 2
    },
    unavailable: (date: Date) => {
      const availability = mockAvailability[formatDateKey(date)]
      return !availability?.available
    }
  }

  const modifiersStyles = {
    available: { backgroundColor: '#dcfce7', color: '#166534' },
    limited: { backgroundColor: '#fed7aa', color: '#9a3412' },
    unavailable: { backgroundColor: '#f3f4f6', color: '#9ca3af', textDecoration: 'line-through' }
  }

  const getSelectedDateInfo = () => {
    if (!selectedDate) return null
    
    const dateKey = formatDateKey(selectedDate)
    const availability = mockAvailability[dateKey]
    
    if (!availability) return null
    
    return availability
  }

  const selectedDateInfo = getSelectedDateInfo()

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-primary" />
          Disponibilités
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
            <span>Peu de créneaux</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
            <span>Complet</span>
          </div>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          month={month}
          onMonthChange={setMonth}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          disabled={(date) => {
            // Disable past dates
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return date < today
          }}
          className="rounded-md border"
        />

        {/* Selected Date Info */}
        {selectedDate && selectedDateInfo && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">
                    {selectedDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h4>
                  {selectedDateInfo.available ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      <FontAwesomeIcon icon={faCalendarCheck} className="w-3 h-3 mr-1" />
                      Disponible
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      <FontAwesomeIcon icon={faCalendarXmark} className="w-3 h-3 mr-1" />
                      Complet
                    </Badge>
                  )}
                </div>

                {selectedDateInfo.available && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Créneaux disponibles:</span>
                      <p className="font-semibold text-primary">{selectedDateInfo.slots} créneaux</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Prix par heure:</span>
                      <p className="font-semibold text-primary">
                        {selectedDateInfo.price?.toLocaleString()} CFA
                      </p>
                    </div>
                  </div>
                )}

                {selectedDateInfo.available && selectedDateInfo.slots <= 2 && (
                  <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div className="text-sm text-orange-800">
                      <strong>Dépêchez-vous !</strong> Il ne reste que {selectedDateInfo.slots} créneaux disponibles pour cette date.
                    </div>
                  </div>
                )}

                {!selectedDateInfo.available && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="text-sm text-red-800">
                      Aucun créneau disponible pour cette date. Essayez une autre date ou contactez-nous pour être prévenu en cas de désistement.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
} 