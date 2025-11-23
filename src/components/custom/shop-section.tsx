'use client';

import { ShoppingCart, Star } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface ShopSectionProps {
  userRole: UserRole;
}

export default function ShopSection({ userRole }: ShopSectionProps) {
  const products = [
    {
      name: 'Whey Protein Premium',
      price: 'R$ 129,90',
      rating: 4.8,
      image: '🥤',
      description: '1kg de proteína isolada de alta qualidade',
    },
    {
      name: 'Creatina Monohidratada',
      price: 'R$ 79,90',
      rating: 4.9,
      image: '💊',
      description: '300g de creatina pura micronizada',
    },
    {
      name: 'BCAA 2:1:1',
      price: 'R$ 89,90',
      rating: 4.7,
      image: '⚡',
      description: '120 cápsulas de aminoácidos essenciais',
    },
    {
      name: 'Pré-Treino Explosivo',
      price: 'R$ 99,90',
      rating: 4.6,
      image: '🔥',
      description: '300g com cafeína e beta-alanina',
    },
    {
      name: 'Multivitamínico',
      price: 'R$ 59,90',
      rating: 4.8,
      image: '🌟',
      description: '60 cápsulas com vitaminas e minerais',
    },
    {
      name: 'Ômega-3 1000mg',
      price: 'R$ 69,90',
      rating: 4.7,
      image: '🐟',
      description: '120 cápsulas de óleo de peixe',
    },
  ];

  const discount = userRole === 'premium' ? 15 : 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          LOJA STRONGSIZE
        </h2>
        <p className="text-gray-400 text-lg">
          Suplementos de qualidade para potencializar seus resultados
        </p>
        {userRole === 'premium' && (
          <div className="mt-4 inline-block bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-bold px-6 py-2 rounded-full">
            🎉 DESCONTO PREMIUM: 15% OFF
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#FF0000]/50 transition-all hover:scale-105"
          >
            <div className="text-6xl mb-4 text-center">{product.image}</div>
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{product.description}</p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}
                />
              ))}
              <span className="text-gray-400 text-sm ml-2">{product.rating}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {discount > 0 && (
                  <p className="text-gray-500 line-through text-sm">{product.price}</p>
                )}
                <p className="text-2xl font-black text-[#FF0000]">
                  {discount > 0
                    ? `R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * (1 - discount / 100)).toFixed(2).replace('.', ',')}`
                    : product.price}
                </p>
              </div>
              <button className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white p-3 rounded-lg hover:scale-110 transition-transform">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#FF0000]/10 to-[#CC0000]/10 rounded-2xl p-8 border border-[#FF0000]/20 text-center">
        <h3 className="text-2xl font-black text-white mb-4">
          FRETE GRÁTIS ACIMA DE R$ 199
        </h3>
        <p className="text-gray-400">
          Entrega rápida e segura para todo o Brasil
        </p>
      </div>
    </div>
  );
}
