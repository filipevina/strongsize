'use client';

import { Camera, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { UserRole, Gender } from '@/lib/types';

interface CalorieScannerProps {
  userRole: UserRole;
  userGender: Gender;
}

export default function CalorieScanner({ userRole, userGender }: CalorieScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulação de scan
    setTimeout(() => {
      setScanResult({
        food: 'Frango Grelhado com Batata Doce',
        calories: 450,
        protein: 45,
        carbs: 38,
        fat: 8,
      });
      setIsScanning(false);
    }, 2000);
  };

  if (userRole === 'free') {
    return (
      <div className="text-center py-20">
        <div className="bg-white/5 rounded-2xl p-12 border border-white/10 max-w-2xl mx-auto">
          <Camera size={64} className="mx-auto mb-6 text-gray-600" />
          <h2 className="text-3xl font-black text-white mb-4">
            SCANNER DE CALORIAS
          </h2>
          <p className="text-gray-400 mb-6">
            Recurso exclusivo para membros Premium
          </p>
          <button className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform">
            UPGRADE PARA PREMIUM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          SCANNER DE CALORIAS
        </h2>
        <p className="text-gray-400 text-lg">
          Tire foto da sua refeição e descubra os macros instantaneamente
        </p>
      </div>

      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <div className="aspect-video bg-black/50 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center mb-6">
          {isScanning ? (
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto mb-4 text-[#FF0000]" size={48} />
              <p className="text-white font-semibold">Analisando imagem...</p>
            </div>
          ) : scanResult ? (
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-white mb-4">{scanResult.food}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Calorias</p>
                  <p className="text-2xl font-black text-[#FF0000]">{scanResult.calories}</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Proteína</p>
                  <p className="text-2xl font-black text-white">{scanResult.protein}g</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Carbos</p>
                  <p className="text-2xl font-black text-white">{scanResult.carbs}g</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Gordura</p>
                  <p className="text-2xl font-black text-white">{scanResult.fat}g</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Camera size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">Clique para tirar foto ou fazer upload</p>
            </div>
          )}
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black py-4 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
        >
          <Camera className="inline mr-2" size={20} />
          {isScanning ? 'ANALISANDO...' : scanResult ? 'ESCANEAR NOVAMENTE' : 'ESCANEAR REFEIÇÃO'}
        </button>
      </div>
    </div>
  );
}
