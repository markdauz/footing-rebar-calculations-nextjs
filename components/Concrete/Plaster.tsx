'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import ComputedQtyTable from '@/components/Concrete/ComputedQtyTable';
import {
  computePlasterVolume,
  computePlasterCement,
  computePlasterSand,
} from '@/lib/plasterCalculator';

type MixType = 'a' | 'b' | 'c' | 'd' | 'custom';

export default function Plaster() {
  const [thickness, setThickness] = useState<number | 'custom' | ''>('');
  const [customThickness, setCustomThickness] = useState<number | ''>('');
  const [area, setArea] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');
  const [customMix, setCustomMix] = useState<number | ''>('');

  const effectiveThickness =
    thickness === 'custom' ? customThickness : thickness;

  const effectiveMix = mix === 'custom' ? customMix : mix;

  const volume = useMemo(
    () => computePlasterVolume(area, effectiveThickness as number),
    [area, effectiveThickness],
  );

  const cement = useMemo(
    () =>
      computePlasterCement(
        volume,
        effectiveThickness as number,
        effectiveMix as any,
      ),
    [volume, effectiveThickness, effectiveMix],
  );

  const sand = useMemo(
    () => computePlasterSand(volume, effectiveThickness as number),
    [volume, effectiveThickness],
  );

  const twoSidesCement =
    cement !== '0.00' ? (Number(cement) * 2).toFixed(2) : '0.00';

  const twoSidesSand =
    sand !== '0.00' ? (Number(sand) * 2).toFixed(2) : '0.000';

  const reset = () => {
    setThickness('');
    setCustomThickness('');
    setArea('');
    setMix('');
    setCustomMix('');
  };

  return (
    <div className="pl-0 pr-0 pt-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-2">Plaster</h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute Cement Plaster
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Thickness</div>
                <div className="p-2">
                  {thickness === 'custom' ? (
                    <input
                      placeholder="0.00"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      value={customThickness}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setCustomThickness('');
                          setThickness('');
                          return;
                        }
                        setCustomThickness(Number(val));
                      }}
                      className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <CustomSelect
                      value={thickness}
                      onChange={setThickness}
                      options={[
                        { label: '0.016', value: 0.016 },
                        { label: '0.020', value: 0.02 },
                        { label: '0.025', value: 0.025 },
                        { label: '0.050', value: 0.05 },
                        { label: 'Custom', value: 'custom' },
                      ]}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Area (sqm)</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={area}
                    onChange={(e) =>
                      setArea(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Volume</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {volume.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Mixture</div>
                <div className="p-2">
                  {mix === 'custom' ? (
                    <input
                      placeholder="0.00"
                      min="0"
                      type="number"
                      step="1"
                      value={customMix}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) {
                          setCustomMix('');
                          setMix('');
                          return;
                        }
                        setCustomMix(parseInt(val));
                      }}
                      className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <CustomSelect
                      value={mix}
                      onChange={setMix}
                      options={[
                        { label: 'a', value: 'a' },
                        { label: 'b', value: 'b' },
                        { label: 'c', value: 'c' },
                        { label: 'd', value: 'd' },
                        { label: 'Custom', value: 'custom' },
                      ]}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Cement (2 sides)</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {twoSidesCement}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Sand (2 sides)</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {twoSidesSand}
                </div>
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
                      Compute Cement Plaster
                    </td>

                    <td colSpan={2} className="text-center font-semibold">
                      if two sides
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
                    <td>Thickness</td>
                    <td>Area (sqm)</td>
                    <td>Vol (cu.m)</td>
                    <td>Mixture</td>
                    <td>Cement</td>
                    <td>Sand</td>

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
                      {thickness === 'custom' ? (
                        <input
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0"
                          value={customThickness}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === '') {
                              setCustomThickness('');
                              setThickness('');
                              return;
                            }
                            setCustomThickness(Number(v));
                          }}
                          className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                        />
                      ) : (
                        <CustomSelect
                          value={thickness}
                          onChange={setThickness}
                          options={[
                            { label: '0.016', value: 0.016 },
                            { label: '0.020', value: 0.02 },
                            { label: '0.025', value: 0.025 },
                            { label: '0.050', value: 0.05 },
                            { label: 'Custom', value: 'custom' },
                          ]}
                        />
                      )}
                    </td>

                    <td className="p-2">
                      <div className="p-2">
                        <input
                          placeholder="0.00"
                          value={area}
                          onChange={(e) =>
                            setArea(
                              e.target.value ? Number(e.target.value) : '',
                            )
                          }
                          className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {volume.toFixed(3)}
                    </td>

                    <td className="p-2">
                      {mix === 'custom' ? (
                        <input
                          value={customMix}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (!v) {
                              setCustomMix('');
                              setMix('');
                              return;
                            }
                            setCustomMix(Number(v));
                          }}
                          className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                        />
                      ) : (
                        <CustomSelect
                          value={mix}
                          onChange={setMix}
                          options={[
                            { label: 'a', value: 'a' },
                            { label: 'b', value: 'b' },
                            { label: 'c', value: 'c' },
                            { label: 'd', value: 'd' },
                            { label: 'Custom', value: 'custom' },
                          ]}
                        />
                      )}
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {twoSidesCement}
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {twoSidesSand}
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
