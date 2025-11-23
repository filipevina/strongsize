'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, Crown, Shield, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [isPremium, setIsPremium] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        if (user.user_metadata?.name) {
          setUserName(user.user_metadata.name)
        }

        // Verificar status premium e admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_premium, premium_until, is_admin')
          .eq('id', user.id)
          .single()

        if (profile?.is_premium && profile?.premium_until) {
          const premiumUntil = new Date(profile.premium_until)
          const now = new Date()
          if (premiumUntil > now) {
            setIsPremium(true)
            const diffTime = Math.abs(premiumUntil.getTime() - now.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            setDaysRemaining(diffDays)
          }
        }

        if (profile?.is_admin) {
          setIsAdmin(true)
        }
      }
    }
    getUserData()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Erro ao fazer logout')
    } else {
      toast.success('Logout realizado com sucesso!')
      router.push('/auth')
    }
  }

  const menuItems = [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Treino', href: '#treino' },
    { label: 'Scanner', href: '#scanner' },
    { label: 'Nutrição', href: '#nutricao' },
    { label: 'Hormônios', href: '#hormonios' },
    { label: 'Feed', href: '#feed' },
    { label: 'Loja', href: '#loja' },
  ]

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-[#FF0000]" />
            <h1 className="text-2xl font-black bg-gradient-to-r from-[#FF0000] to-[#CC0000] bg-clip-text text-transparent">
              StrongSize
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            
            {/* Premium Status */}
            {isPremium && daysRemaining !== null && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-4 py-2 rounded-full">
                <span className="text-yellow-500 font-bold text-sm flex items-center gap-2">
                  <Crown size={16} />
                  {daysRemaining <= 3 ? `${daysRemaining} dias restantes` : 'Premium Ativo'}
                </span>
              </div>
            )}

            {/* Renovar Assinatura */}
            {isPremium && daysRemaining !== null && daysRemaining <= 3 && (
              <a
                href="/subscription"
                className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-4 py-2 rounded-full hover:scale-105 transition-transform text-sm"
              >
                RENOVAR R$ 19,90
              </a>
            )}

            {/* Admin Link */}
            {isAdmin && (
              <a
                href="/admin"
                className="bg-red-500/20 text-red-500 font-bold px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all text-sm flex items-center gap-2"
              >
                <Shield size={16} />
                ADMIN
              </a>
            )}
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-700">
              {userName && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{userName}</span>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className="text-slate-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-slate-800">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-slate-300 hover:text-white transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            
            {/* Premium Status Mobile */}
            {isPremium && daysRemaining !== null && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-4 py-2 rounded-full text-center">
                <span className="text-yellow-500 font-bold text-sm">
                  <Crown className="inline mr-2" size={16} />
                  {daysRemaining <= 3 ? `${daysRemaining} dias restantes` : 'Premium Ativo'}
                </span>
              </div>
            )}

            {/* Renovar Mobile */}
            {isPremium && daysRemaining !== null && daysRemaining <= 3 && (
              <a
                href="/subscription"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-4 py-2 rounded-full text-center"
              >
                RENOVAR R$ 19,90
              </a>
            )}

            {/* Admin Link Mobile */}
            {isAdmin && (
              <a
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block bg-red-500/20 text-red-500 font-bold px-4 py-2 rounded-lg text-center"
              >
                <Shield className="inline mr-2" size={16} />
                ADMIN
              </a>
            )}
            
            {/* Mobile User Info & Logout */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              {userName && (
                <div className="flex items-center space-x-2 text-slate-300 py-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{userName}</span>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
