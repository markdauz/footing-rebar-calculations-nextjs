import Result from './Result';

export default function ResultCard({
  title,
  subtitle,
  cutW,
  cutL,
  data,
  tieWire,
  color,
}: any) {
  const headerBg =
    color === 'blue'
      ? 'bg-blue-500/90 dark:bg-blue-500'
      : 'bg-green-500/90 dark:bg-green-500';

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl shadow-lg">
      <div className={`px-6 py-4 text-white rounded-t-2xl ${headerBg}`}>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-90 italic">{subtitle}</p>
      </div>

      <div className="px-6 py-4 space-y-1">
        <Result label="Cut Size (W)" value={cutW} />
        <Result label="Cut Size (L)" value={cutL} />

        <Result label="Usable (W)" value={data.usableW} />
        <Result label="Usable (L)" value={data.usableL} />

        <Result label="Total (Short)" value={data.totalShort} />
        <Result label="Total (Long)" value={data.totalLong} />

        <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-700/40 space-y-1">
          <Result label="Total PCS" value={data.totalPCS} bold />
          <Result label="Tie Wire" value={tieWire} bold />
        </div>
      </div>
    </div>
  );
}
