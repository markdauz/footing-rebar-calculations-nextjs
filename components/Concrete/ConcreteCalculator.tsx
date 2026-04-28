import React from 'react';
import Slab from './Slab';

export default function ConcreteCalculator() {
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Cement, Sand, Gravel and CHB Estimate
      </h1>
      <Slab />
    </>
  );
}
