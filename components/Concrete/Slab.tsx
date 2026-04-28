'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import {
  computeVolume,
  computeCement,
  computeSand,
  computeGravel,
} from '@/lib/calculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Slab() {
  const [area, setArea] = useState<number | ''>('');
  const [thickness, setThickness] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');

  const volume = useMemo(
    () => computeVolume(area, thickness),
    [area, thickness],
  );

  const cement = useMemo(() => computeCement(volume, mix), [volume, mix]);

  const sand = useMemo(() => computeSand(volume, mix), [volume, mix]);

  const gravel = useMemo(() => computeGravel(volume, mix), [volume, mix]);

  const reset = () => {
    setArea('');
    setThickness('');
    setMix('');
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT TABLE */}
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">Slab</div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-medium">Note</div>
                <div className="p-3 text-xs">
                  Drag down thickness & mixture, input area manually.
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
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Thickness (m)</div>
                <div className="p-2">
                  <CustomSelect
                    value={thickness}
                    onChange={(val) => setThickness(val)}
                    options={[
                      { label: '0.10', value: 0.1 },
                      { label: '0.125', value: 0.125 },
                      { label: '0.15', value: 0.15 },
                      { label: '0.20', value: 0.2 },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Mixture</div>
                <div className="p-2">
                  <CustomSelect
                    value={mix}
                    onChange={(val) => setMix(val)}
                    options={[
                      { label: 'aa', value: 'aa' },
                      { label: 'a', value: 'a' },
                      { label: 'b', value: 'b' },
                      { label: 'c', value: 'c' },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Class</div>
                <div className="p-3 text-xs">
                  aa 1:1½:3 <br />
                  a 1:2:4 <br />
                  b 1:2½:5 <br />c 1:3:6
                </div>
              </div>

              <div className="p-3">
                <button
                  onClick={reset}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-[700px] w-full table-fixed border-collapse text-sm border border-gray-300 dark:border-gray-600">
                <colgroup>
                  <col className="w-1/5" />
                  <col className="w-1/5" />
                  <col className="w-1/5" />
                  <col className="w-1/5" />
                  <col className="w-1/5" />
                </colgroup>

                <tbody>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold text-center">
                      40kg Cement
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 text-center font-bold">
                      Slab
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 text-xs p-3">
                      Note: <br />
                      Drag down thickness & mixture, input area manually.
                    </td>

                    <td
                      colSpan={2}
                      className="border border-gray-300 dark:border-gray-600 text-center"
                    >
                      <button
                        onClick={reset}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td
                      rowSpan={2}
                      className="border border-gray-300 dark:border-gray-600 p-3 font-medium align-middle"
                    >
                      Compute Total Area of Slab
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                      Area (sqm)
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                      Thickness (m)
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                      Mixture
                    </td>

                    <td
                      rowSpan={2}
                      className="border border-gray-300 dark:border-gray-600 text-xs p-3 align-top"
                    >
                      class aa 1:1½:3 <br />
                      class a 1:2:4 <br />
                      class b 1:2½:5 <br />
                      class c 1:3:6
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">
                      <input
                        placeholder="0.00"
                        value={area}
                        onChange={(e) =>
                          setArea(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      />
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 p-2">
                      <select
                        value={thickness}
                        onChange={(e) =>
                          setThickness(
                            e.target.value ? Number(e.target.value) : '',
                          )
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      >
                        <option value="">Select</option>
                        <option value={0.1}>0.10</option>
                        <option value={0.125}>0.125</option>
                        <option value={0.15}>0.15</option>
                        <option value={0.2}>0.20</option>
                      </select>
                    </td>

                    <td className="border border-gray-300 dark:border-gray-600 p-2">
                      <select
                        value={mix}
                        onChange={(e) => setMix(e.target.value as MixType)}
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      >
                        <option value="">Select</option>
                        <option value="aa">aa</option>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* RIGHT TABLE */}
          <div className="w-full lg:w-80 overflow-x-auto">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="bg-green-600 text-white text-center py-2 font-bold">
                Computed Qty
              </div>

              <div className="grid grid-cols-2 border-t border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Cement (bags)</div>
                <div className="p-3 text-right font-semibold">{cement}</div>
              </div>

              <div className="grid grid-cols-2 border-t border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Sand (cu.m)</div>
                <div className="p-3 text-right font-semibold">{sand}</div>
              </div>

              <div className="grid grid-cols-2 border-t border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Gravel (cu.m)</div>
                <div className="p-3 text-right font-semibold">{gravel}</div>
              </div>
            </div>

            <table className="hidden lg:table min-w-[260px] w-full table-fixed border-collapse text-sm border border-gray-300 dark:border-gray-600 h-full">
              <colgroup>
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>

              <tbody>
                <tr>
                  <td
                    colSpan={3}
                    className="bg-green-600 text-white text-center py-2 font-bold"
                  >
                    Computed Qty
                  </td>
                </tr>

                <tr className="text-center bg-gray-100 dark:bg-gray-800 font-semibold">
                  <td className="border border-gray-300 dark:border-gray-600">
                    Cement
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600">
                    Sand
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600">
                    Gravel
                  </td>
                </tr>

                <tr className="text-center text-xs">
                  <td className="border border-gray-300 dark:border-gray-600">
                    Bags
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600">
                    cu.m
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600">
                    cu.m
                  </td>
                </tr>

                <tr className="text-center h-full">
                  <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                    {cement}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                    {sand}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 font-semibold">
                    {gravel}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
