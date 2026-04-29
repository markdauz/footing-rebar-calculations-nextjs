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
import ComputedQtyTable from './ComputedQtyTable';

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
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute Footing Concrete
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-medium">Note</div>
                <div className="p-3 text-xs">Input size of footing</div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">No. of Footing or Sets</div>
                <input
                  placeholder="0.00"
                  value={sets}
                  onChange={(e) =>
                    setSets(e.target.value ? Number(e.target.value) : '')
                  }
                  className="h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Width (m)</div>
                <input
                  placeholder="0.00"
                  value={width}
                  onChange={(e) =>
                    setWidth(e.target.value ? Number(e.target.value) : '')
                  }
                  className="h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Length (m)</div>
                <input
                  placeholder="0.00"
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value ? Number(e.target.value) : '')
                  }
                  className="h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Thickness</div>
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
                    { label: 'aa', value: 'aa' },
                    { label: 'a', value: 'a' },
                    { label: 'b', value: 'b' },
                    { label: 'c', value: 'c' },
                  ]}
                />
              </div>

              <div className="border-b border-gray-300 dark:border-gray-600 p-3 text-xs">
                <div className="font-semibold">Mixture Ratio</div>
                class aa 1:1½:3 <br />
                class a 1:2:4 <br />
                class b 1:2½:5 <br />
                class c 1:3:6
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
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        Reset
                      </button>
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td className="p-2">No. of Footing or Sets</td>
                    <td>Vol (cu.m)</td>
                    <td>Thickness</td>
                    <td>Mixture</td>
                    <td>Width (m)</td>
                    <td>Length (m)</td>

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

          <ComputedQtyTable cement={cement} sand={sand} gravel={gravel} />
        </div>
      </div>
    </div>
  );
}
