import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, Edit2, Save, Shield, Activity } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onBack: () => void;
  onUpdateUser: (user: any) => void;
}

export function UserProfile({ user, onBack, onUpdateUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Utilisateur',
    email: user?.email || '',
    phone: '',
    birthDate: '',
    gender: '',
    height: '',
    weight: ''
  });

  const handleSave = () => {
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return `${age} ans`;
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-24 rounded-b-[40px]">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white">Profil</h2>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-white"
          >
            {isEditing ? <Save size={24} /> : <Edit2 size={24} />}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            <User size={48} className="text-[#2FAE78]" />
          </div>
          <h3 className="text-white mb-1">{formData.name}</h3>
          {formData.email && (
            <p className="text-white/80 text-sm">{formData.email}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 -mt-16 pb-8">
        {/* Personal information */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h4 className="text-gray-900 mb-4">Informations personnelles</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-2">Nom complet</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                />
              ) : (
                <p className="text-gray-900">{formData.email || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Téléphone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+237 6XX XX XX XX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                />
              ) : (
                <p className="text-gray-900">{formData.phone || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Date de naissance</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                />
              ) : (
                <p className="text-gray-900">
                  {formData.birthDate ? `${formData.birthDate} (${calculateAge(formData.birthDate)})` : 'Non renseigné'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Sexe</label>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'homme' })}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      formData.gender === 'homme'
                        ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Homme
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'femme' })}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      formData.gender === 'femme'
                        ? 'border-[#2FAE78] bg-[#2FAE78]/10 text-[#2FAE78]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Femme
                  </button>
                </div>
              ) : (
                <p className="text-gray-900">{formData.gender || 'Non renseigné'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Health metrics */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#2FAE78]" />
            Caractéristiques physiques
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-2">Taille (cm)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                  placeholder="170"
                />
              ) : (
                <p className="text-gray-900">{formData.height ? `${formData.height} cm` : 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Poids (kg)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2FAE78] focus:outline-none text-gray-900"
                  placeholder="70"
                />
              ) : (
                <p className="text-gray-900">{formData.weight ? `${formData.weight} kg` : 'Non renseigné'}</p>
              )}
            </div>
          </div>

          {formData.height && formData.weight && (
            <div className="mt-4 bg-[#E8EEF5] rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">IMC calculé</p>
              <p className="text-gray-900">
                {(parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)} kg/m²
              </p>
            </div>
          )}
        </div>

        {/* Privacy section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-[#246EE9]" />
            Confidentialité et consentements
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="consent1" 
                defaultChecked
                className="mt-1 w-5 h-5 text-[#2FAE78] rounded focus:ring-[#2FAE78]"
              />
              <label htmlFor="consent1" className="text-gray-700 text-sm flex-1">
                J'accepte que mes données de santé soient stockées localement sur mon appareil
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="consent2"
                className="mt-1 w-5 h-5 text-[#2FAE78] rounded focus:ring-[#2FAE78]"
              />
              <label htmlFor="consent2" className="text-gray-700 text-sm flex-1">
                J'accepte de recevoir des notifications de prévention santé
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="consent3"
                className="mt-1 w-5 h-5 text-[#2FAE78] rounded focus:ring-[#2FAE78]"
              />
              <label htmlFor="consent3" className="text-gray-700 text-sm flex-1">
                J'accepte de recevoir des suggestions d'articles personnalisés
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-xs">
              Conformément au RGPD, vos données personnelles sont protégées et ne sont jamais partagées avec des tiers. Vous pouvez demander leur suppression à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
