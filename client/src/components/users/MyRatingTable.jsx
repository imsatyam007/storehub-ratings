import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";

const columns = [
  {
    key: "store",
    label: "Store",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "rating",
    label: "Your Rating",
  },
  {
    key: "createdAt",
    label: "Submitted On",
  },
];

export default function MyRatingTable({ ratings }) {
  return (
    <DataTable
      columns={columns}
      data={ratings}
      emptyMessage="No ratings submitted yet."
      renderRow={(rating) => (
        <TableRow key={rating.id}>
          <td className="px-6 py-4">
            {rating.store.name}
          </td>

          <td className="px-6 py-4">
            {rating.store.address}
          </td>

          <td className="px-6 py-4">
            {"⭐".repeat(rating.rating)}
          </td>

          <td className="px-6 py-4">
            {new Date(
              rating.createdAt
            ).toLocaleDateString()}
          </td>
        </TableRow>
      )}
    />
  );
}