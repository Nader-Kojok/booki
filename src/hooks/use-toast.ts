"use client"

import { useState, useCallback } from "react"

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

let toastId = 0

export const useToast = () => {
  const [state, setState] = useState<ToastState>({ toasts: [] })

  const showToast = useCallback((
    message: string, 
    type: Toast['type'] = 'info', 
    duration = 4000
  ) => {
    const id = (++toastId).toString()
    const toast: Toast = { id, message, type, duration }

    setState(prev => ({
      toasts: [...prev.toasts, toast]
    }))

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        setState(prev => ({
          toasts: prev.toasts.filter(t => t.id !== id)
        }))
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setState(prev => ({
      toasts: prev.toasts.filter(t => t.id !== id)
    }))
  }, [])

  const removeAllToasts = useCallback(() => {
    setState({ toasts: [] })
  }, [])

  return {
    toasts: state.toasts,
    showToast,
    removeToast,
    removeAllToasts,
    success: (message: string, duration?: number) => showToast(message, 'success', duration),
    error: (message: string, duration?: number) => showToast(message, 'error', duration),
    info: (message: string, duration?: number) => showToast(message, 'info', duration),
    warning: (message: string, duration?: number) => showToast(message, 'warning', duration),
  }
} 