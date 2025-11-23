'use client';

import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

export default function ProgressDashboard() {
  const stats = [
    { label: 'Peso Atual', value: '82kg', change: '-3kg', icon: <TrendingUp /> },
    { label: 'Treinos/Semana', value: '5', change: '+1', icon: <Target /> },
    { label: 'Dias Consecutivos', value: '45', change: '+45', icon: <Calendar /> },
    { label: 'PRs Batidos', value: '12', change: '+3', icon: <Award /> },
  ];

  const weeklyProgress = [
    { day: 'Seg', completed: true },
    { day: 'Ter', completed: true },
    { day: 'Qua', completed: true },
    { day: 'Qui', completed: true },
    { day: 'Sex', completed: false },
    { day: 'Sáb', completed: false },
    { day: 'Dom', completed: false },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          SEU PROGRESSO
        </h2>
        <p className="text-gray-400 text-lg">
          Acompanhe sua evolução e conquistas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#FF0000]">{stat.icon}</div>
              <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Weekly Progress */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-black text-white mb-6">Progresso Semanal</h3>
        <div className="flex justify-between gap-2">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`aspect-square rounded-xl mb-2 flex items-center justify-center text-2xl ${
                  day.completed
                    ? 'bg-gradient-to-br from-[#FF0000] to-[#CC0000]'
                    : 'bg-black/50 border border-white/10'
                }`}
              >
                {day.completed ? '✓' : ''}
              </div>
              <p className="text-gray-400 text-sm">{day.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight Chart Placeholder */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-black text-white mb-6">Evolução de Peso</h3>
        <div className="h-64 bg-black/50 rounded-xl border border-white/10 flex items-center justify-center">
          <p className="text-gray-400">Gráfico de evolução em breve...</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-r from-[#FF0000]/10 to-[#CC0000]/10 rounded-2xl p-8 border border-[#FF0000]/20">
        <h3 className="text-2xl font-black text-white mb-6 text-center">
          CONQUISTAS RECENTES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/50 rounded-xl p-4 text-center border border-white/10">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-white font-bold">45 Dias Consecutivos</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 text-center border border-white/10">
            <div className="text-4xl mb-2">💪</div>
            <p className="text-white font-bold">PR no Supino</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 text-center border border-white/10">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-white font-bold">100 Treinos Completos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
