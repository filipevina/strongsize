'use client';

import { Lock, Zap } from 'lucide-react';

interface HormonesAlphaProps {
  isPremium: boolean;
}

export default function HormonesAlpha({ isPremium }: HormonesAlphaProps) {
  const hormones = [
    {
      name: 'Testosterona',
      icon: '💪',
      description: 'Hormônio anabólico primário responsável pelo crescimento muscular, força, libido e características masculinas.',
      benefits: [
        'Aumento de massa muscular',
        'Redução de gordura corporal',
        'Melhora da libido',
        'Aumento de energia e disposição',
      ],
      naturalBoost: [
        'Treino de força intenso',
        'Sono de qualidade (7-9h)',
        'Gorduras saudáveis na dieta',
        'Vitamina D e Zinco',
        'Redução de estresse',
      ],
    },
    {
      name: 'Hormônio do Crescimento (GH)',
      icon: '🚀',
      description: 'Essencial para crescimento, recuperação muscular, metabolismo de gorduras e regeneração celular.',
      benefits: [
        'Recuperação muscular acelerada',
        'Queima de gordura',
        'Melhora da composição corporal',
        'Anti-envelhecimento',
      ],
      naturalBoost: [
        'Jejum intermitente',
        'Treino HIIT',
        'Sono profundo',
        'Suplementação com arginina',
        'Redução de açúcar',
      ],
    },
    {
      name: 'Insulina',
      icon: '⚡',
      description: 'Hormônio anabólico que regula glicose sanguínea e facilita entrada de nutrientes nas células.',
      benefits: [
        'Transporte de nutrientes',
        'Síntese proteica',
        'Armazenamento de glicogênio',
        'Recuperação pós-treino',
      ],
      naturalBoost: [
        'Timing de carboidratos',
        'Exercícios resistidos',
        'Controle glicêmico',
        'Fibras na dieta',
        'Canela e cromo',
      ],
    },
    {
      name: 'Cortisol',
      icon: '⚠️',
      description: 'Hormônio do estresse. Em excesso é catabólico, mas em níveis adequados é essencial para energia.',
      benefits: [
        'Energia matinal',
        'Resposta ao estresse',
        'Metabolismo',
        'Sistema imunológico',
      ],
      naturalBoost: [
        'Gerenciamento de estresse',
        'Meditação',
        'Sono adequado',
        'Adaptógenos (ashwagandha)',
        'Evitar overtraining',
      ],
    },
    {
      name: 'IGF-1 (Fator de Crescimento)',
      icon: '🧬',
      description: 'Mediador dos efeitos do GH, crucial para hipertrofia muscular e recuperação.',
      benefits: [
        'Hipertrofia muscular',
        'Recuperação de tecidos',
        'Síntese proteica',
        'Crescimento celular',
      ],
      naturalBoost: [
        'Proteína adequada',
        'Treino de força',
        'Sono de qualidade',
        'Leucina e BCAAs',
        'Calorias suficientes',
      ],
    },
    {
      name: 'Tireoidianos (T3/T4)',
      icon: '🔥',
      description: 'Regulam metabolismo basal, temperatura corporal e utilização de energia.',
      benefits: [
        'Metabolismo acelerado',
        'Queima de gordura',
        'Energia e disposição',
        'Regulação térmica',
      ],
      naturalBoost: [
        'Iodo na dieta',
        'Selênio',
        'Evitar déficit calórico extremo',
        'Exercícios regulares',
        'Redução de estresse',
      ],
    },
  ];

  const syntheticHormones = [
    {
      name: 'Decanoato de Nandrolona (Deca)',
      icon: '💉',
      description: 'Esteroide anabolizante derivado da testosterona, conhecido por promover ganho de massa muscular e alívio articular.',
      info: [
        'Promove síntese proteica e retenção de nitrogênio',
        'Pode auxiliar na saúde articular e óssea',
        'Efeitos colaterais incluem supressão hormonal',
        'Requer acompanhamento médico rigoroso',
      ],
      warning: 'USO EXCLUSIVO SOB PRESCRIÇÃO MÉDICA. Pode causar efeitos colaterais graves.',
    },
    {
      name: 'Stanozolol (Stano/Winstrol)',
      icon: '⚗️',
      description: 'Esteroide anabolizante derivado da DHT, popular para definição muscular e redução de gordura.',
      info: [
        'Promove ganho de massa magra sem retenção hídrica',
        'Aumenta força e resistência',
        'Pode ser hepatotóxico (prejudicial ao fígado)',
        'Efeitos colaterais incluem alterações lipídicas',
      ],
      warning: 'USO EXCLUSIVO SOB PRESCRIÇÃO MÉDICA. Pode causar danos hepáticos.',
    },
    {
      name: 'Durateston (Dura)',
      icon: '💊',
      description: 'Combinação de quatro ésteres de testosterona, usado em terapia de reposição hormonal.',
      info: [
        'Mistura de testosterona de ação rápida e lenta',
        'Promove ganho de massa muscular e força',
        'Melhora libido e disposição',
        'Requer monitoramento de níveis hormonais',
      ],
      warning: 'USO EXCLUSIVO SOB PRESCRIÇÃO MÉDICA. Suprime produção natural de testosterona.',
    },
  ];

  if (!isPremium) {
    return (
      <div className="text-center py-20">
        <div className="bg-white/5 rounded-2xl p-12 border border-white/10 max-w-2xl mx-auto">
          <Lock size={64} className="mx-auto mb-6 text-gray-600" />
          <h2 className="text-3xl font-black text-white mb-4">
            HORMÔNIOS ALFA
          </h2>
          <p className="text-gray-400 mb-6">
            Conteúdo científico exclusivo para membros Premium
          </p>
          <a href="/subscription" className="inline-block bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform">
            UPGRADE PARA PREMIUM
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-6 py-2 rounded-full mb-4">
          <Zap className="inline mr-2" size={20} />
          CONTEÚDO PREMIUM
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          HORMÔNIOS ALFA
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Entenda a ciência por trás dos hormônios que controlam seu físico, performance e saúde. 
          Informação baseada em evidências científicas.
        </p>
      </div>

      {/* Aviso Legal */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
        <p className="text-yellow-200 text-sm leading-relaxed">
          ⚠️ <strong>IMPORTANTE:</strong> Este conteúdo é puramente educativo. Nunca recomendamos o uso de hormônios 
          sintéticos ou anabolizantes sem prescrição e acompanhamento médico especializado. O foco aqui é otimizar 
          seus hormônios naturalmente através de treino, nutrição e estilo de vida.
        </p>
      </div>

      {/* Hormônios Naturais */}
      <div className="space-y-6">
        <h3 className="text-3xl font-black text-white text-center mb-6">HORMÔNIOS NATURAIS</h3>
        {hormones.map((hormone, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#FF0000]/50 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{hormone.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-2">{hormone.name}</h3>
                <p className="text-gray-400 leading-relaxed">{hormone.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefícios */}
              <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-bold text-[#FF0000] mb-4">Benefícios</h4>
                <ul className="space-y-2">
                  {hormone.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <span className="text-[#FF0000] font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Como Otimizar Naturalmente */}
              <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-bold text-green-500 mb-4">Como Otimizar Naturalmente</h4>
                <ul className="space-y-2">
                  {hormone.naturalBoost.map((method, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-500 font-bold">→</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hormônios Sintéticos - Informação Educativa */}
      <div className="space-y-6 mt-12">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <h3 className="text-3xl font-black text-white text-center mb-4">HORMÔNIOS SINTÉTICOS</h3>
          <p className="text-red-200 text-center leading-relaxed">
            ⚠️ <strong>ATENÇÃO:</strong> As informações abaixo são exclusivamente educativas. 
            NÃO recomendamos, incentivamos ou orientamos o uso de substâncias anabolizantes. 
            Todos os esteroides anabolizantes são controlados e seu uso sem prescrição médica é ilegal e perigoso.
          </p>
        </div>

        {syntheticHormones.map((hormone, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{hormone.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-2">{hormone.name}</h3>
                <p className="text-gray-400 leading-relaxed">{hormone.description}</p>
              </div>
            </div>

            <div className="bg-black/50 rounded-xl p-6 border border-white/10 mb-4">
              <h4 className="text-lg font-bold text-blue-400 mb-4">Informações Educativas</h4>
              <ul className="space-y-2">
                {hormone.info.map((info, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
              <p className="text-red-200 text-sm font-bold">
                ⚠️ {hormone.warning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dicas Gerais */}
      <div className="bg-gradient-to-r from-[#FF0000]/10 to-[#CC0000]/10 rounded-2xl p-8 border border-[#FF0000]/20">
        <h3 className="text-2xl font-black text-white mb-6 text-center">
          OTIMIZAÇÃO HORMONAL NATURAL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">💤 Sono de Qualidade</h4>
            <p className="text-gray-400 text-sm">7-9 horas por noite para recuperação hormonal</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">🏋️ Treino Intenso</h4>
            <p className="text-gray-400 text-sm">Exercícios compostos estimulam produção hormonal</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">🥑 Gorduras Saudáveis</h4>
            <p className="text-gray-400 text-sm">Essenciais para síntese de hormônios esteroides</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">🧘 Controle de Estresse</h4>
            <p className="text-gray-400 text-sm">Reduz cortisol e preserva testosterona</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">☀️ Vitamina D</h4>
            <p className="text-gray-400 text-sm">Crucial para testosterona e saúde geral</p>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/10">
            <h4 className="font-bold text-white mb-2">⚖️ Peso Saudável</h4>
            <p className="text-gray-400 text-sm">Excesso de gordura reduz testosterona</p>
          </div>
        </div>
      </div>
    </div>
  );
}
