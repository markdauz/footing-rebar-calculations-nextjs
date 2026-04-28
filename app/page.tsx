'use client';

import { useState } from 'react';
import FootingCalculator from '@/components/Footing/FootingCalculator';
import NavBar from '@/components/NavBar';
import ConcreteCalculator from '@/components/Concrete/ConcreteCalculator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'footing' | 'concrete'>('footing');

  return (
    <>
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 pt-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-300 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('footing')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'footing'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Footing
          </button>

          <button
            onClick={() => setActiveTab('concrete')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'concrete'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Concrete
          </button>
        </div>

        {/* Content */}
        {activeTab === 'footing' && <FootingCalculator />}
        {activeTab === 'concrete' && <ConcreteCalculator />}
      </div>
    </>
  );
}
