import React from 'react';
import { Heart, FileText, MapPin, User, Settings as SettingsIcon, Activity, Settings, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './img/ImageWithFallback';

interface DashboardProps {
  user: any;
  lastRisk: any;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ user, lastRisk, onNavigate }: DashboardProps) {
  const getRiskColor = (level: string) => {
    if (level === 'faible') return '#2FAE78';
    if (level === 'modéré') return '#FBD45A';
    return '#EF4444';
  };

  const getRiskText = (level: string) => {
    if (level === 'faible') return 'Risque faible';
    if (level === 'modéré') return 'Risque modéré';
    return 'Risque élevé';
  };

  const recommendedArticles = [
    {
      id: 1,
      title: "L'hypertension en milieu tropical",
      category: "Hypertension",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Prévention cardiovasculaire : les bons gestes",
      category: "Prévention",
      readTime: "7 min"
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-24 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/90 mb-1">Bonjour,</p>
            <h2 className="text-white">{user?.name || 'Utilisateur'}</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('settings')}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Settings size={20} className="text-white" />
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <User size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Last risk assessment card */}
        {lastRisk && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 mb-1">Dernière évaluation</p>
                <p className="text-gray-900">
                  {getRiskText(lastRisk.riskLevel)}
                </p>
              </div>
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${getRiskColor(lastRisk.riskLevel)}20` }}
              >
                <Activity size={32} style={{ color: getRiskColor(lastRisk.riskLevel) }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">{lastRisk.date}</p>
              <button 
                onClick={() => onNavigate('prediction-history')}
                className="text-[#246EE9] text-sm flex items-center gap-1"
              >
                Voir historique
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main actions */}
      <div className="px-6 -mt-16 mb-8 relative z-20">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('prediction-form')}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow btn-press"
          >
            <div className="w-14 h-14 bg-[#2FAE78]/10 rounded-2xl flex items-center justify-center mb-4">
              <Heart size={28} className="text-[#2FAE78]" />
            </div>
            <p className="text-gray-900 mb-1">Évaluation</p>
            <p className="text-gray-500 text-sm">Nouveau test</p>
          </button>

          <button
            onClick={() => onNavigate('articles')}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow btn-press"
          >
            <div className="w-14 h-14 bg-[#246EE9]/10 rounded-2xl flex items-center justify-center mb-4">
              <FileText size={28} className="text-[#246EE9]" />
            </div>
            <p className="text-gray-900 mb-1">Articles</p>
            <p className="text-gray-500 text-sm">Informations</p>
          </button>

          <button
            onClick={() => onNavigate('centers')}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow col-span-2 btn-press"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FBD45A]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin size={28} className="text-[#FBD45A]" />
              </div>
              <div className="text-left">
                <p className="text-gray-900 mb-1">Centres de santé</p>
                <p className="text-gray-500 text-sm">Trouver un centre à proximité</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mini map preview */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-40 bg-[#E8EEF5]">
            {/* Placeholder map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin size={48} className="text-gray-400" />
            </div>
            <div className="absolute top-3 left-3 bg-white px-4 py-2 rounded-full shadow-md">
              <p className="text-sm text-gray-700">12 centres à proximité</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended articles */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Articles recommandés</h3>
          <button 
            onClick={() => onNavigate('articles')}
            className="text-[#246EE9] text-sm"
          >
            Voir tout
          </button>
        </div>
        <div className="space-y-3">
          {recommendedArticles.map(article => (
            <button
              key={article.id}
              onClick={() => onNavigate('articles')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left btn-press"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#246EE9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-[#246EE9]" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{article.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#246EE9] bg-[#246EE9]/10 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
