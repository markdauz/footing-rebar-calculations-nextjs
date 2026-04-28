'use client';

import React, { useState } from 'react';
import Slab from './Slab';
import Footing from './Footing';
import Column from './Column';
import Beam from './Beam';

type TabType = 'slab' | 'footing' | 'column' | 'beam';

export default function ConcreteCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('slab');

  const renderContent = () => {
    switch (activeTab) {
      case 'slab':
        return <Slab />;
      case 'footing':
        return <Footing />;
      case 'column':
        return <Column />;
      case 'beam':
        return <Beam />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
        Cement, Sand, Gravel and CHB Estimate
      </h1>

      {/* TABS */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar bg-white/60 dark:bg-slate-800/60 p-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          {[
            { key: 'slab', label: 'Slab' },
            { key: 'footing', label: 'Footing' },
            { key: 'column', label: 'Column' },
            { key: 'beam', label: 'Beam' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabType)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="transition-all duration-300">{renderContent()}</div>
    </div>
  );
}
