'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import ComputedQtyTable from '@/components/Concrete/ComputedQtyTable';
import {
  getVolume,
  getTotalPcs,
  getCement,
  getSand,
} from '@/lib/mortarCalculator';

type MixType = 'a' | 'b' | 'c' | 'd' | 'custom';

export default function Mortar() {
  const [thickness, setThickness] = useState<number | 'custom' | ''>('');
  const [customThickness, setCustomThickness] = useState<number | ''>('');
  const [area, setArea] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');
  const [customMix, setCustomMix] = useState<number | ''>('');

  const reset = () => {
    setThickness('');
    setCustomThickness('');
    setArea('');
    setMix('');
    setCustomMix('');
  };

  const volume = useMemo(
    () => getVolume(thickness, customThickness),
    [thickness, customThickness],
  );

  const totalPcs = useMemo(() => getTotalPcs(area), [area]);

  const cement = useMemo(
    () => getCement(volume, area, mix, customMix),
    [volume, area, mix, customMix],
  );

  const sand = useMemo(() => getSand(volume, area), [volume, area]);

  return (
    <div className="pl-0 pr-0 pt-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Mortar in between layer + hollow core
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute CHB Mortar
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">CHB Thk</div>
                <div className="p-2">
                  {thickness === 'custom' ? (
                    <input
                      placeholder="0.00"
                      type="number"
                      min="0"
                      value={customThickness}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (!v) {
                          setCustomThickness('');
                          setThickness('');
                          return;
                        }
                        setCustomThickness(Number(v));
                      }}
                      className="h-10 w-full text-center bg-yellow-100 border"
                    />
                  ) : (
                    <CustomSelect
                      value={thickness}
                      onChange={setThickness}
                      options={[
                        { label: '0.10', value: 0.1 },
                        { label: '0.125', value: 0.125 },
                        { label: '0.150', value: 0.15 },
                        { label: '0.20', value: 0.2 },
                        { label: '0.25', value: 0.25 },
                        { label: 'Custom', value: 'custom' },
                      ]}
                    />
                  )}
                </div>
              </div>

              {/* AREA */}
              <div className="grid grid-cols-2 border-b border-gray-300">
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

              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">Vol (cu.m)</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {volume.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">Mixture</div>
                <div className="p-2">
                  {mix === 'custom' ? (
                    <input
                      placeholder="0.00"
                      type="number"
                      min="0"
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
                      className="h-10 w-full text-center bg-yellow-100 border"
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

              {/* AREA DISPLAY */}
              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">area (sqm)</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {area || 0}
                </div>
              </div>

              {/* PCS */}
              <div className="grid grid-cols-2 border-b border-gray-300">
                <div className="p-3 font-semibold">total pcs</div>
                <div className="p-3 m-2 text-center bg-gray-200 dark:bg-gray-700">
                  {totalPcs}
                </div>
              </div>

              {/* MIX INFO */}
              <div className="p-3 text-xs border-b border-gray-300">
                <div className="font-semibold">Mixture Ratio</div>
                class a 1:2 <br />
                class b 1:3 <br />
                class c 1:4 <br />
                class d 1:5
              </div>

              {/* RESET */}
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
                    <td rowSpan={2} className="p-2 text-xs">
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
                          placeholder="0.00"
                          type="number"
                          value={customThickness}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (!v) {
                              setCustomThickness('');
                              setThickness('');
                              return;
                            }
                            setCustomThickness(Number(v));
                          }}
                          className="w-full h-10 text-center bg-yellow-100"
                        />
                      ) : (
                        <CustomSelect
                          value={thickness}
                          onChange={setThickness}
                          options={[
                            { label: '0.10', value: 0.1 },
                            { label: '0.125', value: 0.125 },
                            { label: '0.150', value: 0.15 },
                            { label: '0.20', value: 0.2 },
                            { label: '0.25', value: 0.25 },
                            { label: 'Custom', value: 'custom' },
                          ]}
                        />
                      )}
                    </td>

                    <td className="p-2">
                      <input
                        placeholder="0.00"
                        value={area}
                        onChange={(e) =>
                          setArea(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                      />
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {volume.toFixed(2)}
                    </td>

                    <td className="p-2">
                      {mix === 'custom' ? (
                        <input
                          placeholder="0.00"
                          type="number"
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
                          className="w-full h-10 text-center bg-yellow-100"
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
                      {area || 0}
                    </td>
                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {totalPcs}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ComputedQtyTable
            cement={Number(cement.toFixed(2))}
            sand={Number(sand.toFixed(2))}
            gravel="n/a"
          />
        </div>
      </div>
    </div>
  );
}
