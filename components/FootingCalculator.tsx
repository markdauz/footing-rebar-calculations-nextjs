"use client";

import { useState } from "react";
import { getUsableDimension, getBars, getVolume } from "@/lib/calculator";

export default function FootingCalculator() {
  const [input, setInput] = useState({
    width: 0.8,
    length: 0.8,
    thickness: 0.3,
    spacing: 0.15,
    quantity: 1,
  });

  const usableWidth = getUsableDimension(input.width);
  const usableLength = getUsableDimension(input.length);

  const barsWidth = getBars(usableWidth, input.spacing);
  const barsLength = getBars(usableLength, input.spacing);
  const totalBars = barsWidth + barsLength;

  const volume = getVolume(
    input.width,
    input.length,
    input.thickness,
    input.quantity,
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setInput({ ...input, [field]: isNaN(value) ? 0 : value });
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Footing Rebar Calculator
        </h1>

        {/* INPUT CARD */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-8 transition">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Width (m)"
              value={input.width}
              onChange={handleChange("width")}
            />
            <Input
              label="Length (m)"
              value={input.length}
              onChange={handleChange("length")}
            />
            <Input
              label="Thickness (m)"
              value={input.thickness}
              onChange={handleChange("thickness")}
            />
            <Input
              label="Spacing (m)"
              value={input.spacing}
              onChange={handleChange("spacing")}
            />
            <Input
              label="Quantity"
              value={input.quantity}
              onChange={handleChange("quantity")}
            />
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 px-6 py-4">
            <h2 className="text-white text-xl font-semibold">Results</h2>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <Result
              label="Usable Width"
              value={`${usableWidth.toFixed(3)} m`}
            />
            <Result
              label="Usable Length"
              value={`${usableLength.toFixed(3)} m`}
            />

            <Result label="Bars (Width)" value={barsWidth} />
            <Result label="Bars (Length)" value={barsLength} />

            <Result label="Total Bars" value={totalBars} />
            <Result label="Concrete Volume" value={`${volume.toFixed(3)} m³`} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Input Component */
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (e: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border border-gray-300 dark:border-gray-600
          px-3 py-2
          bg-gray-50 dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          focus:bg-white dark:focus:bg-gray-800
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          outline-none
          transition
        "
      />
    </div>
  );
}

/* 🔹 Result Row */
function Result({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
}
