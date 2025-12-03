import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function PredictionForm({ onSubmit, onBack }: PredictionFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    systolic: '',
    diastolic: '',
    height: '',
    weight: '',
    diabetes: '',
    smoking: '',
    activity: '',
    family_history: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate risk level (simple logic for demo)
      const age = parseInt(formData.age);
      const systolic = parseInt(formData.systolic);
      const bmi = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
      
      let riskLevel = 'faible';
      if (age > 55 || systolic > 140 || bmi > 30 || formData.diabetes === 'oui' || formData.smoking === 'oui') {
        riskLevel = 'modéré';
      }
      if ((age > 60 && systolic > 150) || (formData.diabetes === 'oui' && formData.smoking === 'oui')) {
        riskLevel = 'élevé';
      }
      
      onSubmit({ ...formData, riskLevel, bmi });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    if (step === 1) return formData.age && formData.gender;
    if (step === 2) return formData.systolic && formData.diastolic;
    if (step === 3) return formData.height && formData.weight;
    if (step === 4) return formData.diabetes && formData.smoking && formData.activity;
    return false;
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Évaluation du risque</h2>
        </div>
        
        {/* Progress bar */}
        <div className="flex gap-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index < step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <p className="text-white/90 text-center mt-4">
          Étape {step} sur {totalSteps}
        </p>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">
                Quel est votre âge ?
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                placeholder="Entrez votre âge"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-3">
                Sexe
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateFormData('gender', 'homme')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.gender === 'homme'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Homme
                </button>
                <button
                  onClick={() => updateFormData('gender', 'femme')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.gender === 'femme'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Femme
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">
                Pression artérielle systolique (mmHg)
              </label>
              <input
                type="number"
                value={formData.systolic}
                onChange={(e) => updateFormData('systolic', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                placeholder="Ex: 120"
              />
              <p className="text-gray-500 text-sm mt-2">La valeur la plus élevée</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-3">
                Pression artérielle diastolique (mmHg)
              </label>
              <input
                type="number"
                value={formData.diastolic}
                onChange={(e) => updateFormData('diastolic', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                placeholder="Ex: 80"
              />
              <p className="text-gray-500 text-sm mt-2">La valeur la plus faible</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">
                Taille (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => updateFormData('height', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                placeholder="Ex: 170"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-3">
                Poids (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => updateFormData('weight', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                placeholder="Ex: 70"
              />
            </div>

            {formData.height && formData.weight && (
              <div className="bg-[#E8EEF5] rounded-2xl p-4">
                <p className="text-gray-600 text-sm mb-1">Votre IMC</p>
                <p className="text-gray-900">
                  {calculateBMI(parseFloat(formData.weight), parseFloat(formData.height))} kg/m²
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">
                Avez-vous du diabète ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateFormData('diabetes', 'oui')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.diabetes === 'oui'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Oui
                </button>
                <button
                  onClick={() => updateFormData('diabetes', 'non')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.diabetes === 'non'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">
                Fumez-vous ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateFormData('smoking', 'oui')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.smoking === 'oui'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Oui
                </button>
                <button
                  onClick={() => updateFormData('smoking', 'non')}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    formData.smoking === 'non'
                      ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">
                Activité physique
              </label>
              <div className="space-y-2">
                {['Régulière', 'Modérée', 'Faible'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('activity', option)}
                    className={`w-full py-4 rounded-2xl border-2 transition-all ${
                      formData.activity === option
                        ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all ${
            isStepValid()
              ? 'bg-[#2FAE78] text-white hover:bg-[#27975f]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {step === totalSteps ? 'Calculer mon risque' : 'Suivant'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
