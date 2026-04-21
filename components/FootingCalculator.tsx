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

  const [input, setInput] = useState(DEFAULT_INPUT);

  const parse = (val: string) => {
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
  };

  const cutSizeW_A = useMemo(() => {
    const C3 = parse(input.width);
    if (C3 === null) return '';
    return (C3 - 0.075 * 2).toFixed(3);
  }, [input.width]);

  const cutSizeL_A = useMemo(() => {
    const C4 = parse(input.length);
    if (C4 === null) return '';
    return (C4 - 0.075 * 2).toFixed(3);
  }, [input.length]);

  const cutSizeW_B = useMemo(() => {
    const C3 = parse(input.width);
    const C6 = parse(input.diameter);
    if (C3 === null || C6 === null) return '';
    return (C3 - 0.075 * 2 + 2 * (C6 * 0.016)).toFixed(3);
  }, [input.width, input.diameter]);

  const cutSizeL_B = useMemo(() => {
    const C4 = parse(input.length);
    const C6 = parse(input.diameter);
    if (C4 === null || C6 === null) return '';
    return (C4 - 0.075 * 2 + 2 * (C6 * 0.016)).toFixed(3);
  }, [input.length, input.diameter]);

  const computeOption = (cutW: string, cutL: string) => {
    const usableW = (() => {
      const F = parse(cutW);
      const C7 = parse(input.steelLength);
      if (F === null || C7 === null) return '';
      return C7 / F < 1
        ? Math.round((Math.trunc(F / C7 + 1) * C7) / C7)
        : Math.trunc(C7 / F);
    })();

    const usableL = (() => {
      const F = parse(cutL);
      const C7 = parse(input.steelLength);
      if (F === null || C7 === null) return '';
      return C7 / F < 1
        ? Math.round((Math.trunc(F / C7 + 1) * C7) / C7)
        : Math.trunc(C7 / F);
    })();

    const totalShort = (() => {
      const H = usableW;
      const F = parse(cutW);
      const C7 = parse(input.steelLength);
      const C10 = parse(input.barsL);
      const C8 = parse(input.quantity);

      if (!H || F === null || C7 === null || C10 === null || C8 === null)
        return '';

      return C7 / F < 1
        ? (C10 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
        : (C8 * (C10 / H)).toFixed(2);
    })();

    const totalLong = (() => {
      const H = usableL;
      const F = parse(cutL);
      const C7 = parse(input.steelLength);
      const C9 = parse(input.barsW);
      const C8 = parse(input.quantity);

      if (!H || F === null || C7 === null || C9 === null || C8 === null)
        return '';

      return C7 / F < 1
        ? (C9 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
        : (C8 * (C9 / H)).toFixed(2);
    })();

    const totalPCS = (() => {
      const F6 = parse(totalShort);
      const F7 = parse(totalLong);
      if (F6 === null || F7 === null) return '';
      return Math.round(F6 + F7 + 0.5);
    })();

    return { usableW, usableL, totalShort, totalLong, totalPCS };
  };

  const optionA = computeOption(cutSizeW_A, cutSizeL_A);
  const optionB = computeOption(cutSizeW_B, cutSizeL_B);

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

          {/* ================= RIGHT SIDE ================= */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* OPTION A */}
            <ResultCard
              title="Option A"
              subtitle="w/o bend (75mm concrete cover)"
              cutW={cutSizeW_A}
              cutL={cutSizeL_A}
              data={optionA}
              tieWire={tieWire}
              color="blue"
            />

            {/* OPTION B */}
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

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border border-slate-300/60 dark:border-slate-600/40
          px-3 py-2
          bg-slate-50 dark:bg-slate-900
          text-slate-900 dark:text-white
          focus:ring-2 focus:ring-blue-500
          outline-none
          transition
        "
      />
    </div>
  );
}

function ResultCard({
  title,
  subtitle,
  cutW,
  cutL,
  data,
  tieWire,
  color,
}: any) {
  const headerBg =
    color === 'blue'
      ? 'bg-blue-500/90 dark:bg-blue-500'
      : 'bg-green-500/90 dark:bg-green-500';

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl shadow-lg">
      <div className={`px-6 py-4 text-white rounded-t-2xl ${headerBg}`}>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-90 italic">{subtitle}</p>
      </div>

      <div className="px-6 py-4 space-y-1">
        <Result label="Cut Size (W)" value={cutW} />
        <Result label="Cut Size (L)" value={cutL} />

        <Result label="Usable (W)" value={data.usableW} />
        <Result label="Usable (L)" value={data.usableL} />

        <Result label="Total (Short)" value={data.totalShort} />
        <Result label="Total (Long)" value={data.totalLong} />

        <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-700/40 space-y-1">
          <Result label="Total PCS" value={data.totalPCS} bold />
          <Result label="Tie Wire" value={tieWire} bold />
        </div>
      </div>
    </div>
  );
}

function Result({ label, value, bold = false }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200/40 dark:border-slate-600/20 last:border-none">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span
        className={
          bold
            ? 'font-bold text-slate-900 dark:text-white'
            : 'text-slate-800 dark:text-slate-200'
        }
      >
        {value}
      </span>
    </div>
  );
}
