export default function Result({ label, value, bold = false }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200/40 dark:border-slate-600/20 last:border-none">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span
        className={
          bold
            ? 'font-bold text-slate-900 dark:text-white'
            : 'text-slate-800 dark:text-slate-200'
        }
      >
        {value}
      </span>
    </div>
  );
}
