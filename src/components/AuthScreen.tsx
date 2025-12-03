import React, { useState } from 'react';
import { Heart, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: any) => void;
  onSkip: () => void;
}

export function AuthScreen({ onLogin, onSkip }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: formData.name || 'Utilisateur',
      email: formData.email
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-8 pt-16 pb-12 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <Heart size={40} className="text-[#2FAE78]" fill="#2FAE78" />
          </div>
        </div>
        <h1 className="text-center text-white mb-2">
          CardioGuard
        </h1>
        <p className="text-center text-white/90">
          Votre santé cardiovasculaire à portée de main
        </p>
      </div>

      {/* Form section */}
      <div className="flex-1 px-8 py-8">
        {/* Toggle buttons */}
        <div className="flex bg-[#E8EEF5] rounded-full p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-full transition-all ${
              isLogin ? 'bg-white shadow-md' : 'text-gray-600'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-full transition-all ${
              !isLogin ? 'bg-white shadow-md' : 'text-gray-600'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none"
                  placeholder="Entrez votre nom"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none"
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-[#246EE9]">
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#2FAE78] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#27975f] transition-colors mt-6 btn-press"
          >
            {isLogin ? 'Se connecter' : "S'inscrire"}
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Skip option */}
        <button
          onClick={onSkip}
          className="w-full text-center text-gray-600 mt-6 py-3"
        >
          Continuer sans compte
        </button>

        {/* Privacy notice */}
        {!isLogin && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité (RGPD).
          </p>
        )}
      </div>
    </div>
  );
}
