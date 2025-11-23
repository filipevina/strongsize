'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('Service Worker registrado com sucesso:', registration.scope)
          },
          (error) => {
            console.log('Falha ao registrar Service Worker:', error)
          }
        )
      })
    }

    // Capturar evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalar o app')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom">
      <button
        onClick={() => setShowInstallPrompt(false)}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Download className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Instalar StrongSize</h3>
          <p className="text-sm text-white/90 mb-3">
            Instale nosso app no seu celular e tenha acesso rápido a todos os recursos!
          </p>
          <Button
            onClick={handleInstallClick}
            className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold"
          >
            Instalar Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
