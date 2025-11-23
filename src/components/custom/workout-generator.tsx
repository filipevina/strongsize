'use client';

import { useState } from 'react';
import { Dumbbell, Calendar, Target, TrendingUp } from 'lucide-react';
import { Gender, UserRole } from '@/lib/types';

interface WorkoutGeneratorProps {
  userGender: Gender;
  userRole: UserRole;
}

export default function WorkoutGenerator({ userGender, userRole }: WorkoutGeneratorProps) {
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    goal: '',
    experience: '',
  });
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  const generateWorkout = () => {
    // Treinos personalizados baseados no gênero
    if (userGender === 'masculino') {
      setGeneratedWorkout({
        title: 'Treino Masculino - Hipertrofia',
        days: [
          {
            day: 'Segunda - Peito e Tríceps',
            exercises: [
              'Supino Reto - 4x8-12',
              'Supino Inclinado - 4x8-12',
              'Crucifixo - 3x12-15',
              'Tríceps Testa - 4x10-12',
              'Tríceps Corda - 3x12-15',
            ],
          },
          {
            day: 'Terça - Costas e Bíceps',
            exercises: [
              'Barra Fixa - 4x máx',
              'Remada Curvada - 4x8-12',
              'Pulldown - 3x12-15',
              'Rosca Direta - 4x10-12',
              'Rosca Martelo - 3x12-15',
            ],
          },
          {
            day: 'Quarta - Pernas Completo',
            exercises: [
              'Agachamento - 4x8-12',
              'Leg Press - 4x12-15',
              'Cadeira Extensora - 3x15',
              'Cadeira Flexora - 3x15',
              'Panturrilha - 4x20',
            ],
          },
          {
            day: 'Quinta - Ombros e Abdômen',
            exercises: [
              'Desenvolvimento - 4x8-12',
              'Elevação Lateral - 4x12-15',
              'Elevação Frontal - 3x12-15',
              'Abdominais - 4x20',
              'Prancha - 3x60s',
            ],
          },
          {
            day: 'Sexta - Cardio e Core',
            exercises: [
              'Corrida - 30min',
              'Bike - 20min',
              'Abdominais - 4x25',
              'Prancha Lateral - 3x45s',
            ],
          },
        ],
      });
    } else {
      setGeneratedWorkout({
        title: 'Treino Feminino - Glúteos e Definição',
        days: [
          {
            day: 'Segunda - Glúteos e Posterior',
            exercises: [
              'Agachamento Sumô - 4x12-15',
              'Stiff - 4x12-15',
              'Elevação Pélvica - 4x15-20',
              'Cadeira Abdutora - 3x15-20',
              'Panturrilha - 4x20',
            ],
          },
          {
            day: 'Terça - Membros Superiores',
            exercises: [
              'Supino Reto - 3x12-15',
              'Remada Baixa - 3x12-15',
              'Desenvolvimento - 3x12-15',
              'Rosca Direta - 3x12-15',
              'Tríceps Corda - 3x12-15',
            ],
          },
          {
            day: 'Quarta - Pernas e Glúteos',
            exercises: [
              'Leg Press - 4x15-20',
              'Avanço - 3x12 cada perna',
              'Cadeira Flexora - 4x15',
              'Glúteo 4 Apoios - 4x15-20',
              'Abdominais - 4x20',
            ],
          },
          {
            day: 'Quinta - Glúteos Foco',
            exercises: [
              'Agachamento Búlgaro - 4x12 cada',
              'Hip Thrust - 4x15-20',
              'Cadeira Abdutora - 4x20',
              'Coice na Polia - 3x15 cada',
              'Prancha - 3x60s',
            ],
          },
          {
            day: 'Sexta - Cardio e Core',
            exercises: [
              'Elíptico - 30min',
              'Escada - 20min',
              'Abdominais Inferiores - 4x20',
              'Prancha Lateral - 3x45s cada',
            ],
          },
        ],
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          GERADOR DE TREINOS
        </h2>
        <p className="text-gray-400 text-lg">
          Treinos personalizados baseados no seu perfil e objetivos
        </p>
      </div>

      {/* Formulário de Dados */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Seus Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              value={userData.weight}
              onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="Ex: 75"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              value={userData.height}
              onChange={(e) => setUserData({ ...userData, height: e.target.value })}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="Ex: 175"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Objetivo
            </label>
            <select
              value={userData.goal}
              onChange={(e) => setUserData({ ...userData, goal: e.target.value })}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Selecione</option>
              <option value="hipertrofia">Hipertrofia</option>
              <option value="emagrecimento">Emagrecimento</option>
              <option value="definicao">Definição</option>
              <option value="forca">Força</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Experiência
            </label>
            <select
              value={userData.experience}
              onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Selecione</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>
        </div>
        <button
          onClick={generateWorkout}
          className="mt-6 w-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black py-4 rounded-xl hover:scale-105 transition-transform"
        >
          <Dumbbell className="inline mr-2" size={20} />
          GERAR MEU TREINO
        </button>
      </div>

      {/* Treino Gerado */}
      {generatedWorkout && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-2xl font-black text-white mb-6">{generatedWorkout.title}</h3>
          <div className="space-y-4">
            {generatedWorkout.days.map((day: any, index: number) => (
              <div key={index} className="bg-black/50 rounded-xl p-4 border border-white/10">
                <h4 className="text-lg font-bold text-[#FF0000] mb-3 flex items-center gap-2">
                  <Calendar size={20} />
                  {day.day}
                </h4>
                <ul className="space-y-2">
                  {day.exercises.map((exercise: string, idx: number) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <Target size={16} className="mt-1 text-[#FF0000] flex-shrink-0" />
                      <span>{exercise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
