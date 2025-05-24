"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCalendarCheck, faClock, faMoneyBill } from "@fortawesome/free-solid-svg-icons"

import { AvailabilityCalendar } from "@/components/features/booking/availability-calendar"
import { TimeSlotPicker } from "@/components/features/booking/time-slot-picker"
import { BookingSummary } from "@/components/features/booking/booking-summary"
import { BookingConfirmationModal } from "@/components/features/booking/booking-confirmation-modal"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  price: number
  available: boolean
  reserved?: boolean
  popularity?: 'low' | 'medium' | 'high'
}

interface Terrain {
  id: string
  name: string
  sport: string
  address: string
  phone: string
  image: string
}

// Mock terrain data - in real app this would come from API/props
const mockTerrain: Terrain = {
  id: "1",
  name: "Club Sportif Almadies",
  sport: "Padel",
  address: "Route des Almadies, Dakar",
  phone: "+221 33 820 10 15",
  image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8"
}

function BookingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const terrainId = searchParams.get('terrain') || '1'

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [currentStep, setCurrentStep] = useState<'date' | 'time' | 'summary'>('date')
  const [isConfirming, setIsConfirming] = useState(false)
  
  // Modal states
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    status: 'success' | 'error' | 'pending'
    bookingId?: string
    errorMessage?: string
  }>({
    isOpen: false,
    status: 'pending'
  })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedSlot(null) // Reset slot when date changes
    
    if (date) {
      setCurrentStep('time')
    }
  }

  const handleSlotSelect = (slot: TimeSlot | null) => {
    setSelectedSlot(slot)
    
    if (slot) {
      setCurrentStep('summary')
    }
  }

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) return
    
    setIsConfirming(true)
    
    // Show pending modal
    setModalState({
      isOpen: true,
      status: 'pending'
    })
    
    try {
      // Simulate API call for booking confirmation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate random success/error for demo
      const isSuccess = Math.random() > 0.3 // 70% success rate
      
      if (isSuccess) {
        const bookingId = `BK${Date.now()}`
        
        // Show success modal
        setModalState({
          isOpen: true,
          status: 'success',
          bookingId
        })
      } else {
        // Show error modal
        setModalState({
          isOpen: true,
          status: 'error',
          errorMessage: 'Le créneau sélectionné n\'est plus disponible. Veuillez choisir un autre horaire.'
        })
      }
    } catch (error) {
      console.error('Booking error:', error)
      
      // Show error modal
      setModalState({
        isOpen: true,
        status: 'error',
        errorMessage: 'Une erreur réseau s\'est produite. Vérifiez votre connexion et réessayez.'
      })
    } finally {
      setIsConfirming(false)
    }
  }

  const handleBack = () => {
    if (currentStep === 'summary') {
      setCurrentStep('time')
    } else if (currentStep === 'time') {
      setCurrentStep('date')
      setSelectedSlot(null)
    } else {
      router.back()
    }
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case 'date': return 1
      case 'time': return 2
      case 'summary': return 3
      default: return 1
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'date': return 'Choisir une date'
      case 'time': return 'Sélectionner un créneau'
      case 'summary': return 'Confirmer la réservation'
      default: return 'Réservation'
    }
  }

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
    
    // If booking was successful, redirect to bookings page
    if (modalState.status === 'success') {
      setTimeout(() => {
        router.push('/bookings')
      }, 300)
    }
  }

  const handleRetryBooking = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
    // Reset to time selection to try again
    setCurrentStep('time')
    setSelectedSlot(null)
  }

  const handleViewBookings = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
    router.push('/bookings')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-primary/10"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            </Button>
            
            <div className="flex-1">
              <h1 className="text-xl font-heading font-semibold">
                Réserver {mockTerrain.name}
              </h1>
              <p className="text-sm text-gray-600">
                {getStepTitle()} - Étape {getStepNumber()}/3
              </p>
            </div>

            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {mockTerrain.sport}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Step 1 */}
            <div className={`flex items-center gap-2 ${
              currentStep === 'date' ? 'text-primary' : 
              selectedDate ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 'date' ? 'bg-primary text-white' :
                selectedDate ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {selectedDate && currentStep !== 'date' ? (
                  <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                ) : '1'}
              </div>
              <span className="hidden sm:inline text-sm font-medium">Date</span>
            </div>

            <div className="flex-1 h-px bg-gray-200"></div>

            {/* Step 2 */}
            <div className={`flex items-center gap-2 ${
              currentStep === 'time' ? 'text-primary' : 
              selectedSlot ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 'time' ? 'bg-primary text-white' :
                selectedSlot ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {selectedSlot && currentStep !== 'time' ? (
                  <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                ) : '2'}
              </div>
              <span className="hidden sm:inline text-sm font-medium">Heure</span>
            </div>

            <div className="flex-1 h-px bg-gray-200"></div>

            {/* Step 3 */}
            <div className={`flex items-center gap-2 ${
              currentStep === 'summary' ? 'text-primary' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 'summary' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <FontAwesomeIcon icon={faMoneyBill} className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Paiement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Steps */}
          <div className="space-y-6">
            {/* Step 1: Date Selection */}
            {currentStep === 'date' && (
              <AvailabilityCalendar
                terrainId={terrainId}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            )}

            {/* Step 2: Time Selection */}
            {currentStep === 'time' && (
              <TimeSlotPicker
                terrainId={terrainId}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
              />
            )}

            {/* Step 3: Summary */}
            {currentStep === 'summary' && selectedDate && selectedSlot && (
              <BookingSummary
                terrain={mockTerrain}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onEdit={() => setCurrentStep('time')}
                onConfirm={handleConfirmBooking}
                isConfirming={isConfirming}
              />
            )}
          </div>

          {/* Right Column - Terrain Info (Sticky) */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Terrain sélectionné</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{mockTerrain.name}</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-1">
                    {mockTerrain.sport}
                  </Badge>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>{mockTerrain.address}</p>
                  <p>{mockTerrain.phone}</p>
                </div>

                {selectedDate && (
                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">Récapitulatif</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {selectedDate.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      {selectedSlot && (
                        <>
                          <div className="flex justify-between">
                            <span>Heure:</span>
                            <span className="font-medium">
                              {selectedSlot.startTime} - {selectedSlot.endTime}
                            </span>
                          </div>
                          <div className="flex justify-between text-base font-semibold text-primary">
                            <span>Total:</span>
                            <span>{(selectedSlot.price * 1.05).toLocaleString()} CFA</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        status={modalState.status}
        bookingId={modalState.bookingId}
        terrain={mockTerrain}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot || undefined}
        errorMessage={modalState.errorMessage}
        onRetry={handleRetryBooking}
        onViewBookings={handleViewBookings}
      />
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  )
} 