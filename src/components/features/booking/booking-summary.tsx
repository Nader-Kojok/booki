"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faCalendarCheck, 
  faClock, 
  faMapPin, 
  faMoneyBill, 
  faInfoCircle,
  faPhone,
  faEdit
} from "@fortawesome/free-solid-svg-icons"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  price: number
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

interface BookingSummaryProps {
  terrain: Terrain
  selectedDate: Date
  selectedSlot: TimeSlot
  onEdit?: () => void
  onConfirm?: () => void
  isConfirming?: boolean
}

export const BookingSummary = ({
  terrain,
  selectedDate,
  selectedSlot,
  onEdit,
  onConfirm,
  isConfirming = false
}: BookingSummaryProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const calculateTotal = () => {
    const basePrice = selectedSlot.price
    const serviceFee = Math.round(basePrice * 0.05) // 5% service fee
    const total = basePrice + serviceFee
    
    return {
      basePrice,
      serviceFee,
      total
    }
  }

  const { basePrice, serviceFee, total } = calculateTotal()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-primary" />
          Récapitulatif de réservation
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Terrain Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{terrain.name}</h3>
              <Badge variant="outline" className="bg-sport-padel/10 text-primary border-primary/20 mt-1">
                {terrain.sport}
              </Badge>
            </div>
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-1" />
                Modifier
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
            <span className="text-sm">{terrain.address}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            <span className="text-sm">{terrain.phone}</span>
          </div>
        </div>

        <Separator />

        {/* Date & Time */}
        <div className="space-y-4">
          <h4 className="font-semibold">Détails de la réservation</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {formatDate(selectedDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Heure</p>
                  <p className="text-sm text-gray-600">
                    {selectedSlot.startTime} - {selectedSlot.endTime} (1 heure)
                  </p>
                </div>
              </div>
              {selectedSlot.popularity === 'high' && (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  Très demandé
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-4">
          <h4 className="font-semibold">Détail des prix</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Réservation terrain (1h)</span>
              <span className="font-semibold">{basePrice.toLocaleString()} CFA</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Frais de service</span>
              <span>{serviceFee.toLocaleString()} CFA</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{total.toLocaleString()} CFA</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 space-y-2">
              <p className="font-semibold">Informations importantes :</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Arrivez 15 minutes avant votre créneau</li>
                <li>Annulation gratuite jusqu&apos;à 2h avant</li>
                <li>Matériel disponible sur place (raquettes, balles)</li>
                <li>Vestiaires et douches inclus</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-semibold">Modes de paiement acceptés</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">OM</span>
              </div>
              <span className="text-sm font-medium">Orange Money</span>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
              <span className="text-sm font-medium">Wave</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        {onConfirm && (
          <Button 
            onClick={onConfirm}
            className="w-full h-12 text-base bg-primary hover:bg-primary-dark"
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2 animate-spin" />
                Confirmation en cours...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoneyBill} className="w-4 h-4 mr-2" />
                Confirmer et payer {total.toLocaleString()} CFA
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 