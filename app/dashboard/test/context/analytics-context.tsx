'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface AnalyticsItem {
  id: number;
  event: string;
  category: string;
  value: number;
  date: string;
  status: string;
}

interface AnalyticsContextType {
  items: AnalyticsItem[];
  addItem: (item: Omit<AnalyticsItem, 'id' | 'status'>) => void;
}

// Contexte par défaut
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Génération de données initiales
const generateInitialData = (): AnalyticsItem[] => {
  const data: AnalyticsItem[] = [];
  for (let i = 1; i <= 20; i++) {
    data.push({
      id: i,
      event: `Événement ${i}`,
      category: ['Site web', 'Mobile', 'Réseaux sociaux', 'Email'][Math.floor(Math.random() * 4)],
      value: Math.floor(Math.random() * 1000) + 100,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('fr-FR'),
      status: ['Actif', 'En attente', 'Terminé', 'Annulé'][Math.floor(Math.random() * 4)]
    });
  }
  return data;
};

// Provider du contexte
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<AnalyticsItem[]>(generateInitialData());

  const addItem = (newItem: Omit<AnalyticsItem, 'id' | 'status'>) => {
    const item: AnalyticsItem = {
      ...newItem,
      id: items.length ? Math.max(...items.map(item => item.id)) + 1 : 1,
      status: 'Actif', // Par défaut, un nouvel événement est actif
    };
    
    setItems(prevItems => [item, ...prevItems]);
  };

  return (
    <AnalyticsContext.Provider value={{ items, addItem }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics doit être utilisé à l\'intérieur d\'un AnalyticsProvider');
  }
  return context;
}