'use client';

import { useState, useRef, useEffect } from 'react';

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  value: string | number | '';
  onChange: (value: any) => void;
  options: Option[];
  placeholder?: string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-10 px-3 text-center bg-yellow-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
      >
        {selected ? selected.label : placeholder}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 top-full left-0 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
