import React from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Share2, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './img/ImageWithFallback';

interface CenterDetailProps {
  center: any;
  onBack: () => void;
}

export function CenterDetail({ center, onBack }: CenterDetailProps) {
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Centre de santé': '#2FAE78',
      'Pharmacie': '#246EE9',
      'Hôpital': '#EF4444',
      'Centre spécialisé': '#FBD45A'
    };
    return colors[type] || '#246EE9';
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-6 bg-with-texture animate-header relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <button className="text-white">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-48 bg-gradient-to-b from-[#246EE9]/20 to-transparent">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1631507623121-eaaba8d4e7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzY0Njc3Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Centre médical"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF6] to-transparent" />
        </div>

        <div className="px-6 -mt-8">
          {/* Main info card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-gray-900 mb-2">{center.name}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${getTypeColor(center.type)}20`,
                      color: getTypeColor(center.type)
                    }}
                  >
                    {center.type}
                  </span>
                  {center.available ? (
                    <span className="text-xs bg-[#2FAE78]/10 text-[#2FAE78] px-2 py-1 rounded-full">
                      Ouvert
                    </span>
                  ) : (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      Fermé
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[#2FAE78] mb-1">
                  <Navigation size={16} />
                  <span className="text-sm">{center.distance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#E8EEF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#246EE9]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Adresse</p>
                  <p className="text-gray-900">{center.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#E8EEF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#246EE9]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Horaires</p>
                  <p className="text-gray-900">{center.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#E8EEF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#246EE9]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Téléphone</p>
                  <p className="text-gray-900">{center.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment available */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <h3 className="text-gray-900 mb-4">Équipements disponibles</h3>
            <div className="space-y-3">
              {center.equipment.map((eq: string) => (
                <div key={eq} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2FAE78]/10 rounded-full flex items-center justify-center">
                    <CheckCircle size={18} className="text-[#2FAE78]" />
                  </div>
                  <span className="text-gray-700">{eq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map preview */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
            <div className="relative h-48 bg-[#E8EEF5]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Carte de localisation</p>
                </div>
              </div>
              {/* Pin for the center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={32} className="text-[#2FAE78]" fill="#2FAE78" />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#2FAE78] rounded-full opacity-50 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pb-8">
            <button className="w-full bg-[#2FAE78] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#27975f] transition-colors btn-press">
              <Navigation size={20} />
              Obtenir l'itinéraire
            </button>
            <button className="w-full bg-white text-[#246EE9] py-4 rounded-full flex items-center justify-center gap-2 border-2 border-[#246EE9] hover:bg-[#246EE9]/5 transition-colors btn-press">
              <Phone size={20} />
              Appeler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
