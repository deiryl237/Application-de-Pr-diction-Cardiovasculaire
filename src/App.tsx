import React, { useState } from 'react';
import PageTransition from './components/ui/PageTransition';
import { Onboarding } from './components/Onboarding';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { PredictionHistory } from './components/PredictionHistory';
import { ArticlesList } from './components/ArticlesList';
import { ArticleDetail } from './components/ArticleDetail';
import { CenterDirectory } from './components/CenterDirectory';
import { CenterDetail } from './components/CenterDetail';
import { UserProfile } from './components/UserProfile';
import { Settings } from './components/Settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);

  const navigateTo = (screen: string, data?: any) => {
    if (data) {
      if (screen === 'prediction-result') {
        setPredictionData(data);
        setRiskHistory([...riskHistory, { ...data, date: new Date().toLocaleDateString('fr-FR') }]);
      } else if (screen === 'article-detail') {
        setSelectedArticle(data);
      } else if (screen === 'center-detail') {
        setSelectedCenter(data);
      }
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => navigateTo('auth')} />;
      case 'auth':
        return <AuthScreen onLogin={(userData) => { setUser(userData); navigateTo('dashboard'); }} onSkip={() => navigateTo('dashboard')} />;
      case 'dashboard':
        return <Dashboard user={user} lastRisk={riskHistory[riskHistory.length - 1]} onNavigate={navigateTo} />;
      case 'prediction-form':
        return <PredictionForm onSubmit={(data) => navigateTo('prediction-result', data)} onBack={() => navigateTo('dashboard')} />;
      case 'prediction-result':
        return <PredictionResult data={predictionData} onBack={() => navigateTo('dashboard')} onViewCenters={() => navigateTo('centers')} onViewHistory={() => navigateTo('prediction-history')} />;
      case 'prediction-history':
        return <PredictionHistory history={riskHistory} onBack={() => navigateTo('dashboard')} />;
      case 'articles':
        return <ArticlesList onSelectArticle={(article) => navigateTo('article-detail', article)} onBack={() => navigateTo('dashboard')} />;
      case 'article-detail':
        return <ArticleDetail article={selectedArticle} onBack={() => navigateTo('articles')} />;
      case 'centers':
        return <CenterDirectory onSelectCenter={(center) => navigateTo('center-detail', center)} onBack={() => navigateTo('dashboard')} />;
      case 'center-detail':
        return <CenterDetail center={selectedCenter} onBack={() => navigateTo('centers')} />;
      case 'profile':
        return <UserProfile user={user} onBack={() => navigateTo('dashboard')} onUpdateUser={setUser} />;
      case 'settings':
        return <Settings onBack={() => navigateTo('dashboard')} />;
      default:
        return <Dashboard user={user} lastRisk={riskHistory[riskHistory.length - 1]} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF6] flex items-center justify-center p-4">
      <div className="w-full max-w-[414px] h-[896px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        <PageTransition id={currentScreen} className="h-full">
          {renderScreen()}
        </PageTransition>
      </div>
    </div>
  );
}
