import React from 'react';
import { ArrowLeft, Clock, Calendar, ExternalLink, Bookmark, Share2 } from 'lucide-react';
import { ImageWithFallback } from './img/ImageWithFallback';

interface ArticleDetailProps {
  article: any;
  onBack: () => void;
}

export function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Hypertension': '#EF4444',
      'Diabète': '#FBD45A',
      'Nutrition': '#2FAE78',
      'Tabac': '#6B7280',
      'Prévention': '#246EE9'
    };
    return colors[category] || '#246EE9';
  };

  const fullContent = `
L'hypertension artérielle est l'un des principaux facteurs de risque cardiovasculaire en Afrique subsaharienne. Cette pathologie, souvent silencieuse, touche une part importante de la population adulte.

## Qu'est-ce que l'hypertension ?

L'hypertension artérielle se définit par une pression artérielle systolique supérieure ou égale à 140 mmHg et/ou une pression diastolique supérieure ou égale à 90 mmHg, mesurée à plusieurs reprises.

## Spécificités en milieu tropical

Plusieurs facteurs influencent la prévalence de l'hypertension en zone tropicale :

• **Facteurs génétiques** : Certaines populations présentent une prédisposition génétique
• **Alimentation** : Consommation élevée de sel dans les aliments traditionnels
• **Urbanisation rapide** : Changement des modes de vie et sédentarité
• **Stress** : Conditions de vie et pressions socio-économiques
• **Climat** : Déshydratation et variations de température

## Signes d'alerte

L'hypertension est souvent asymptomatique, mais certains signes peuvent alerter :
- Maux de tête persistants
- Vertiges ou étourdissements
- Vision trouble
- Saignements de nez
- Palpitations cardiaques

## Prévention et traitement

### Mesures hygiéno-diététiques
1. **Réduction du sel** : Limiter à moins de 5g par jour
2. **Alimentation équilibrée** : Privilégier fruits, légumes et céréales complètes
3. **Activité physique** : Au moins 30 minutes par jour
4. **Gestion du stress** : Techniques de relaxation et sommeil de qualité
5. **Éviter le tabac et l'alcool**

### Suivi médical
Un suivi régulier est essentiel pour :
- Mesurer la tension artérielle
- Ajuster le traitement si nécessaire
- Prévenir les complications

## Conclusion

La prévention et le dépistage précoce de l'hypertension sont essentiels pour réduire le risque de complications cardiovasculaires graves. N'hésitez pas à consulter un professionnel de santé pour un bilan complet.
  `;

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-6 bg-with-texture animate-header relative z-20">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="text-white">
              <Bookmark size={24} />
            </button>
            <button className="text-white">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-56 bg-gradient-to-b from-[#246EE9]/20 to-transparent">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1530026454774-50cce722a1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhlYWx0aCUyMG1lZGljYWx8ZW58MXx8fHwxNzY0NjY5MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Article illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF6] to-transparent" />
        </div>

        <div className="px-6 -mt-8 relative z-10">
          {/* Article header */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="text-xs px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${getCategoryColor(article.category)}20`,
                  color: getCategoryColor(article.category)
                }}
              >
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>
            <h1 className="text-gray-900 mb-3">{article.title}</h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#E8EEF5] rounded-3xl p-6 mb-6">
            <h3 className="text-gray-900 mb-3">Résumé</h3>
            <p className="text-gray-700">{article.summary}</p>
          </div>

          {/* Full content */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <h3 className="text-gray-900 mb-4">Contenu détaillé</h3>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              {fullContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h4 key={index} className="text-gray-900 mt-6 mb-3">
                      {paragraph.replace('##', '').trim()}
                    </h4>
                  );
                } else if (paragraph.startsWith('###')) {
                  return (
                    <h5 key={index} className="text-gray-900 mt-4 mb-2">
                      {paragraph.replace('###', '').trim()}
                    </h5>
                  );
                } else if (paragraph.includes('•')) {
                  const items = paragraph.split('•').filter(item => item.trim());
                  return (
                    <ul key={index} className="space-y-2 ml-4">
                      {items.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#2FAE78] mt-1">•</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.match(/^\d\./)) {
                  const items = paragraph.split(/\d\./).filter(item => item.trim());
                  return (
                    <ol key={index} className="space-y-2 ml-4 list-decimal">
                      {items.map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ol>
                  );
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph.trim()}</p>;
                }
                return null;
              })}
            </div>
          </div>

          {/* External link */}
          <button className="w-full bg-[#246EE9] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#1e5bc4] transition-colors mb-8 btn-press btn-press-strong">
            <ExternalLink size={20} />
            Lire l'article complet 
          </button>
        </div>
      </div>
    </div>
  );
}
