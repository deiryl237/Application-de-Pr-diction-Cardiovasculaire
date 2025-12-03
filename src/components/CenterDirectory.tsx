import React, { useState } from 'react';
import { ArrowLeft, MapPin, Search, Navigation, Phone, Clock, Map } from 'lucide-react';

interface CenterDirectoryProps {
  onSelectCenter: (center: any) => void;
  onBack: () => void;
}

export function CenterDirectory({ onSelectCenter, onBack }: CenterDirectoryProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedEquipment, setSelectedEquipment] = useState('Tous');

  const equipmentFilters = ['Tous', 'Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'];

  const centers = [
    {
      id: 1,
      name: "Centre Médical Saint-Joseph",
      type: "Centre de santé",
      address: "Avenue de la Paix, Quartier Akwa",
      distance: "0.8 km",
      phone: "+237 6XX XX XX XX",
      hours: "Lun-Sam 8h-18h",
      equipment: ['Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'],
      available: true,
      lat: 4.0511,
      lng: 9.7679
    },
    {
      id: 2,
      name: "Pharmacie du Plateau",
      type: "Pharmacie",
      address: "Boulevard de la Liberté",
      distance: "1.2 km",
      phone: "+237 6XX XX XX XX",
      hours: "Lun-Dim 7h-21h",
      equipment: ['Tensiomètre', 'Glycémie'],
      available: true,
      lat: 4.0489,
      lng: 9.7701
    },
    {
      id: 3,
      name: "Hôpital Général de Référence",
      type: "Hôpital",
      address: "Route de Bonabéri",
      distance: "2.5 km",
      phone: "+237 6XX XX XX XX",
      hours: "24h/24 - 7j/7",
      equipment: ['Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'],
      available: true,
      lat: 4.0534,
      lng: 9.7612
    },
    {
      id: 4,
      name: "Centre Cardiologique de Douala",
      type: "Centre spécialisé",
      address: "Rue des Cocotiers, Bonanjo",
      distance: "3.1 km",
      phone: "+237 6XX XX XX XX",
      hours: "Lun-Ven 8h-17h",
      equipment: ['Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'],
      available: true,
      lat: 4.0456,
      lng: 9.7734
    },
    {
      id: 5,
      name: "Pharmacie de la Santé",
      type: "Pharmacie",
      address: "Marché Central",
      distance: "1.8 km",
      phone: "+237 6XX XX XX XX",
      hours: "Lun-Sam 8h-19h",
      equipment: ['Tensiomètre', 'Glycémie'],
      available: false,
      lat: 4.0523,
      lng: 9.7645
    }
  ];

  const filteredCenters = centers.filter(center => {
    if (selectedEquipment === 'Tous') return true;
    return center.equipment.includes(selectedEquipment);
  });

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
       <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Centres de santé</h2>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white " size={20} />
          <input
            type="text"
            placeholder="Rechercher un centre..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:outline-none text-gray-900 bg-white/20"
          />
        </div>

        {/* View toggle */}
        <div className="flex bg-white/20 rounded-full p-1 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 transition-all ${
              viewMode === 'map' ? 'bg-white text-[#2FAE78]' : 'text-white'
            }`}
          >
            <Map size={18} />
            Carte
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 transition-all ${
              viewMode === 'list' ? 'bg-white text-[#2FAE78]' : 'text-white'
            }`}
          >
            <MapPin size={18} />
            Liste
          </button>
        </div>
      </div>

      {/* Equipment filters */}
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {equipmentFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedEquipment(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                selectedEquipment === filter
                  ? 'bg-[#2FAE78] text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Map/List view */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {viewMode === 'map' ? (
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg h-full">
            {/* Map placeholder with pins */}
            <div className="relative h-full bg-[#E8EEF5]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Carte interactive</p>
                  <p className="text-gray-500 text-sm">{filteredCenters.length} centres trouvés</p>
                </div>
              </div>
              
              {/* Sample pins */}
              {filteredCenters.slice(0, 3).map((center, index) => (
                <button
                  key={center.id}
                  onClick={() => onSelectCenter(center)}
                  className="absolute bg-[#2FAE78] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform btn-press"
                  style={{
                    top: `${30 + index * 20}%`,
                    left: `${40 + index * 10}%`
                  }}
                >
                  <MapPin size={24} />
                </button>
              ))}

              {/* User location */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-[#246EE9] rounded-full border-4 border-white shadow-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCenters.map(center => (
              <button
                key={center.id}
                onClick={() => onSelectCenter(center)}
                  className="w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left btn-press"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{center.name}</h3>
                      {!center.available && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Fermé
                        </span>
                      )}
                    </div>
                    <span 
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${getTypeColor(center.type)}20`,
                        color: getTypeColor(center.type)
                      }}
                    >
                      {center.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#2FAE78]">
                    <Navigation size={16} />
                    <span className="text-sm">{center.distance}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock size={16} className="flex-shrink-0" />
                    <span>{center.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {center.equipment.map(eq => (
                    <span 
                      key={eq}
                      className="text-xs bg-[#E8EEF5] text-gray-700 px-3 py-1 rounded-full"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
