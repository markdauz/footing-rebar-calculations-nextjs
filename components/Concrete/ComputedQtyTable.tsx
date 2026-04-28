type Props = {
  cement: string | number;
  sand: string | number;
  gravel: string | number;
};

export default function ComputedQtyTable({ cement, sand, gravel }: Props) {
  return (
    <div className="w-full lg:w-80 overflow-x-auto">
      {/* MOBILE */}
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

      {/* DESKTOP */}
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
  );
}
