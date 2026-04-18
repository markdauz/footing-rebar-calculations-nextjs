"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="w-full flex justify-center py-4">
      <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-xl shadow">
        {/* Light Button */}
        <button
          onClick={() => setTheme("light")}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              theme === "light"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }
          `}
        >
          <Sun size={18} />
          Light
        </button>

        {/* Dark Button */}
        <button
          onClick={() => setTheme("dark")}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              theme === "dark"
                ? "bg-gray-900 text-white shadow"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }
          `}
        >
          <Moon size={18} />
          Dark
        </button>
      </div>
    </nav>
  );
};
