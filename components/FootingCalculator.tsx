'use client';

import { useState, useMemo } from 'react';

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
  const [mode, setMode] = useState<'A' | 'B'>('A');

  const [input, setInput] = useState(DEFAULT_INPUT);

  const parse = (val: string) => {
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
  };

  const cutSizeW = useMemo(() => {
    const C3 = parse(input.width);
    if (C3 === null) return '';

    if (mode === 'A') return (C3 - 0.075 * 2).toFixed(3);

    const C6 = parse(input.diameter);
    if (C6 === null) return '';

    return (C3 - 0.075 * 2 + 2 * (C6 * 0.016)).toFixed(3);
  }, [input.width, input.diameter, mode]);

  const cutSizeL = useMemo(() => {
    const C4 = parse(input.length);
    if (C4 === null) return '';

    if (mode === 'A') return (C4 - 0.075 * 2).toFixed(3);

    const C6 = parse(input.diameter);
    if (C6 === null) return '';

    return (C4 - 0.075 * 2 + 2 * (C6 * 0.016)).toFixed(3);
  }, [input.length, input.diameter, mode]);

  const usableW = useMemo(() => {
    const F = parse(cutSizeW);
    const C7 = parse(input.steelLength);
    if (F === null || C7 === null) return '';

    return C7 / F < 1
      ? Math.round((Math.trunc(F / C7 + 1) * C7) / C7)
      : Math.trunc(C7 / F);
  }, [cutSizeW, input.steelLength]);

  const usableL = useMemo(() => {
    const F = parse(cutSizeL);
    const C7 = parse(input.steelLength);
    if (F === null || C7 === null) return '';

    return C7 / F < 1
      ? Math.round((Math.trunc(F / C7 + 1) * C7) / C7)
      : Math.trunc(C7 / F);
  }, [cutSizeL, input.steelLength]);

  const totalShort = useMemo(() => {
    const H = usableW;
    const F = parse(cutSizeW);
    const C7 = parse(input.steelLength);
    const C10 = parse(input.barsL);
    const C8 = parse(input.quantity);

    if (!H || F === null || C7 === null || C10 === null || C8 === null)
      return '';

    return C7 / F < 1
      ? (C10 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
      : (C8 * (C10 / H)).toFixed(2);
  }, [usableW, cutSizeW, input]);

  const totalLong = useMemo(() => {
    const H = usableL;
    const F = parse(cutSizeL);
    const C7 = parse(input.steelLength);
    const C9 = parse(input.barsW);
    const C8 = parse(input.quantity);

    if (!H || F === null || C7 === null || C9 === null || C8 === null)
      return '';

    return C7 / F < 1
      ? (C9 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
      : (C8 * (C9 / H)).toFixed(2);
  }, [usableL, cutSizeL, input]);

  const totalPCS = useMemo(() => {
    const F6 = parse(totalShort);
    const F7 = parse(totalLong);
    if (F6 === null || F7 === null) return '';

    return Math.round(F6 + F7 + 0.5);
  }, [totalShort, totalLong]);

  const tieWire = useMemo(() => {
    const C8 = parse(input.quantity);
    const C9 = parse(input.barsW);
    const C10 = parse(input.barsL);

    if (C8 === null || C9 === null || C10 === null) return '';

    return (C8 * ((C9 * C10 * 0.3) / 53) + 0.1).toFixed(2);
  }, [input]);

  const volume = useMemo(() => {
    const w = parse(input.width);
    const l = parse(input.length);
    const t = parse(input.thickness);
    const q = parse(input.quantity);

    if (w === null || l === null || t === null || q === null) return '';

    return (w * l * t * q).toFixed(3);
  }, [input]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (/^[0-9]*\.?[0-9]*$/.test(val)) {
        setInput({ ...input, [field]: val });
      }
    };

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Footing Rebar Calculator
        </h1>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('A')}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              mode === 'A'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Option A
          </button>
          <button
            onClick={() => setMode('B')}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              mode === 'B'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            Option B
          </button>
          <button
            onClick={handleReset}
            className="ml-auto px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Footing Rebars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-xl flex justify-between">
              <span className="font-medium">Volume (cu.m)</span>
              <span className="font-bold text-lg">{volume}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
              <h2 className="text-white text-lg font-semibold">
                Computed Quantity - Option {mode}
              </h2>

              <p className="text-sm text-blue-100 mt-1 italic">
                {mode === 'A'
                  ? 'w/o bend (75mm concrete cover)'
                  : 'w/ bend (75mm concrete cover)'}
              </p>
            </div>

            <div className="p-6 space-y-3 text-gray-700 dark:text-gray-300">
              <Result label="Cut Size (W)" value={cutSizeW} />
              <Result label="Cut Size (L)" value={cutSizeL} />

              <Result label="Usable (W)" value={usableW} />
              <Result label="Usable (L)" value={usableL} />

              <Result label="Total (Short)" value={totalShort} />
              <Result label="Total (Long)" value={totalLong} />

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl space-y-2">
                <Result label="Total PCS" value={totalPCS} bold />
                <Result label="Tie Wire" value={tieWire} bold />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}

function Result({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: any;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
      <span className="text-gray-500">{label}</span>
      <span
        className={`text-right ${bold ? 'font-bold text-lg' : 'font-semibold'}`}
      >
        {value}
      </span>
    </div>
  );
}
