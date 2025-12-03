import React, { useState } from 'react';
import { Heart, FileText, MapPin, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      // use local illustration image instead of the Heart icon
      image: '/src/illu%20sn.png',
      title: 'Protégez votre cœur',
      description: 'Évaluez votre risque cardiovasculaire en quelques minutes avec notre outil intelligent basé sur les recommandations OMS.',
      color: '#2FAE78'
    },
    {
      icon: FileText,
      title: 'Informations fiables',
      description: 'Accédez à des articles scientifiques vulgarisés sur les maladies cardiovasculaires adaptés à votre profil.',
      color: '#246EE9'
    },
    {
      icon: MapPin,
      title: 'Centres de santé à proximité',
      description: 'Trouvez facilement les pharmacies et centres équipés pour le dépistage et le suivi cardiovasculaire.',
      color: '#FBD45A'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;
  const ImageUrl = currentSlideData.image;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-[#E8EEF5] p-8 relative bg-with-texture animate-header">
      {/* Skip button */}
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 text-gray-500 px-4 py-2"
      >
        Passer
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Icon or image */}
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center mb-12 overflow-hidden"
          style={{ backgroundColor: `${currentSlideData.color}20` }}
        >
          {ImageUrl ? (
            <img src={ImageUrl} alt="Illustration" className="w-24 h-24 object-contain" />
          ) : (
            <Icon size={64} color={currentSlideData.color} strokeWidth={1.5} />
          )}
        </div>

        {/* Title */}
        <h1 className="text-center mb-6 text-gray-900">
          {currentSlideData.title}
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-[320px] px-4">
          {currentSlideData.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="space-y-6">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-[#2FAE78]' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#2FAE78] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#27975f] transition-colors btn-press"
        >
          {currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
