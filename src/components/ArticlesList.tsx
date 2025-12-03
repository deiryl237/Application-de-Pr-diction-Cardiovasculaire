import React, { useState } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface ArticlesListProps {
  onSelectArticle: (article: any) => void;
  onBack: () => void;
}

export function ArticlesList({ onSelectArticle, onBack }: ArticlesListProps) {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['Tous', 'Hypertension', 'Diabète', 'Nutrition', 'Tabac', 'Prévention'];

  const articles = [
    {
      id: 1,
      title: "L'hypertension artérielle en milieu tropical",
      category: "Hypertension",
      readTime: "5 min",
      summary: "Comprendre les spécificités de l'hypertension en zone tropicale et les facteurs de risque associés.",
      date: "15 Nov 2024",
      featured: true
    },
    {
      id: 2,
      title: "Prévention cardiovasculaire : les bons gestes quotidiens",
      category: "Prévention",
      readTime: "7 min",
      summary: "Adoptez des habitudes simples et efficaces pour protéger votre cœur au quotidien.",
      date: "10 Nov 2024",
      featured: true
    },
    {
      id: 3,
      title: "Diabète et risque cardiovasculaire",
      category: "Diabète",
      readTime: "6 min",
      summary: "Le lien entre diabète et maladies cardiovasculaires : ce qu'il faut savoir.",
      date: "5 Nov 2024",
      featured: false
    },
    {
      id: 4,
      title: "Alimentation méditerranéenne adaptée au contexte africain",
      category: "Nutrition",
      readTime: "8 min",
      summary: "Comment adapter les principes de l'alimentation cardio-protectrice avec des aliments locaux.",
      date: "1 Nov 2024",
      featured: false
    },
    {
      id: 5,
      title: "Sevrage tabagique : stratégies efficaces",
      category: "Tabac",
      readTime: "6 min",
      summary: "Méthodes éprouvées pour arrêter de fumer et réduire votre risque cardiovasculaire.",
      date: "28 Oct 2024",
      featured: false
    },
    {
      id: 6,
      title: "Activité physique en climat chaud",
      category: "Prévention",
      readTime: "5 min",
      summary: "Conseils pratiques pour maintenir une activité physique régulière sous les tropiques.",
      date: "20 Oct 2024",
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesFilter = selectedFilter === 'Tous' || article.category === selectedFilter;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  return (
    <div className="h-full flex flex-col bg-[#FAFAF6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2FAE78] to-[#246EE9] px-6 pt-12 pb-8 rounded-b-[40px] bg-with-texture animate-header relative z-10">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white flex-1 text-center mr-6">Articles</h2>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" size={20} strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:outline-none text-gray-900 bg-white/20"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-[#2FAE78] text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Articles list */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className={`w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left btn-press ${
                article.featured ? 'border-2 border-[#246EE9]' : ''
              }`}
            >
              {article.featured && (
                <div className="inline-block bg-[#246EE9] text-white text-xs px-3 py-1 rounded-full mb-3">
                  Recommandé
                </div>
              )}
              <h3 className="text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${getCategoryColor(article.category)}20`,
                      color: getCategoryColor(article.category)
                    }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <span className="text-xs text-gray-400">{article.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
