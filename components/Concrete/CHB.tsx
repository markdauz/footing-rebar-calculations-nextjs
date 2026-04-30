'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import {
  getEndWeb,
  getInnerWeb,
  getShell,
  computeCHBVolume,
  computeCHBVolBetween,
  computeCHBTotal,
} from '@/lib/chbCalculator';

export default function CHB() {
  const [thickness, setThickness] = useState<number | ''>('');
  const [thicknessMode, setThicknessMode] = useState<
    '0.10' | '0.125' | '0.15' | '0.20' | 'custom' | ''
  >('');
  const [webs, setWebs] = useState<2 | 3 | 4 | ''>('');

  const endWeb = useMemo(() => getEndWeb(thickness), [thickness]);

  const innerWeb = useMemo(
    () => getInnerWeb(thickness, webs),
    [thickness, webs],
  );

  const shell = useMemo(() => getShell(thickness), [thickness]);

  const volume = useMemo(
    () =>
      computeCHBVolume(
        thickness,
        webs,
        endWeb,
        innerWeb,
        shell,
        thicknessMode === 'custom',
      ),
    [thickness, webs, endWeb, innerWeb, shell, thicknessMode],
  );

  const volBetween = useMemo(
    () => computeCHBVolBetween(thickness),
    [thickness],
  );

  const totalVol = useMemo(
    () => computeCHBTotal(volume, volBetween),
    [volume, volBetween],
  );

  const reset = () => {
    setThickness('');
    setThicknessMode('');
    setWebs('');
  };

  return (
    <div className="pl-0 pr-0 pt-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">CHB Mortar / sqm</h2>
        <div className="mb-4">
          <img
            src="/images/chb.png"
            alt="Concrete Hollow Block Diagram"
            className="w-full max-h-[260px] object-contain "
          />
        </div>

        <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3 font-semibold">CHB Thickness</div>
            <div className="p-2">
              {thicknessMode === 'custom' ? (
                <input
                  min="0"
                  placeholder="0.00"
                  type="number"
                  step="0.001"
                  value={thickness}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) {
                      setThickness('');
                      setThicknessMode('');
                      return;
                    }
                    setThickness(parseFloat(v));
                  }}
                  className="w-full h-10 text-center bg-yellow-100  border-gray-300 dark:border-gray-600"
                />
              ) : (
                <CustomSelect
                  value={thicknessMode}
                  onChange={(val) => {
                    if (val === 'custom') {
                      setThicknessMode('custom');
                      setThickness('');
                    } else {
                      setThicknessMode(val);
                      setThickness(Number(val));
                    }
                  }}
                  options={[
                    { label: '0.10', value: '0.10' },
                    { label: '0.125', value: '0.125' },
                    { label: '0.15', value: '0.15' },
                    { label: '0.20', value: '0.20' },
                    { label: 'Custom', value: 'custom' },
                  ]}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3 font-semibold"># of Web</div>
            <div className="p-2">
              <CustomSelect
                value={webs}
                onChange={(val) => setWebs(val as 2 | 3 | 4)}
                options={[
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3">End Web</div>
            <div className="p-3 text-center">{endWeb || '-'}</div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3">Inner Web</div>
            <div className="p-3 text-center">{innerWeb || '-'}</div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3">Shell</div>
            <div className="p-3 text-center">{shell || '-'}</div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3">Volume</div>
            <div className="p-3 text-center">{volume.toFixed(3)}</div>
          </div>

          <div className="grid grid-cols-2 border-b  border-gray-300 dark:border-gray-600">
            <div className="p-3">Vol Between</div>
            <div className="p-3 text-center">{volBetween.toFixed(3)}</div>
          </div>

          <div className="grid grid-cols-2 border-b font-bold  border-gray-300 dark:border-gray-600">
            <div className="p-3">Total Vol</div>
            <div className="p-3 text-center">{totalVol.toFixed(3)}</div>
          </div>

          <div className="p-3">
            <button
              onClick={reset}
              className="w-full py-2 bg-red-500 text-white"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <table className="min-w-[700px] w-full table-fixed border-collapse text-sm border border-gray-300 dark:border-gray-600 [&_td]:border [&_td]:border-gray-300 dark:[&_td]:border-gray-600">
            <tbody>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="p-3 font-semibold">CHB Thickness</td>
                <td className="p-2">
                  {thicknessMode === 'custom' ? (
                    <input
                      min="0"
                      placeholder="0.00"
                      type="number"
                      step="0.001"
                      value={thickness}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (!v) {
                          setThickness('');
                          setThicknessMode('');
                          return;
                        }
                        setThickness(parseFloat(v));
                      }}
                      className="w-full h-10 text-center bg-yellow-100"
                    />
                  ) : (
                    <CustomSelect
                      value={thicknessMode}
                      onChange={(val) => {
                        if (val === 'custom') {
                          setThicknessMode('custom');
                          setThickness('');
                        } else {
                          setThicknessMode(val);
                          setThickness(Number(val));
                        }
                      }}
                      options={[
                        { label: '0.10', value: '0.10' },
                        { label: '0.125', value: '0.125' },
                        { label: '0.15', value: '0.15' },
                        { label: '0.20', value: '0.20' },
                        { label: 'Custom', value: 'custom' },
                      ]}
                    />
                  )}
                </td>

                <td className="p-3 font-semibold"># of Web</td>
                <td className="p-2">
                  <CustomSelect
                    value={webs}
                    onChange={(val) => setWebs(val as 2 | 3 | 4)}
                    options={[
                      { label: '2', value: 2 },
                      { label: '3', value: 3 },
                      { label: '4', value: 4 },
                    ]}
                  />
                </td>
              </tr>

              <tr>
                <td className="p-3">End Web</td>
                <td className="text-center">{endWeb || '-'}</td>
                <td className="p-3">Inner Web</td>
                <td className="text-center">{innerWeb || '-'}</td>
              </tr>

              <tr>
                <td className="p-3">Shell</td>
                <td className="text-center">{shell || '-'}</td>
                <td className="p-3">Volume</td>
                <td className="text-center">{volume.toFixed(3)}</td>
              </tr>

              <tr>
                <td className="p-3">Vol Between</td>
                <td className="text-center">{volBetween.toFixed(3)}</td>
                <td className="p-3 font-bold">Total Vol</td>
                <td className="text-center font-bold">{totalVol.toFixed(3)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
