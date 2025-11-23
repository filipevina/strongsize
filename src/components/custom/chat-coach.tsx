'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Dumbbell, Sparkles, Loader2 } from 'lucide-react';
import { Gender } from '@/lib/types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'coach';
  timestamp: string; // Mudado para string para evitar hydration mismatch
}

interface ChatCoachProps {
  userGender: Gender;
  userName: string;
}

export default function ChatCoach({ userGender, userName }: ChatCoachProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa mensagens apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const initialMessage: Message = {
      id: '1',
      text: userGender === 'masculino' 
        ? `E aí, ${userName}! Sou o Coach MONSTRÃO! Bora destruir esse treino hoje, monstro! 💪🔥 Posso criar treinos personalizados, dar dicas de nutrição e te motivar! Me diz o que precisa!`
        : `Oi, ${userName}! Sou o Coach MONSTRÃO! Amiga, hoje é dia de arrasar! Vamos juntas, monstrinha! 💪✨ Posso criar treinos personalizados, dar dicas de nutrição e te motivar! Me diz o que precisa!`,
      sender: 'coach',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMessage]);
  }, [userGender, userName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === '') {
        console.warn('OpenAI API Key não configurada. Usando respostas fallback.');
        return getFallbackResponse(userMessage);
      }

      const systemPrompt = userGender === 'masculino'
        ? `Você é o Coach MONSTRÃO, um personal trainer virtual animado e motivador para homens. Use linguagem como: mano, monstro, brabo, lenda, patrão, guerreiro. Seja direto, motivador e use emojis. Você pode criar treinos, dar dicas de nutrição e motivar. NUNCA recomende hormônios ou doses. Seja respeitoso e profissional.`
        : `Você é o Coach MONSTRÃO, um personal trainer virtual animado e motivador para mulheres. Use linguagem como: amiga, monstrinha, rainha, futura wellness, gata do shape. Seja motivadora, empática e use emojis. Você pode criar treinos, dar dicas de nutrição e motivar. NUNCA recomende hormônios ou doses. Seja respeitosa e profissional.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 500,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API Error:', response.status, errorData);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respostas baseadas no gênero
    const motivationMale = [
      'Brabo demais, monstro! Continua assim! 💪',
      'Isso aí, patrão! Tá no caminho certo! 🔥',
      'Lenda demais, mano! Segue firme! 💯',
      'Guerreiro! Tá destruindo, continua! ⚡',
    ];

    const motivationFemale = [
      'Monstrinha, você tá arrasando! Continue assim! 💪✨',
      'Rainha, tá impecável! Segue firme! 👑',
      'Gata do shape, tá destruindo! Continua! 🔥',
      'Futura wellness, você tá no caminho certo! 💯',
    ];

    // Treino
    if (lowerMessage.includes('treino') || lowerMessage.includes('exercício')) {
      if (userGender === 'masculino') {
        return 'Monstro, vou montar um treino brabo pra você! Me diz:\n\n1. Qual músculo quer treinar? (Peito, costas, perna, ombro, braço)\n2. Seu nível: iniciante, intermediário ou avançado?\n3. Seu objetivo: hipertrofia, força ou definição?\n\nCom essas infos eu monto um treino destruidor! 💪🔥';
      } else {
        return 'Amiga, vou montar um treino incrível pra você! Me diz:\n\n1. Qual grupo muscular? (Glúteo, perna, superior, abdômen)\n2. Seu nível: iniciante, intermediário ou avançado?\n3. Seu objetivo: hipertrofia, definição ou emagrecimento?\n\nCom essas infos eu monto um treino perfeito! 💪✨';
      }
    }

    // Dieta
    if (lowerMessage.includes('dieta') || lowerMessage.includes('comida') || lowerMessage.includes('calorias')) {
      return userGender === 'masculino'
        ? 'Brabo! Nutrição é 70% do resultado, mano! Me diz:\n\n1. Seu peso atual?\n2. Seu objetivo: ganhar massa, perder gordura ou manter?\n3. Quantas refeições por dia você consegue fazer?\n\nVou te ajudar a montar uma estratégia nutricional! 🍗💪'
        : 'Perfeito, amiga! Alimentação é essencial! Me diz:\n\n1. Seu peso atual?\n2. Seu objetivo: ganhar massa, perder gordura ou manter?\n3. Quantas refeições por dia você consegue fazer?\n\nVou te ajudar a otimizar sua nutrição! 🥗💪';
    }

    // Motivação
    if (lowerMessage.includes('cansad') || lowerMessage.includes('desanim') || lowerMessage.includes('difícil')) {
      return userGender === 'masculino'
        ? 'Ei, guerreiro! Sem desanimar! Lembra por que começou? Você é mais forte que isso, monstro! 💪🔥\n\nTodo campeão já quis desistir, mas a diferença é que eles continuaram! Você não chegou até aqui pra desistir agora. Bora, que você é brabo demais!'
        : 'Ei, rainha! Não desanima! Você é forte demais! Lembra do seu objetivo? Vamos juntas, monstrinha! 💪✨\n\nToda mulher forte já teve dias difíceis, mas é a constância que faz a diferença! Você é incrível e vai conseguir. Bora, gata do shape!';
    }

    // Hormônios (educativo)
    if (lowerMessage.includes('hormônio') || lowerMessage.includes('gh') || lowerMessage.includes('trembo') || lowerMessage.includes('ciclo')) {
      return 'Posso te explicar sobre hormônios de forma educativa, mas NUNCA vou recomendar doses ou ciclos! ⚠️\n\nSempre consulte um médico endocrinologista especializado. Uso sem acompanhamento médico é PERIGOSO e pode causar danos permanentes à saúde.\n\nQuer saber sobre qual hormônio especificamente? (GH, Trembolona, Deca, etc.) Vou te explicar os conceitos científicos! 🧬';
    }

    // Resposta padrão motivacional
    const responses = userGender === 'masculino' ? motivationMale : motivationFemale;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Busca resposta da IA
    const aiResponse = await getAIResponse(inputMessage);

    const coachMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'coach',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, coachMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Renderiza loading enquanto não montar no cliente
  if (!isMounted) {
    return (
      <div className="flex flex-col h-[600px] bg-white/5 rounded-2xl border border-[#FF0000]/20 overflow-hidden items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF0000] animate-spin" />
        <p className="text-white mt-4">Carregando Coach MONSTRÃO...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white/5 rounded-2xl border border-[#FF0000]/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF0000] to-red-700 p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <Dumbbell className="w-6 h-6 text-[#FF0000]" />
        </div>
        <div>
          <h3 className="font-black text-white text-lg">COACH MONSTRÃO</h3>
          <p className="text-white/80 text-sm">Seu personal trainer com IA</p>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-300 ml-auto animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-[#FF0000] text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              <p className="text-sm md:text-base whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-60 mt-2 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-[#FF0000] animate-spin" />
              <span className="text-white text-sm">Coach MONSTRÃO está pensando...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={userGender === 'masculino' ? 'Fala, monstro...' : 'Fala, monstrinha...'}
            className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF0000] transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-[#FF0000] hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
