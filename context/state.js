import React, { createContext, useState } from 'react';

export const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  
  const addPrediction = (data) => {
    const entry = { ...data, date: new Date().toLocaleDateString('fr-FR') };
    setPredictionData(entry);
    setHistory((h) => [entry, ...h]);
  };

  const selectArticle = (article) => setSelectedArticle(article);
  const selectCenter = (center) => setSelectedCenter(center);

  return (
    <AppStateContext.Provider value={{
      user, // a supprimer plus utiliser
      setUser, // a supprimer plus utiliser
      predictionData,
      setPredictionData,
      history,
      addPrediction,
      selectedArticle,
      selectArticle,
      selectedCenter,
      selectCenter,
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
