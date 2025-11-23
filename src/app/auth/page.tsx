'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Dumbbell } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Estados para Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Estados para Cadastro
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupAge, setSignupAge] = useState('')
  const [signupWeight, setSignupWeight] = useState('')
  const [signupHeight, setSignupHeight] = useState('')
  const [signupGoal, setSignupGoal] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (error) throw error

      toast.success('Login realizado com sucesso!')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            name: signupName,
            age: parseInt(signupAge),
            weight: parseFloat(signupWeight),
            height: parseFloat(signupHeight),
            goal: signupGoal,
          }
        }
      })

      if (authError) throw authError

      // Ativar trial de 3 dias automaticamente
      if (authData.user) {
        const trialEndDate = new Date()
        trialEndDate.setDate(trialEndDate.getDate() + 3)

        await supabase
          .from('profiles')
          .update({
            is_premium: true,
            premium_until: trialEndDate.toISOString(),
            subscription_plan: 'trial',
          })
          .eq('id', authData.user.id)
      }

      toast.success('Cadastro realizado! Você ganhou 3 dias grátis! 🎉')
      
      // Limpar formulário
      setSignupName('')
      setSignupEmail('')
      setSignupPassword('')
      setSignupAge('')
      setSignupWeight('')
      setSignupHeight('')
      setSignupGoal('')

      // Redirecionar para home após cadastro
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-[#FF0000]" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-[#FF0000] to-[#CC0000] bg-clip-text text-transparent">
              StrongSize
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Transforme seu corpo e mente</p>
          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 font-bold text-sm">
              🎁 3 DIAS GRÁTIS ao criar sua conta!
            </p>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Entrar na sua conta</CardTitle>
                <CardDescription className="text-slate-400">
                  Digite seu email e senha para acessar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#990000] text-white font-bold"
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Criar nova conta</CardTitle>
                <CardDescription className="text-slate-400">
                  Preencha seus dados e ganhe 3 dias grátis!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-white">Nome Completo</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-age" className="text-white">Idade</Label>
                      <Input
                        id="signup-age"
                        type="number"
                        placeholder="25"
                        value={signupAge}
                        onChange={(e) => setSignupAge(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-weight" className="text-white">Peso (kg)</Label>
                      <Input
                        id="signup-weight"
                        type="number"
                        step="0.1"
                        placeholder="75"
                        value={signupWeight}
                        onChange={(e) => setSignupWeight(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-height" className="text-white">Altura (cm)</Label>
                    <Input
                      id="signup-height"
                      type="number"
                      step="0.1"
                      placeholder="175"
                      value={signupHeight}
                      onChange={(e) => setSignupHeight(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-goal" className="text-white">Objetivo</Label>
                    <select
                      id="signup-goal"
                      value={signupGoal}
                      onChange={(e) => setSignupGoal(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Selecione seu objetivo</option>
                      <option value="perder_peso">Perder Peso</option>
                      <option value="ganhar_massa">Ganhar Massa Muscular</option>
                      <option value="definicao">Definição Muscular</option>
                      <option value="saude">Saúde e Bem-estar</option>
                    </select>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#990000] text-white font-bold"
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta e Ganhar 3 Dias Grátis'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
