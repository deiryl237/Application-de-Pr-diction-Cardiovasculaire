import React, { useState } from 'react';
import { ArrowLeft, Bell, Moon, Sun, Globe, Volume2, Shield, HelpCircle, Info, LogOut } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('Français');

  const languages = ['Français', 'English', 'العربية'];

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Paramètres</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={20} className="text-[#2FAE78]" />
            Notifications
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-900 mb-1">Activer les notifications</p>
                <p className="text-gray-500 text-sm">Recevoir des rappels de santé</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  notifications ? 'bg-[#2FAE78]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-900 mb-1">Rappels de prise de tension</p>
                <p className="text-gray-500 text-sm">Tous les lundis à 9h00</p>
              </div>
              <button
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  notifications ? 'bg-[#2FAE78]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-900 mb-1">Suggestions d'articles</p>
                <p className="text-gray-500 text-sm">Basées sur votre profil</p>
              </div>
              <button
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  notifications ? 'bg-[#2FAE78]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            {darkMode ? <Moon size={20} className="text-[#246EE9]" /> : <Sun size={20} className="text-[#FBD45A]" />}
            Apparence
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Mode sombre</p>
              <p className="text-gray-500 text-sm">Réduire la fatigue oculaire</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                darkMode ? 'bg-[#246EE9]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-[#246EE9]" />
            Langue
          </h4>
          
          <div className="space-y-2">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#2FAE78]/10 border-2 border-[#2FAE78] text-[#2FAE78]'
                    : 'bg-gray-50 border-2 border-transparent text-gray-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h4 className="text-gray-900 mb-4 flex items-center gap-2">
            <Volume2 size={20} className="text-[#246EE9]" />
            Son
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Sons de notification</p>
              <p className="text-gray-500 text-sm">Alertes sonores</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-[#2FAE78]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                soundEnabled ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* About & Help */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h4 className="text-gray-900 mb-4">Aide & À propos</h4>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <HelpCircle size={20} className="text-[#246EE9]" />
              <div className="flex-1">
                <p className="text-gray-900">Centre d'aide</p>
                <p className="text-gray-500 text-sm">FAQ et tutoriels</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <Shield size={20} className="text-[#246EE9]" />
              <div className="flex-1">
                <p className="text-gray-900">Confidentialité & Données</p>
                <p className="text-gray-500 text-sm">Politique RGPD</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <Info size={20} className="text-[#246EE9]" />
              <div className="flex-1">
                <p className="text-gray-900">À propos</p>
                <p className="text-gray-500 text-sm">Version 1.0.0</p>
              </div>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-100 transition-colors mb-8">
          <LogOut size={20} />
          Se déconnecter
        </button>

        {/* Footer note */}
        <div className="text-center text-gray-500 text-xs mb-4">
          <p>CardioGuard v1.0.0</p>
          <p className="mt-2">Développé pour la santé cardiovasculaire en Afrique</p>
        </div>
      </div>
    </div>
  );
}
