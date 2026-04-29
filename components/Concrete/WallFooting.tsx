'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/CustomSelect';
import ComputedQtyTable from '@/components/Concrete/ComputedQtyTable';
import {
  computeWallFootingVolume,
  computeWallFootingCement,
  computeWallFootingSand,
  computeWallFootingGravel,
} from '@/lib/wallFootingCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function WallFooting() {
  const [sets, setSets] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [thickness, setThickness] = useState<number | ''>('');
  const [mix, setMix] = useState<MixType | ''>('');

  const volume = useMemo(
    () => computeWallFootingVolume(width, length, thickness),
    [width, length, thickness],
  );

  const totalVolume = useMemo(
    () => (sets && volume ? volume * sets : 0),
    [volume, sets],
  );

  const cement = useMemo(
    () => computeWallFootingCement(totalVolume, mix),
    [totalVolume, mix],
  );

  const sand = useMemo(
    () => computeWallFootingSand(totalVolume, mix),
    [totalVolume, mix],
  );

  const gravel = useMemo(
    () => computeWallFootingGravel(totalVolume, mix),
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
        <h2 className="text-2xl font-semibold mb-2">Wall Footing</h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="lg:hidden border border-gray-300 dark:border-gray-600 text-sm">
              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">40kg Cement</div>
                <div className="p-3 text-center font-bold">
                  Compute CHB Footing
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">No. of Sets</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={sets}
                    onChange={(e) =>
                      setSets(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Width</div>
                <div className="p-2">
                  <CustomSelect
                    value={width}
                    onChange={setWidth}
                    options={[
                      { label: '0.30', value: 0.3 },
                      { label: '0.35', value: 0.35 },
                      { label: '0.40', value: 0.4 },
                      { label: '0.50', value: 0.5 },
                      { label: '0.60', value: 0.6 },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
                <div className="p-3 font-semibold">Length</div>
                <div className="p-2">
                  <input
                    placeholder="0.00"
                    value={length}
                    onChange={(e) =>
                      setLength(e.target.value ? Number(e.target.value) : '')
                    }
                    className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
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
                      { label: '0.10', value: 0.1 },
                      { label: '0.15', value: 0.15 },
                      { label: '0.20', value: 0.2 },
                      { label: '0.25', value: 0.25 },
                      { label: '0.30', value: 0.3 },
                    ]}
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
                <tbody>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td className="p-3 text-center font-bold">40kg Cement</td>

                    <td colSpan={3} className="text-center font-bold">
                      Compute CHB Footing
                    </td>

                    <td colSpan={2} className="text-center">
                      Input size of wall footing
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
                    <td>No. of sets</td>
                    <td>Vol (cu.m)</td>
                    <td>Thickness</td>
                    <td>Mixture</td>
                    <td>Width</td>
                    <td>Length</td>

                    <td rowSpan={2} className="text-xs p-2">
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
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border"
                      />
                    </td>

                    <td className="text-center bg-gray-200 dark:bg-gray-700">
                      {volume.toFixed(2)}
                    </td>

                    <td className="p-2">
                      <CustomSelect
                        value={thickness}
                        onChange={setThickness}
                        options={[
                          { label: '0.10', value: 0.1 },
                          { label: '0.15', value: 0.15 },
                          { label: '0.20', value: 0.2 },
                          { label: '0.25', value: 0.25 },
                          { label: '0.30', value: 0.3 },
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
                      <CustomSelect
                        value={width}
                        onChange={setWidth}
                        options={[
                          { label: '0.30', value: 0.3 },
                          { label: '0.35', value: 0.35 },
                          { label: '0.40', value: 0.4 },
                          { label: '0.50', value: 0.5 },
                          { label: '0.60', value: 0.6 },
                        ]}
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
                        className="w-full h-10 text-center bg-yellow-100 dark:bg-gray-800 border"
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
