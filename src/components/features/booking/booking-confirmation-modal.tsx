"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faCheckCircle, 
  faTimesCircle, 
  faCalendarCheck, 
  faMapPin,
  faShareAlt,
  faPhone,
  faQrcode,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  price: number
}

interface Terrain {
  id: string
  name: string
  sport: string
  address: string
  phone: string
  image: string
}

type BookingStatus = 'success' | 'error' | 'pending'

interface BookingConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  status: BookingStatus
  bookingId?: string
  terrain?: Terrain
  selectedDate?: Date
  selectedSlot?: TimeSlot
  errorMessage?: string
  onRetry?: () => void
  onViewBookings?: () => void
}

export const BookingConfirmationModal = ({
  isOpen,
  onClose,
  status,
  bookingId,
  terrain,
  selectedDate,
  selectedSlot,
  errorMessage,
  onRetry,
  onViewBookings
}: BookingConfirmationModalProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const handleShare = async () => {
    if (!navigator.share || !terrain || !selectedDate || !selectedSlot) return
    
    try {
      await navigator.share({
        title: `Réservation ${terrain.name}`,
        text: `J'ai réservé le ${formatDate(selectedDate)} de ${selectedSlot.startTime} à ${selectedSlot.endTime}`,
        url: window.location.origin
      })
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Réservation confirmée chez ${terrain.name} le ${formatDate(selectedDate)} de ${selectedSlot.startTime} à ${selectedSlot.endTime}`)
    }
  }

  const SuccessContent = () => (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
          Réservation confirmée !
        </h3>
        <p className="text-gray-600">
          Votre terrain a été réservé avec succès
        </p>
        {bookingId && (
          <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
            #{bookingId}
          </Badge>
        )}
      </div>

      {/* Booking Details */}
      {terrain && selectedDate && selectedSlot && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4 text-gray-500" />
            <div className="text-left">
              <p className="font-semibold">{terrain.name}</p>
              <p className="text-sm text-gray-600">{terrain.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4 text-gray-500" />
            <div className="text-left">
              <p className="font-semibold">Date & Heure</p>
              <p className="text-sm text-gray-600 capitalize">
                {formatDate(selectedDate)} • {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-gray-500" />
            <div className="text-left">
              <p className="font-semibold">Contact</p>
              <p className="text-sm text-gray-600">{terrain.phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center gap-3 text-primary">
          <FontAwesomeIcon icon={faQrcode} className="w-5 h-5" />
          <div className="text-left">
            <p className="font-semibold text-sm">Code QR de confirmation</p>
            <p className="text-xs">Présentez ce code à votre arrivée</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button 
            onClick={onViewBookings}
            className="flex-1 bg-primary hover:bg-primary-dark"
          >
            Voir mes réservations
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="px-4"
          >
            <FontAwesomeIcon icon={faShareAlt} className="w-4 h-4" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="w-full"
        >
          Fermer
        </Button>
      </div>
    </div>
  )

  const ErrorContent = () => (
    <div className="text-center space-y-6">
      {/* Error Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faTimesCircle} className="w-8 h-8 text-red-600" />
        </div>
      </div>

      {/* Error Message */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
          Erreur de réservation
        </h3>
        <p className="text-gray-600 mb-4">
          {errorMessage || "Une erreur s'est produite lors de la réservation"}
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3 text-red-800">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 mt-0.5" />
            <div className="text-left text-sm">
              <p className="font-semibold">Que faire maintenant ?</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Vérifiez votre connexion internet</li>
                <li>Assurez-vous que le créneau est toujours disponible</li>
                <li>Contactez-nous si le problème persiste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onRetry}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          Réessayer
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onClose}
          className="w-full"
        >
          Annuler
        </Button>
      </div>
    </div>
  )

  const PendingContent = () => (
    <div className="text-center space-y-6">
      {/* Loading Animation */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Loading Message */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
          Confirmation en cours...
        </h3>
        <p className="text-gray-600">
          Nous traitons votre réservation, veuillez patienter
        </p>
      </div>
    </div>
  )

  const getContent = () => {
    switch (status) {
      case 'success':
        return <SuccessContent />
      case 'error':
        return <ErrorContent />
      case 'pending':
        return <PendingContent />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {status === 'success' ? 'Réservation confirmée' : 
             status === 'error' ? 'Erreur de réservation' : 
             'Confirmation en cours'}
          </DialogTitle>
        </DialogHeader>
        
        {getContent()}
      </DialogContent>
    </Dialog>
  )
} 