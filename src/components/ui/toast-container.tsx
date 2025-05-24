"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faCheckCircle, 
  faTimesCircle, 
  faInfoCircle, 
  faExclamationTriangle,
  faTimes
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "./button"

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return faCheckCircle
      case 'error':
        return faTimesCircle
      case 'warning':
        return faExclamationTriangle
      case 'info':
      default:
        return faInfoCircle
    }
  }

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getIconColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      case 'info':
      default:
        return 'text-blue-600'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-start gap-3 p-4 rounded-lg border shadow-lg
            animate-in slide-in-from-right duration-300
            ${getToastStyles(toast.type)}
          `}
        >
          <FontAwesomeIcon 
            icon={getToastIcon(toast.type)} 
            className={`w-5 h-5 mt-0.5 ${getIconColor(toast.type)}`}
          />
          
          <div className="flex-1 text-sm font-medium">
            {toast.message}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(toast.id)}
            className="h-6 w-6 p-0 hover:bg-black/10"
          >
            <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  )
} 