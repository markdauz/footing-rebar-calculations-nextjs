"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-black">
      <ThemeSwitcher />
    </header>
  );
}
