// Partie serveur - pour récupérer les données
async function fetchStats() {
  // Simulons une requête API
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  return {
    visitors: Math.floor(Math.random() * 10000),
    revenue: Math.floor(Math.random() * 50000),
    conversionRate: (Math.random() * 10).toFixed(2),
    averageTime: Math.floor(Math.random() * 300)
  };
}

// Composant serveur principal
export default async function AnalyticsStats() {
  const stats = await fetchStats();
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Visiteurs"
        value={stats.visitors.toLocaleString()}
        change="+12.3%"
        changeType="positive"
      />
      <StatsCard 
        title="Revenu"
        value={`$${stats.revenue.toLocaleString()}`}
        change="+8.2%"
        changeType="positive"
      />
      <StatsCard 
        title="Taux de conversion"
        value={`${stats.conversionRate}%`}
        change="-2.1%"
        changeType="negative"
      />
      <StatsCard 
        title="Temps moyen"
        value={`${stats.averageTime} sec.`}
        change="+5.4%"
        changeType="positive"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

// Composant client pour l'interactivité (pas besoin de 'use client' ici car il n'utilise pas de hooks)
function StatsCard({ title, value, change, changeType }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}