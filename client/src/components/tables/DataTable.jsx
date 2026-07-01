export default function DataTable({
  columns,
  data,
  renderRow,
  emptyMessage = "No data available.",
  onSort,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-[var(--surface-alt)]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() =>
                  onSort && onSort(column.key)
                }
                className={`
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  ${
                    onSort
                      ? "cursor-pointer select-none hover:bg-gray-100"
                      : ""
                  }
                `}
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
           {data.length > 0 ? (
             data.map(renderRow)
           ) : (
             <tr>
               <td
                 colSpan={columns.length}
                 className="px-6 py-16 text-center"
               >
                 <div className="flex flex-col items-center gap-3">
                   <div className="text-5xl">📭</div>

                   <h3
                     className="text-lg font-semibold"
                     style={{
                       color: "var(--text-primary)",
                     }}
                   >
                     {emptyMessage}
                   </h3>

                   <p
                     className="text-sm"
                     style={{
                       color: "var(--text-secondary)",
                     }}
                   >
                     Try changing the filters or adding new data.
                   </p>
                 </div>
                </td>
              </tr>
           )}
          </tbody>
      </table>
    </div>
  );
}