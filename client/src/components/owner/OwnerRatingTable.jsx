import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";

const columns = [
  {
    key: "name",
    label: "User",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "rating",
    label: "Rating",
  },
];

export default function OwnerRatingTable({
  ratedUsers,
}) {
  return (
    <DataTable
      columns={columns}
      data={ratedUsers}
      emptyMessage="No ratings found."
      renderRow={(user) => (
        <TableRow key={user.id}>
          <td className="px-6 py-4">
            {user.name}
          </td>

          <td className="px-6 py-4">
            {user.email}
          </td>

          <td className="px-6 py-4">
            {"⭐".repeat(user.rating)}
            {"☆".repeat(5 - user.rating)}
          </td>
        </TableRow>
      )}
    />
  );
}