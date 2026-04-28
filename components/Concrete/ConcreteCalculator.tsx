import React from 'react';
import Slab from './Slab';
import Footing from './Footing';

export default function ConcreteCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Cement, Sand, Gravel and CHB Estimate
      </h1>
      <Slab />
      <Footing />
    </div>
  );
}
