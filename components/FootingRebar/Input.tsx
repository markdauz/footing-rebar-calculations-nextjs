export default function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border border-slate-300/60 dark:border-slate-600/40
          px-3 py-2
          bg-slate-50 dark:bg-slate-900
          text-slate-900 dark:text-white
          focus:ring-2 focus:ring-blue-500
          outline-none
          transition
        "
      />
    </div>
  );
}
