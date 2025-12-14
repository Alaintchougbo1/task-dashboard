'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckSquare, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Task Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gérez vos tâches efficacement avec une interface moderne et
            intuitive
          </p>
          <Button size="lg" onClick={() => router.push('/dashboard')}>
            Commencer maintenant
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <CheckSquare className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Organisation simple</h3>
            <p className="text-gray-600">
              Créez et organisez vos tâches par statut et priorité
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Suivi en temps réel</h3>
            <p className="text-gray-600">
              Visualisez votre progression avec des statistiques claires
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interface moderne</h3>
            <p className="text-gray-600">
              Design responsive et accessible sur tous vos appareils
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
