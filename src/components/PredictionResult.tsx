import React from 'react';
import { ArrowLeft, MapPin, TrendingUp, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface PredictionResultProps {
  data: any;
  onBack: () => void;
  onViewCenters: () => void;
  onViewHistory: () => void;
}

export function PredictionResult({ data, onBack, onViewCenters, onViewHistory }: PredictionResultProps) {
  const getRiskColor = (level: string) => {
    if (level === 'faible') return '#2FAE78';
    if (level === 'modéré') return '#FBD45A';
    return '#EF4444';
  };

  const getRiskIcon = (level: string) => {
    if (level === 'faible') return CheckCircle;
    if (level === 'modéré') return AlertTriangle;
    return AlertCircle;
  };

  const getRiskPercentage = (level: string) => {
    if (level === 'faible') return 25;
    if (level === 'modéré') return 60;
    return 90;
  };

  const getRecommendations = (level: string) => {
    if (level === 'faible') {
      return [
        'Maintenez une alimentation équilibrée riche en fruits et légumes',
        'Pratiquez au moins 30 minutes d\'activité physique par jour',
        'Contrôlez votre tension artérielle une fois par an',
        'Évitez le tabac et limitez la consommation d\'alcool'
      ];
    } else if (level === 'modéré') {
      return [
        'Consultez un médecin pour un bilan cardiovasculaire complet',
        'Réduisez votre consommation de sel et d\'aliments gras',
        'Augmentez votre activité physique progressivement',
        'Surveillez régulièrement votre tension artérielle',
        'Si vous fumez, envisagez un sevrage tabagique'
      ];
    } else {
      return [
        'Consultez RAPIDEMENT un médecin ou cardiologue',
        'Suivez scrupuleusement les traitements prescrits',
        'Surveillez quotidiennement votre tension artérielle',
        'Adoptez immédiatement un régime pauvre en sel',
        'Arrêtez le tabac si vous fumez',
        'Réduisez le stress et assurez un sommeil de qualité'
      ];
    }
  };

  const RiskIcon = getRiskIcon(data.riskLevel);
  const riskColor = getRiskColor(data.riskLevel);
  const percentage = getRiskPercentage(data.riskLevel);

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Résultat de l'évaluation</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Risk indicator */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 -mt-12">
          <div className="flex flex-col items-center">
            {/* Circular progress */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E8EEF5"
                  strokeWidth="16"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={riskColor}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${percentage * 5.03} 503`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RiskIcon size={48} color={riskColor} />
                <p className="mt-2" style={{ color: riskColor }}>
                  {percentage}%
                </p>
              </div>
            </div>

            <h3 className="text-gray-900 mb-2">
              {data.riskLevel === 'faible' && 'Risque Faible'}
              {data.riskLevel === 'modéré' && 'Risque Modéré'}
              {data.riskLevel === 'élevé' && 'Risque Élevé'}
            </h3>
            <p className="text-gray-600 text-center">
              {data.riskLevel === 'faible' && 'Votre risque cardiovasculaire est faible. Continuez vos bonnes habitudes !'}
              {data.riskLevel === 'modéré' && 'Votre risque cardiovasculaire est modéré. Des changements sont recommandés.'}
              {data.riskLevel === 'élevé' && 'Votre risque cardiovasculaire est élevé. Une consultation médicale est fortement recommandée.'}
            </p>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-gray-500 text-sm mb-1">IMC</p>
            <p className="text-gray-900">{data.bmi} kg/m²</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <p className="text-gray-500 text-sm mb-1">Tension</p>
            <p className="text-gray-900">{data.systolic}/{data.diastolic}</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <p className="text-gray-500 text-sm mb-1">Âge</p>
            <p className="text-gray-900">{data.age} ans</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <p className="text-gray-500 text-sm mb-1">Activité</p>
            <p className="text-gray-900">{data.activity}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h4 className="text-gray-900 mb-4">Recommandations OMS</h4>
          <div className="space-y-3">
            {getRecommendations(data.riskLevel).map((recommendation, index) => (
              <div key={index} className="flex gap-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${riskColor}20` }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: riskColor }}
                  />
                </div>
                <p className="text-gray-700 text-sm flex-1">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onViewCenters}
            className="w-full bg-[#2FAE78] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#27975f] transition-colors btn-press"
          >
            <MapPin size={20} />
            Trouver un centre de santé
          </button>
          <button
            onClick={onViewHistory}
            className="w-full bg-white text-[#246EE9] py-4 rounded-full flex items-center justify-center gap-2 border-2 border-[#246EE9] hover:bg-[#246EE9]/5 transition-colors btn-press"
          >
            <TrendingUp size={20} />
            Voir mon historique
          </button>
        </div>
      </div>
    </div>
  );
}
