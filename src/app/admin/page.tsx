'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Shield, Users, Package, Settings, Plus, Trash2, Edit } from 'lucide-react';
import Navbar from '@/components/custom/navbar';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'content'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/auth');
      return;
    }

    // Verificar se é admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      alert('Acesso negado! Apenas administradores podem acessar esta área.');
      router.push('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
    loadData();
  };

  const loadData = async () => {
    // Carregar usuários
    const { data: usersData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (usersData) setUsers(usersData);

    // Carregar produtos
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (productsData) setProducts(productsData);
  };

  const togglePremium = async (userId: string, currentStatus: boolean) => {
    const premiumUntil = currentStatus ? null : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        is_premium: !currentStatus,
        premium_until: premiumUntil 
      })
      .eq('id', userId);

    if (!error) {
      loadData();
      alert('Status premium atualizado!');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (!error) {
      loadData();
      alert('Usuário deletado com sucesso!');
    }
  };

  const addProduct = async () => {
    const name = prompt('Nome do produto:');
    if (!name) return;

    const price = prompt('Preço (R$):');
    if (!price) return;

    const description = prompt('Descrição:');
    const imageUrl = prompt('URL da imagem:');

    const { error } = await supabase
      .from('products')
      .insert({
        name,
        price: parseFloat(price),
        description,
        image_url: imageUrl,
        stock: 100,
      });

    if (!error) {
      loadData();
      alert('Produto adicionado com sucesso!');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (!error) {
      loadData();
      alert('Produto deletado com sucesso!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-red-500" size={40} />
            <h1 className="text-4xl font-black text-white">PAINEL ADMIN</h1>
          </div>
          <p className="text-gray-400">Controle total do aplicativo</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'users'
                ? 'text-white border-b-2 border-[#FF0000]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Usuários
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'products'
                ? 'text-white border-b-2 border-[#FF0000]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package className="inline mr-2" size={20} />
            Produtos
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'content'
                ? 'text-white border-b-2 border-[#FF0000]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="inline mr-2" size={20} />
            Conteúdo
          </button>
        </div>

        {/* Usuários */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white">
                Total de Usuários: {users.length}
              </h2>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{user.name || 'Sem nome'}</h3>
                    <p className="text-gray-400 text-sm mb-2">ID: {user.id}</p>
                    <div className="flex gap-2">
                      {user.is_premium && (
                        <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold">
                          PREMIUM
                        </span>
                      )}
                      {user.is_admin && (
                        <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
                          ADMIN
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePremium(user.id, user.is_premium)}
                      className="bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-all font-bold text-sm"
                    >
                      {user.is_premium ? 'Remover Premium' : 'Tornar Premium'}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500/20 text-red-500 p-2 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produtos */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white">
                Total de Produtos: {products.length}
              </h2>
              <button
                onClick={addProduct}
                className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white font-black px-6 py-3 rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Plus size={20} />
                Adicionar Produto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-[#FF0000]">
                        R$ {product.price?.toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500/20 text-red-500 p-2 rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white mb-6">
              Gerenciar Conteúdo do App
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Treinos</h3>
                <p className="text-gray-400 mb-4">
                  Adicione novos treinos e exercícios ao banco de dados
                </p>
                <button className="bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all font-bold">
                  Gerenciar Treinos
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Cardápios</h3>
                <p className="text-gray-400 mb-4">
                  Adicione novos cardápios e planos alimentares
                </p>
                <button className="bg-green-500/20 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all font-bold">
                  Gerenciar Cardápios
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Posts</h3>
                <p className="text-gray-400 mb-4">
                  Moderar posts do feed social
                </p>
                <button className="bg-purple-500/20 text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all font-bold">
                  Gerenciar Posts
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Configurações</h3>
                <p className="text-gray-400 mb-4">
                  Configurações gerais do aplicativo
                </p>
                <button className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-all font-bold">
                  Configurações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
