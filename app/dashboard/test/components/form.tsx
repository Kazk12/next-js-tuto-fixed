'use client';

import { useState } from 'react';
import { useAnalytics } from '../context/analytics-context';

interface FormData {
  name: string;
  category: string;
  value: string;
  date: string;
}

export default function AnalyticsForm() {
  const { addItem } = useAnalytics();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Site web',
    value: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      // Simuler une requête API avec un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ajouter l'élément au contexte
      addItem({
        event: formData.name,
        category: formData.category,
        value: parseInt(formData.value, 10),
        date: new Date(formData.date).toLocaleDateString('fr-FR')
      });
      
      // Réinitialiser le formulaire et afficher un message de succès
      setMessage('Données ajoutées avec succès !');
      setFormData({
        name: '',
        category: 'Site web',
        value: '',
        date: ''
      });
    } catch (error) {
      setMessage('Erreur lors de l\'ajout des données.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom de l'événement
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Site web">Site web</option>
              <option value="Mobile">Mobile</option>
              <option value="Réseaux sociaux">Réseaux sociaux</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Valeur
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'En cours...' : 'Ajouter'}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}