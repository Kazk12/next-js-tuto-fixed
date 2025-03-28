import { Metadata } from 'next';
import { Suspense } from 'react';
import { ChartSkeleton, StatsSkeleton, TableSkeleton } from '@/app/ui/skeletons';
import AnalyticsStats from './components/stats';
import AnalyticsChart from './components/chart';
import AnalyticsTable from './components/table';
import AnalyticsForm from './components/form';
import { AnalyticsProvider } from './context/analytics-context';

export const metadata: Metadata = {
  title: 'Tableau d\'analyse | Dashboard',
  description: 'Visualisez et analysez vos données en temps réel',
};

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Tableau d'analyse</h1>
        </div>
        
        {/* Section des statistiques */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Statistiques en temps réel</h2>
          <Suspense fallback={<StatsSkeleton />}>
            <AnalyticsStats />
          </Suspense>
        </div>
        
        {/* Section du graphique */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Performance mensuelle</h2>
          <Suspense fallback={<ChartSkeleton />}>
            <AnalyticsChart />
          </Suspense>
        </div>
        
        {/* Section du formulaire */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Ajouter une donnée</h2>
          <AnalyticsForm />
        </div>
        
        {/* Section de la table */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Dernières activités</h2>
          <Suspense fallback={<TableSkeleton />}>
            <AnalyticsTable />
          </Suspense>
        </div>
      </div>
    </AnalyticsProvider>
  );
}