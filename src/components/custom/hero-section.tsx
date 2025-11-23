'use client';

import { Dumbbell, Flame, Trophy, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#FF0000]/10 to-black" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF0000]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF0000]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/80dfe2b1-532f-4296-b02f-3b998d86db9a.png" 
            alt="STRONGSIZE Logo" 
            className="h-24 w-auto md:h-32 animate-fade-in"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-[#FF0000] to-white bg-clip-text text-transparent animate-gradient">
            STRONGSIZE
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-bold">
          SEU APP COMPLETO DE MUSCULAÇÃO
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Treinos personalizados, nutrição inteligente, coach com IA e comunidade fitness. 
          Tudo que você precisa para alcançar seus objetivos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="#workouts"
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FF0000]/50"
          >
            COMEÇAR AGORA 🔥
          </a>
          <a 
            href="#coach"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 border border-white/20"
          >
            FALAR COM O COACH 💪
          </a>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all duration-300 hover:scale-105">
            <Dumbbell className="w-10 h-10 text-[#FF0000] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Treinos</h3>
            <p className="text-gray-400 text-sm">Personalizados com IA</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all duration-300 hover:scale-105">
            <Flame className="w-10 h-10 text-[#FF0000] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Nutrição</h3>
            <p className="text-gray-400 text-sm">Dietas e receitas</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all duration-300 hover:scale-105">
            <Zap className="w-10 h-10 text-[#FF0000] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Coach IA</h3>
            <p className="text-gray-400 text-sm">Motivação 24/7</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all duration-300 hover:scale-105">
            <Trophy className="w-10 h-10 text-[#FF0000] mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Progresso</h3>
            <p className="text-gray-400 text-sm">Acompanhe evolução</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <p className="text-gray-500 text-sm mb-2">Role para explorar</p>
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-500 rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}
