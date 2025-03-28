'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Données pour le graphique
const generateData = () => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return months.map((month) => ({
    name: month,
    Visiteurs: Math.floor(Math.random() * 5000) + 1000,
    Conversions: Math.floor(Math.random() * 500) + 100,
  }));
};

export default function AnalyticsChart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement de données
    setTimeout(() => {
      setData(generateData());
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div className="h-96 w-full bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="h-96 w-full bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Visiteurs" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Conversions" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}