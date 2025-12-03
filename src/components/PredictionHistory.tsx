import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionHistoryProps {
  history: any[];
  onBack: () => void;
}

export function PredictionHistory({ history, onBack }: PredictionHistoryProps) {
  const getRiskColor = (level: string) => {
    if (level === 'faible') return '#2FAE78';
    if (level === 'modéré') return '#FBD45A';
    return '#EF4444';
  };

  const getRiskBadgeClass = (level: string) => {
    if (level === 'faible') return 'bg-[#2FAE78]/10 text-[#2FAE78]';
    if (level === 'modéré') return 'bg-[#FBD45A]/20 text-[#8B7B00]';
    return 'bg-red-100 text-red-700';
  };

  const getTrend = (currentIndex: number) => {
    if (currentIndex === 0 || history.length < 2) return null;
    
    const current = history[currentIndex];
    const previous = history[currentIndex - 1];
    
    const riskValues = { 'faible': 1, 'modéré': 2, 'élevé': 3 };
    const currentValue = riskValues[current.riskLevel as keyof typeof riskValues];
    const previousValue = riskValues[previous.riskLevel as keyof typeof riskValues];
    
    if (currentValue < previousValue) return 'down';
    if (currentValue > previousValue) return 'up';
    return 'stable';
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Historique</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 bg-[#E8EEF5] rounded-full flex items-center justify-center mb-4">
              <TrendingUp size={48} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-center">
              Aucune évaluation enregistrée
            </p>
            <p className="text-gray-500 text-sm text-center mt-2">
              Effectuez votre première évaluation pour suivre votre évolution
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => {
              const trend = getTrend(index);
              return (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{item.date}</p>
                      <div className="flex items-center gap-2">
                        <span 
                          className={`px-3 py-1 rounded-full text-sm ${getRiskBadgeClass(item.riskLevel)}`}
                        >
                          {item.riskLevel === 'faible' && 'Risque faible'}
                          {item.riskLevel === 'modéré' && 'Risque modéré'}
                          {item.riskLevel === 'élevé' && 'Risque élevé'}
                        </span>
                        {trend && (
                          <div className="flex items-center">
                            {trend === 'down' && <TrendingDown size={16} className="text-[#2FAE78]" />}
                            {trend === 'up' && <TrendingUp size={16} className="text-red-500" />}
                            {trend === 'stable' && <Minus size={16} className="text-gray-400" />}
                          </div>
                        )}
                      </div>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${getRiskColor(item.riskLevel)}20` }}
                    >
                      <p style={{ color: getRiskColor(item.riskLevel) }}>
                        {item.riskLevel === 'faible' && '25%'}
                        {item.riskLevel === 'modéré' && '60%'}
                        {item.riskLevel === 'élevé' && '90%'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">IMC</p>
                      <p className="text-gray-900 text-sm">{item.bmi}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Tension</p>
                      <p className="text-gray-900 text-sm">{item.systolic}/{item.diastolic}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Âge</p>
                      <p className="text-gray-900 text-sm">{item.age} ans</p>
                    </div>
                  </div>

                  {item.diabetes === 'oui' || item.smoking === 'oui' ? (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-500 text-xs mb-2">Facteurs de risque</p>
                      <div className="flex gap-2">
                        {item.diabetes === 'oui' && (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                            Diabète
                          </span>
                        )}
                        {item.smoking === 'oui' && (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                            Tabac
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
