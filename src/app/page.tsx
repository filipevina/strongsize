'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Navbar from '@/components/custom/navbar'
import CalorieScanner from '@/components/custom/calorie-scanner'
import FeedSocial from '@/components/custom/feed-social'
import HormonesAlpha from '@/components/custom/hormones-alpha'
import NutritionSection from '@/components/custom/nutrition-section'
import ProgressDashboard from '@/components/custom/progress-dashboard'
import ShopSection from '@/components/custom/shop-section'
import WorkoutGenerator from '@/components/custom/workout-generator'
import { PWAInstaller } from '@/components/pwa-installer'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth')
      return
    }
    
    setUser(user)

    // Verificar status premium
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium, premium_until')
      .eq('id', user.id)
      .single()

    if (profile?.is_premium && profile?.premium_until) {
      const premiumUntil = new Date(profile.premium_until)
      if (premiumUntil > new Date()) {
        setIsPremium(true)
      }
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <PWAInstaller />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Dashboard de Progresso */}
        <section id="dashboard">
          <ProgressDashboard />
        </section>

        {/* Gerador de Treino */}
        <section id="treino">
          <WorkoutGenerator />
        </section>

        {/* Scanner de Calorias */}
        <section id="scanner">
          <CalorieScanner />
        </section>

        {/* Seção de Nutrição */}
        <section id="nutricao">
          <NutritionSection isPremium={isPremium} />
        </section>

        {/* Hormônios Alpha */}
        <section id="hormonios">
          <HormonesAlpha isPremium={isPremium} />
        </section>

        {/* Feed Social */}
        <section id="feed">
          <FeedSocial />
        </section>

        {/* Loja */}
        <section id="loja">
          <ShopSection />
        </section>
      </div>
    </main>
  )
}
