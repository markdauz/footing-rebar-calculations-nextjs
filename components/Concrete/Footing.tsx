'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import {
  computeFootingVolume,
  computeFootingCement,
  computeFootingSand,
  computeFootingGravel,
  computeFootingTotalVolume,
} from '@/lib/footingCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Footing() {
  const [sets, setSets] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [thickness, setThickness] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');

  const volume = useMemo(
    () => computeFootingVolume(width, length, thickness),
    [width, length, thickness],
  );

  const totalVolume = useMemo(
    () => computeFootingTotalVolume(volume, sets),
    [volume, sets],
  );

  const cement = useMemo(
    () => computeFootingCement(totalVolume, mix),
    [totalVolume, mix],
  );

  const sand = useMemo(
    () => computeFootingSand(totalVolume, mix),
    [totalVolume, mix],
  );

  const gravel = useMemo(
    () => computeFootingGravel(totalVolume, mix),
    [totalVolume, mix],
  );

  const reset = () => {
    setSets('');
    setWidth('');
    setLength('');
    setThickness('');
    setMix('');
  };

  return (
    <div className="pl-0 pr-0 pt-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-2">Footing</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT TABLE */}
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute Footing Concrete
                </div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3 font-medium">Note</div>
                <div className="p-3 text-xs">
                  Input footing count, width, length, thickness & mixture
                </div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3 font-semibold">No. of Sets</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={sets}
                    onChange={(e) =>
                      setSets(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3 font-semibold">Width (m)</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={width}
                    onChange={(e) =>
                      setWidth(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3 font-semibold">Length (m)</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={length}
                    onChange={(e) =>
                      setLength(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Thickness</div>
                <div className="p-2">
                  <CustomSelect
                    value={thickness}
                    onChange={setThickness}
                    options={[
                      { label: '0.25', value: 0.25 },
                      { label: '0.30', value: 0.3 },
                      { label: '0.35', value: 0.35 },
                      { label: '0.40', value: 0.4 },
                      { label: '0.45', value: 0.45 },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Mixture</div>
                <div className="p-2">
                  <CustomSelect
                    value={mix}
                    onChange={setMix}
                    options={[
                      { label: 'aa', value: 'aa' },
                      { label: 'a', value: 'a' },
                      { label: 'b', value: 'b' },
                      { label: 'c', value: 'c' },
                    ]}
                  />
                </div>
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
                      Compute Footing Concrete
                    </td>

                    <td colSpan={2} className="text-center">
                      <div className="p-3 text-xs">Input size of footing.</div>
                    </td>

                    <td className="text-center">
                      <button
                        onClick={reset}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td className="p-2">no. of footing or sets</td>
                    <td>vol (cu.m)</td>
                    <td>thickness</td>
                    <td>mixture</td>
                    <td>width (m)</td>
                    <td>length (m)</td>

                    <td rowSpan={2} className="p-3 align-top text-xs">
                      <div className="font-semibold">Mixture Ratio</div>
                      class aa 1:1½:3 <br />
                      class a 1:2:4 <br />
                      class b 1:2½:5 <br />
                      class c 1:3:6
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2">
                      <input
                        placeholder="0.00"
                        value={sets}
                        onChange={(e) =>
                          setSets(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      />
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {volume.toFixed(3)}
                    </td>

                    <td className="p-2">
                      <CustomSelect
                        value={thickness}
                        onChange={setThickness}
                        options={[
                          { label: '0.25', value: 0.25 },
                          { label: '0.30', value: 0.3 },
                          { label: '0.35', value: 0.35 },
                          { label: '0.40', value: 0.4 },
                          { label: '0.45', value: 0.45 },
                        ]}
                      />
                    </td>

                    <td className="p-2">
                      <CustomSelect
                        value={mix}
                        onChange={setMix}
                        options={[
                          { label: 'aa', value: 'aa' },
                          { label: 'a', value: 'a' },
                          { label: 'b', value: 'b' },
                          { label: 'c', value: 'c' },
                        ]}
                      />
                    </td>

                    <td className="p-2">
                      <input
                        placeholder="0.00"
                        value={width}
                        onChange={(e) =>
                          setWidth(e.target.value ? Number(e.target.value) : '')
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        placeholder="0.00"
                        value={length}
                        onChange={(e) =>
                          setLength(
                            e.target.value ? Number(e.target.value) : '',
                          )
                        }
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

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
