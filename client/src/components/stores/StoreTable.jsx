import { useNavigate } from "react-router-dom";

import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";

const columns = [
  { key: "name", label: "Store ▲" },
  { key: "email", label: "Email" },
  { key: "owner", label: "Owner" },
  { key: "rating", label: "Rating" },
];

export default function StoreTable({
  stores,
  sortBy,
  order,
  onSort,
}) {
  const navigate = useNavigate();

  const tableColumns = columns.map((column) => ({
    ...column,
    label:
      sortBy === column.key
        ? `${column.label.replace(" ▲", "").replace(" ▼", "")} ${
            order === "asc" ? "▲" : "▼"
          }`
        : column.label.replace(" ▲", ""),
  }));

  return (
    <DataTable
      columns={tableColumns}
      data={stores}
      emptyMessage="No stores found."
      onSort={onSort}
      renderRow={(store) => (
        <TableRow
          key={store.id}
          onClick={() => navigate(`/admin/stores/${store.id}`)}
          className="cursor-pointer"
        >
          <td className="px-6 py-4">{store.name}</td>

          <td className="px-6 py-4">
            {store.email}
          </td>

          <td className="px-6 py-4">
            {store.owner?.name || store.owner}
          </td>

          <td className="px-6 py-4">
            ⭐ {store.rating}
          </td>
        </TableRow>
      )}
    />
  );
}