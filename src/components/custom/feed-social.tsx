'use client';

import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface FeedSocialProps {
  userRole: UserRole;
}

export default function FeedSocial({ userRole }: FeedSocialProps) {
  const posts = [
    {
      user: 'João Silva',
      avatar: '💪',
      content: 'Acabei de bater meu PR no agachamento! 180kg x 5 reps! 🔥',
      likes: 234,
      comments: 45,
      image: null,
    },
    {
      user: 'Maria Santos',
      avatar: '🏋️‍♀️',
      content: '3 meses de projeto e -12kg! Foco, disciplina e consistência! 💯',
      likes: 567,
      comments: 89,
      image: null,
    },
    {
      user: 'Carlos Mendes',
      avatar: '🦾',
      content: 'Treino de costas destruidor hoje! Quem mais treinou costas? 💪',
      likes: 189,
      comments: 34,
      image: null,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          COMUNIDADE STRONGSIZE
        </h2>
        <p className="text-gray-400 text-lg">
          Compartilhe sua jornada e inspire outros guerreiros
        </p>
      </div>

      {/* Criar Post */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <textarea
          placeholder="Compartilhe sua conquista, treino ou dica..."
          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
          rows={3}
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-[#FF0000] transition-colors">
              📷 Foto
            </button>
            <button className="text-gray-400 hover:text-[#FF0000] transition-colors">
              📊 Progresso
            </button>
          </div>
          <button className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform">
            PUBLICAR
          </button>
        </div>
      </div>

      {/* Feed de Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{post.avatar}</div>
              <div className="flex-1">
                <h4 className="font-bold text-white">{post.user}</h4>
                <p className="text-gray-400 text-sm">Há 2 horas</p>
              </div>
            </div>
            <p className="text-white mb-4">{post.content}</p>
            <div className="flex items-center gap-6 text-gray-400">
              <button className="flex items-center gap-2 hover:text-[#FF0000] transition-colors">
                <Heart size={20} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#FF0000] transition-colors">
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#FF0000] transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
