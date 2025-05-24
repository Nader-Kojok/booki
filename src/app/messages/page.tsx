'use client'

import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMessage, 
  faPlus, 
  faCircle
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Mock messages data
const mockMessages = [
  {
    id: '1',
    sender: 'Complexe Sportif Almadies',
    lastMessage: 'Votre réservation du 20/01 à 18h est confirmée.',
    time: '14h30',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=50&h=50&auto=format&fit=crop&face=center'
  },
  {
    id: '2',
    sender: 'Support Booki',
    lastMessage: 'Merci pour votre retour. Nous avons pris en compte vos remarques.',
    time: 'Hier',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&auto=format&fit=crop&face=center'
  },
  {
    id: '3',
    sender: 'Terrain Football Parcelles',
    lastMessage: 'N\'oubliez pas d\'apporter vos chaussures de foot pour demain !',
    time: 'Hier',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=50&h=50&auto=format&fit=crop&face=center'
  }
]

export default function MessagesPage() {
  const unreadCount = mockMessages.filter(msg => msg.unread).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        title={`Messages ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
        showSearch={false}
      />

      <div className="px-4 py-6 space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-primary hover:bg-primary-dark">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
            Nouveau message
          </Button>
        </div>

        {/* Messages List */}
        {mockMessages.length > 0 ? (
          <div className="space-y-3">
            {mockMessages.map((message) => (
              <Card key={message.id} className={`cursor-pointer transition-all hover:shadow-md ${message.unread ? 'border-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <img 
                        src={message.avatar} 
                        alt={message.sender}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                          <FontAwesomeIcon icon={faCircle} className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium truncate ${message.unread ? 'text-dark font-semibold' : 'text-dark'}`}>
                          {message.sender}
                        </h3>
                        <span className={`text-xs ${message.unread ? 'text-primary font-medium' : 'text-gray'}`}>
                          {message.time}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${message.unread ? 'text-dark font-medium' : 'text-gray'}`}>
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FontAwesomeIcon icon={faMessage} className="w-16 h-16 text-gray mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark mb-2">Aucun message</h3>
              <p className="text-gray mb-4">Vous n'avez pas encore de conversations.</p>
              <Button className="bg-primary hover:bg-primary-dark">
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                Commencer une conversation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h4 className="font-semibold text-dark mb-2">Besoin d'aide ?</h4>
            <p className="text-sm text-gray mb-3">
              Notre équipe support est disponible pour vous aider.
            </p>
            <Button variant="outline" size="sm">
              Contacter le support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 