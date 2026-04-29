'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import ComputedQtyTable from '@/components/Concrete/ComputedQtyTable';
import {
  computeMortarVolume,
  computeMortarCement,
  computeMortarSand,
} from '@/lib/mortarCalculator';

type MixType = 'a' | 'b' | 'c' | 'd';

export default function Mortar() {
  const [thickness, setThickness] = useState<number | ''>('');
  const [area, setArea] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');
  const [pcs, setPcs] = useState<number | ''>('');

  const volume = useMemo(() => computeMortarVolume(thickness), [thickness]);

  const cement = useMemo(
    () => computeMortarCement(volume, area, mix),
    [volume, area, mix],
  );

  const sand = useMemo(
    () => computeMortarSand(volume, area, mix),
    [volume, area, mix],
  );

  const reset = () => {
    setThickness('');
    setArea('');
    setMix('');
    setPcs('');
  };

  return (
    <div className="pl-0 pr-0 pt-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Mortar in between layer + hollow core
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              {/* HEADER */}
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute CHB Mortar
                </div>
              </div>

              {/* CHB THICKNESS */}
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">CHB Thickness</div>
                <CustomSelect
                  value={thickness}
                  onChange={setThickness}
                  options={[
                    { label: '0.10', value: 0.1 },
                    { label: '0.125', value: 0.125 },
                    { label: '0.150', value: 0.15 },
                    { label: '0.20', value: 0.2 },
                    { label: '0.25', value: 0.25 },
                  ]}
                />
              </div>

              {/* AREA */}
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Area (sqm)</div>
                <input
                  value={area}
                  onChange={(e) =>
                    setArea(e.target.value ? Number(e.target.value) : '')
                  }
                  className="h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* VOLUME */}
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Volume (cu.m)</div>
                <div className="p-3 text-center bg-gray-200 dark:bg-gray-700 font-medium">
                  {volume.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Mixture</div>
                <CustomSelect
                  value={mix}
                  onChange={setMix}
                  options={[
                    { label: 'a', value: 'a' },
                    { label: 'b', value: 'b' },
                    { label: 'c', value: 'c' },
                    { label: 'd', value: 'd' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">No. of CHB (Area)</div>
                <div className="p-3 text-center bg-gray-200 dark:bg-gray-700">
                  {area || '0.00'}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Total Pcs</div>
                <input
                  value={pcs}
                  onChange={(e) =>
                    setPcs(e.target.value ? Number(e.target.value) : '')
                  }
                  className="h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="border-b border-gray-300 dark:border-gray-600 p-3 text-xs">
                <div className="font-semibold">Mixture Ratio</div>
                class a 1:2 <br />
                class b 1:3 <br />
                class c 1:4 <br />
                class d 1:5
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
                <colgroup>
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                  <col className="w-1/7" />
                </colgroup>

                <tbody>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td className="p-3 font-semibold text-center">
                      40kg Cement
                    </td>

                    <td colSpan={3} className="text-center font-bold">
                      Compute CHB Mortar
                    </td>

                    <td colSpan={2} className="text-center font-semibold">
                      No. of chb
                    </td>

                    <td className="text-center">
                      <button
                        onClick={reset}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td>CHB Thk</td>
                    <td>Area (sqm)</td>
                    <td>Vol (cu.m)</td>
                    <td>Mixture</td>

                    <td>area (sqm)</td>
                    <td>total pcs</td>

                    <td rowSpan={2} className="p-2 text-xs align-top">
                      <div className="font-semibold">Mixture Ratio</div>
                      class a 1:2 <br />
                      class b 1:3 <br />
                      class c 1:4 <br />
                      class d 1:5
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2">
                      <CustomSelect
                        value={thickness}
                        onChange={setThickness}
                        options={[
                          { label: '0.10', value: 0.1 },
                          { label: '0.125', value: 0.125 },
                          { label: '0.150', value: 0.15 },
                          { label: '0.20', value: 0.2 },
                          { label: '0.25', value: 0.25 },
                        ]}
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={area}
                        onChange={(e) =>
                          setArea(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                      />
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {volume.toFixed(4)}
                    </td>

                    <td className="p-2">
                      <CustomSelect
                        value={mix}
                        onChange={setMix}
                        options={[
                          { label: 'a', value: 'a' },
                          { label: 'b', value: 'b' },
                          { label: 'c', value: 'c' },
                          { label: 'd', value: 'd' },
                        ]}
                      />
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {area || '0.00'}
                    </td>

                    <td className="p-2">
                      <input
                        value={pcs}
                        onChange={(e) =>
                          setPcs(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ComputedQtyTable cement={cement} sand={sand} gravel="n/a" />
        </div>
      </div>
    </div>
  );
}
