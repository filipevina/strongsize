'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { CreditCard, Crown, Zap } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

export default function SubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth');
      return;
    }
    setUser(user);

    // Verificar se já é premium
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium, premium_until')
      .eq('id', user.id)
      .single();

    if (profile?.is_premium && profile?.premium_until) {
      const premiumUntil = new Date(profile.premium_until);
      const now = new Date();
      if (premiumUntil > now) {
        setIsPremium(true);
        const diffTime = Math.abs(premiumUntil.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays);
      }
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // Aqui você integraria com um gateway de pagamento real (Stripe, Mercado Pago, etc)
      // Por enquanto, vamos simular a ativação de 30 dias
      
      const premiumUntil = new Date();
      premiumUntil.setMonth(premiumUntil.getMonth() + 1);

      const { error } = await supabase
        .from('profiles')
        .update({
          is_premium: true,
          premium_until: premiumUntil.toISOString(),
          subscription_plan: 'monthly',
        })
        .eq('id', user.id);

      if (error) throw error;

      alert('Assinatura ativada com sucesso! 🎉');
      router.push('/');
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (isPremium && daysRemaining !== null && daysRemaining > 3) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Crown size={80} className="mx-auto mb-6 text-yellow-500" />
            <h1 className="text-4xl font-black text-white mb-4">
              VOCÊ JÁ É PREMIUM!
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              Aproveite todos os benefícios exclusivos da sua assinatura
            </p>
            <p className="text-green-400 font-bold text-xl mb-8">
              {daysRemaining} dias restantes
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform"
            >
              VOLTAR AO APP
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-6 py-2 rounded-full mb-4">
            <Crown className="inline mr-2" size={20} />
            {isPremium && daysRemaining !== null && daysRemaining <= 3 
              ? `RENOVE AGORA - ${daysRemaining} DIAS RESTANTES` 
              : 'ASSINE AGORA'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            CONTINUE TRANSFORMANDO SEU CORPO
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isPremium && daysRemaining !== null && daysRemaining <= 3
              ? 'Seu período grátis está acabando! Continue com acesso total por apenas R$ 19,90/mês'
              : 'Acesso completo a todos os recursos exclusivos para transformar seu corpo e mente'}
          </p>
        </div>

        {/* Plano Único */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#FF0000]/20 to-[#CC0000]/20 rounded-2xl p-8 border-2 border-[#FF0000] relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-500 text-black font-black px-4 py-1 rounded-full text-sm">
              MELHOR CUSTO-BENEFÍCIO
            </div>
            <div className="text-center mb-6">
              <Zap className="mx-auto mb-4 text-yellow-500" size={64} />
              <h3 className="text-3xl font-black text-white mb-2">PLANO MENSAL</h3>
              <div className="mb-4">
                <span className="text-6xl font-black text-white">R$ 19,90</span>
                <span className="text-gray-400 text-xl">/mês</span>
              </div>
              <p className="text-gray-300 mb-6">
                Cancele quando quiser, sem multas
              </p>
            </div>

            {/* Benefícios */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Acesso completo a todos os treinos</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Cardápios personalizados</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Conteúdo exclusivo Hormônios Alpha</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Scanner de calorias ilimitado</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Suporte prioritário</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Novos conteúdos mensalmente</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black py-4 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              <CreditCard size={24} />
              {loading ? 'PROCESSANDO...' : 'ASSINAR POR R$ 19,90/MÊS'}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Pagamento seguro via cartão de crédito
            </p>
          </div>
        </div>

        {/* Garantia */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-black text-white mb-2">
              🛡️ GARANTIA DE 7 DIAS
            </h3>
            <p className="text-gray-300">
              Não gostou? Devolvemos 100% do seu dinheiro sem perguntas. 
              Estamos confiantes que você vai amar!
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2">Como funciona o pagamento?</h4>
              <p className="text-gray-400 text-sm">
                Aceitamos cartão de crédito. O pagamento é processado de forma segura e você recebe acesso imediato.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-400 text-sm">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2">O que acontece após o período de assinatura?</h4>
              <p className="text-gray-400 text-sm">
                Sua assinatura renova automaticamente todo mês. Você pode cancelar antes do vencimento para não ser cobrado novamente.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2">E se meu período grátis acabar?</h4>
              <p className="text-gray-400 text-sm">
                Após os 3 dias grátis, você precisa assinar para continuar usando o app. O valor é apenas R$ 19,90/mês.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
