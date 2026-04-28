'use client';

import { useState, useMemo } from 'react';
import Input from './Input';
import ResultCard from './ResultCard';
import {
  getCutSizeA,
  getCutSizeB,
  computeOption,
  getTieWire,
  getVolume,
} from '@/lib/footingRebarCalculator';

export default function FootingCalculator() {
  const DEFAULT_INPUT = {
    width: '0.8',
    length: '0.8',
    thickness: '0.3',
    diameter: '12',
    steelLength: '6',
    quantity: '1',
    barsW: '5',
    barsL: '5',
  };

  const [input, setInput] = useState(DEFAULT_INPUT);

  const cutSizeW_A = useMemo(() => getCutSizeA(input.width), [input.width]);

  const cutSizeL_A = useMemo(() => getCutSizeA(input.length), [input.length]);

  const cutSizeW_B = useMemo(
    () => getCutSizeB(input.width, input.diameter),
    [input.width, input.diameter],
  );

  const cutSizeL_B = useMemo(
    () => getCutSizeB(input.length, input.diameter),
    [input.length, input.diameter],
  );

  const optionA = useMemo(
    () => computeOption(cutSizeW_A, cutSizeL_A, input),
    [cutSizeW_A, cutSizeL_A, input],
  );

  const optionB = useMemo(
    () => computeOption(cutSizeW_B, cutSizeL_B, input),
    [cutSizeW_B, cutSizeL_B, input],
  );

  const tieWire = useMemo(() => getTieWire(input), [input]);
  const volume = useMemo(() => getVolume(input), [input]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
        setInput((prev) => ({ ...prev, [field]: val }));
      }
    };

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Footing Rebar Calculator
          </h1>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* INPUT PANEL */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-5 text-slate-700 dark:text-slate-200">
              Footing Rebars
            </h2>

            <div className="space-y-4">
              <Input
                label="width size(m)"
                value={input.width}
                onChange={handleChange('width')}
              />
              <Input
                label="length size(m)"
                value={input.length}
                onChange={handleChange('length')}
              />
              <Input
                label="thickness(m)"
                value={input.thickness}
                onChange={handleChange('thickness')}
              />
              <Input
                label="bar diameter"
                value={input.diameter}
                onChange={handleChange('diameter')}
              />
              <Input
                label="steel length"
                value={input.steelLength}
                onChange={handleChange('steelLength')}
              />
              <Input
                label="no. of sets"
                value={input.quantity}
                onChange={handleChange('quantity')}
              />

              <Input
                label={
                  <>
                    # of bars ⟂ to{' '}
                    <span className="text-red-500 font-bold">W</span>
                  </>
                }
                value={input.barsW}
                onChange={handleChange('barsW')}
              />

              <Input
                label={
                  <>
                    # of bars ⟂ to{' '}
                    <span className="text-red-500 font-bold">L</span>
                  </>
                }
                value={input.barsL}
                onChange={handleChange('barsL')}
              />
            </div>

            <div className="mt-6 bg-green-100 dark:bg-green-900/40 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-200">
                Volume (cu.m)
              </span>
              <span className="font-bold text-lg text-green-700 dark:text-green-300">
                {volume}
              </span>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <ResultCard
              title="Option A"
              subtitle="w/o bend (75mm concrete cover)"
              cutW={cutSizeW_A}
              cutL={cutSizeL_A}
              data={optionA}
              tieWire={tieWire}
              color="blue"
            />

            <ResultCard
              title="Option B"
              subtitle="w/ bend (75mm concrete cover)"
              cutW={cutSizeW_B}
              cutL={cutSizeL_B}
              data={optionB}
              tieWire={tieWire}
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
