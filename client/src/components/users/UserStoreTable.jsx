import { useNavigate } from "react-router-dom";

import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";

const columns = [
  {
    key: "name",
    label: "Store",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "overallRating",
    label: "Overall Rating",
  },
  {
    key: "userRating",
    label: "My Rating",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function UserStoreTable({
  stores,
  onRate,
}) {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={stores}
      emptyMessage="No stores found."
      renderRow={(store) => (
        <TableRow
          key={store.id}
          className="cursor-pointer"
          onClick={() =>
            navigate(`/user/stores/${store.id}`)
          }
        >
          <td className="px-6 py-4">
            {store.name}
          </td>

          <td className="px-6 py-4">
            {store.address}
          </td>

          <td className="px-6 py-4">
            ⭐ {store.overallRating}
          </td>

          <td className="px-6 py-4">
            {store.userRating ? (
              <>⭐ {store.userRating}</>
            ) : (
              <span
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Not Rated
              </span>
            )}
          </td>

          <td className="px-6 py-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRate(store);
              }}
              className="
                px-4
                py-2
                rounded-lg
                bg-[var(--primary)]
                text-white
                hover:opacity-90
              "
            >
              {store.userRating
                ? "Update"
                : "Rate"}
            </button>
          </td>
        </TableRow>
      )}
    />
  );
}