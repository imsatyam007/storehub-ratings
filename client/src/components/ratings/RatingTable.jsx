import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";

const columns = [
  {
    key: "user",
    label: "User",
  },
  {
    key: "store",
    label: "Store",
  },
  {
    key: "rating",
    label: "Rating",
  },
  {
    key: "createdAt",
    label: "Submitted",
  },
];

export default function RatingTable({
  ratings,
}) {
  return (
    <DataTable
      columns={columns}
      data={ratings}
      emptyMessage="No ratings found."
      renderRow={(rating) => (
        <TableRow key={rating.id}>
          <td className="px-6 py-4">
            {rating.user.name}
          </td>

          <td className="px-6 py-4">
            {rating.store.name}
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