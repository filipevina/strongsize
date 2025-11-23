'use client';

import { Apple, Beef, Egg, Fish, Wheat, Droplet, Lock } from 'lucide-react';

interface NutritionSectionProps {
  isPremium: boolean;
}

export default function NutritionSection({ isPremium }: NutritionSectionProps) {
  const nutritionPosts = [
    {
      icon: <Beef className="text-[#FF0000]" size={32} />,
      title: 'Proteínas',
      content: 'Essenciais para construção muscular. Consuma 1.6-2.2g por kg de peso corporal. Fontes: frango, carne vermelha, peixe, ovos, whey protein.',
    },
    {
      icon: <Wheat className="text-[#FF0000]" size={32} />,
      title: 'Carboidratos',
      content: 'Energia para treinos intensos. Prefira fontes complexas: batata doce, arroz integral, aveia, quinoa. Evite açúcares simples.',
    },
    {
      icon: <Droplet className="text-[#FF0000]" size={32} />,
      title: 'Gorduras Boas',
      content: 'Importantes para hormônios. Fontes: abacate, azeite, castanhas, salmão, gema de ovo. Evite gorduras trans.',
    },
    {
      icon: <Apple className="text-[#FF0000]" size={32} />,
      title: 'Micronutrientes',
      content: 'Vitaminas e minerais essenciais. Consuma variedade de frutas e vegetais coloridos diariamente para saúde ótima.',
    },
    {
      icon: <Fish className="text-[#FF0000]" size={32} />,
      title: 'Ômega-3',
      content: 'Anti-inflamatório natural. Fontes: salmão, sardinha, atum, chia, linhaça. Melhora recuperação muscular.',
    },
    {
      icon: <Egg className="text-[#FF0000]" size={32} />,
      title: 'Timing Nutricional',
      content: 'Pré-treino: carboidratos + proteína 1-2h antes. Pós-treino: proteína + carboidratos até 2h após para máxima recuperação.',
    },
  ];

  const dietTypes = [
    {
      name: 'Dieta Flexível',
      description: 'Controle de macros sem restrições extremas. Ideal para sustentabilidade a longo prazo.',
    },
    {
      name: 'Dieta Cetogênica',
      description: 'Baixo carbo, alta gordura. Eficaz para perda de gordura, mas requer adaptação.',
    },
    {
      name: 'Jejum Intermitente',
      description: 'Janela alimentar restrita. Pode melhorar composição corporal e sensibilidade insulínica.',
    },
    {
      name: 'Dieta Paleolítica',
      description: 'Alimentos naturais e não processados. Foco em carnes, vegetais, frutas e gorduras naturais.',
    },
  ];

  const mealPlans = [
    {
      name: 'Ganho de Massa Muscular',
      calories: '3000-3500 kcal/dia',
      macros: 'Proteína: 180g | Carboidratos: 400g | Gorduras: 80g',
      meals: [
        {
          name: 'Café da Manhã',
          foods: ['6 ovos mexidos', '100g aveia com banana', '1 copo leite integral', '1 colher pasta amendoim'],
        },
        {
          name: 'Lanche da Manhã',
          foods: ['1 shake whey protein', '50g castanhas', '1 fruta'],
        },
        {
          name: 'Almoço',
          foods: ['200g frango grelhado', '200g arroz integral', '150g batata doce', 'Salada verde à vontade', '1 colher azeite'],
        },
        {
          name: 'Lanche Pré-Treino',
          foods: ['2 fatias pão integral', '100g peito peru', '1 banana', '1 café'],
        },
        {
          name: 'Pós-Treino',
          foods: ['1 shake whey + dextrose', '1 banana'],
        },
        {
          name: 'Jantar',
          foods: ['200g carne vermelha magra', '200g arroz', '100g macarrão integral', 'Legumes cozidos', 'Salada'],
        },
        {
          name: 'Ceia',
          foods: ['200g iogurte grego', '30g whey protein', '1 colher pasta amendoim'],
        },
      ],
    },
    {
      name: 'Emagrecimento/Definição',
      calories: '1800-2200 kcal/dia',
      macros: 'Proteína: 160g | Carboidratos: 150g | Gorduras: 60g',
      meals: [
        {
          name: 'Café da Manhã',
          foods: ['4 claras + 2 ovos inteiros', '50g aveia', '1 café sem açúcar'],
        },
        {
          name: 'Lanche da Manhã',
          foods: ['1 shake whey protein', '10 castanhas'],
        },
        {
          name: 'Almoço',
          foods: ['150g frango grelhado', '100g arroz integral', '100g batata doce', 'Salada verde à vontade'],
        },
        {
          name: 'Lanche Pré-Treino',
          foods: ['1 batata doce média', '1 scoop whey protein'],
        },
        {
          name: 'Pós-Treino',
          foods: ['1 shake whey protein', '1 fruta'],
        },
        {
          name: 'Jantar',
          foods: ['150g peixe grelhado', 'Legumes no vapor', 'Salada verde à vontade', '1 colher azeite'],
        },
        {
          name: 'Ceia',
          foods: ['150g iogurte grego 0%', '1 scoop caseína ou whey'],
        },
      ],
    },
    {
      name: 'Manutenção/Recomposição',
      calories: '2500-2800 kcal/dia',
      macros: 'Proteína: 170g | Carboidratos: 280g | Gorduras: 70g',
      meals: [
        {
          name: 'Café da Manhã',
          foods: ['5 ovos mexidos', '80g aveia', '1 banana', '1 café'],
        },
        {
          name: 'Lanche da Manhã',
          foods: ['1 shake whey protein', '30g castanhas', '1 fruta'],
        },
        {
          name: 'Almoço',
          foods: ['180g frango ou carne', '150g arroz integral', '120g batata doce', 'Salada verde', 'Legumes'],
        },
        {
          name: 'Lanche Pré-Treino',
          foods: ['2 fatias pão integral', '80g atum', '1 banana'],
        },
        {
          name: 'Pós-Treino',
          foods: ['1 shake whey + carboidrato', '1 fruta'],
        },
        {
          name: 'Jantar',
          foods: ['180g peixe ou frango', '100g arroz', 'Legumes variados', 'Salada'],
        },
        {
          name: 'Ceia',
          foods: ['180g iogurte grego', '1 scoop whey ou caseína'],
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          NUTRIÇÃO INTELIGENTE
        </h2>
        <p className="text-gray-400 text-lg">
          Conhecimento essencial sobre alimentação para máximos resultados
        </p>
      </div>

      {/* Posts Educativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nutritionPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all hover:scale-105"
          >
            <div className="mb-4">{post.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{post.content}</p>
          </div>
        ))}
      </div>

      {/* Tipos de Dieta */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-black text-white mb-6 text-center">
          TIPOS DE DIETA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dietTypes.map((diet, index) => (
            <div key={index} className="bg-black/50 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-[#FF0000] mb-2">{diet.name}</h4>
              <p className="text-gray-400 text-sm">{diet.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cardápios Prontos - Premium */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-4">
            CARDÁPIOS PRONTOS
          </h3>
          <p className="text-gray-400">
            Planos alimentares completos para diferentes objetivos
          </p>
        </div>

        {!isPremium ? (
          <div className="text-center py-12">
            <div className="bg-white/5 rounded-2xl p-12 border border-white/10 max-w-2xl mx-auto">
              <Lock size={64} className="mx-auto mb-6 text-gray-600" />
              <h3 className="text-2xl font-black text-white mb-4">
                CARDÁPIOS EXCLUSIVOS PREMIUM
              </h3>
              <p className="text-gray-400 mb-6">
                Acesse cardápios completos e detalhados para ganho de massa, emagrecimento e manutenção
              </p>
              <a href="/subscription" className="inline-block bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform">
                UPGRADE PARA PREMIUM
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {mealPlans.map((plan, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-2">{plan.name}</h4>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-[#FF0000]/20 text-[#FF0000] px-4 py-2 rounded-full font-bold">
                      {plan.calories}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full font-bold">
                      {plan.macros}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="bg-black/50 rounded-xl p-6 border border-white/10">
                      <h5 className="text-lg font-bold text-[#FF0000] mb-3">{meal.name}</h5>
                      <ul className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                          <li key={foodIndex} className="text-gray-300 flex items-start gap-2">
                            <span className="text-[#FF0000] font-bold">•</span>
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <p className="text-yellow-200 text-sm">
                    💡 <strong>Dica:</strong> Ajuste as porções de acordo com seu peso, metabolismo e resposta individual. 
                    Consulte um nutricionista para personalização completa.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dicas Práticas */}
      <div className="bg-gradient-to-r from-[#FF0000]/10 to-[#CC0000]/10 rounded-2xl p-8 border border-[#FF0000]/20">
        <h3 className="text-2xl font-black text-white mb-6 text-center">
          DICAS PRÁTICAS
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-[#FF0000] font-bold">✓</span>
            <span>Beba pelo menos 3L de água por dia para hidratação adequada</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF0000] font-bold">✓</span>
            <span>Faça refeições a cada 3-4 horas para manter metabolismo ativo</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF0000] font-bold">✓</span>
            <span>Priorize alimentos integrais e minimize processados</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF0000] font-bold">✓</span>
            <span>Durma 7-9 horas por noite para recuperação e regulação hormonal</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF0000] font-bold">✓</span>
            <span>Suplementos são complementos, não substitutos de alimentação real</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
