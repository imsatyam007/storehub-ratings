import Badge from "../common/Badge";
import DataTable from "../tables/DataTable";
import TableRow from "../tables/TableRow";
import { useNavigate } from "react-router-dom";

export default function UserTable({
  users,
  sortBy,
  order,
  onSort,
}) {
  const navigate = useNavigate();
  const columns = [
    {
      key: "name",
      label: (
        <button onClick={() => onSort("name")}>
          Name {sortBy === "name" && (order === "asc" ? "▲" : "▼")}
        </button>
      ),
    },
    {
      key: "email",
      label: (
        <button onClick={() => onSort("email")}>
          Email {sortBy === "email" && (order === "asc" ? "▲" : "▼")}
        </button>
      ),
    },
    {
      key: "address",
      label: (
        <button onClick={() => onSort("address")}>
          Address {sortBy === "address" && (order === "asc" ? "▲" : "▼")}
        </button>
      ),
    },
    {
      key: "role",
      label: (
        <button onClick={() => onSort("role")}>
          Role {sortBy === "role" && (order === "asc" ? "▲" : "▼")}
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      emptyMessage="No users found."
      renderRow={(user) => (
        <TableRow
         key={user.id}
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/admin/users/${user.id}`)}>
         <td className="px-6 py-4 font-medium">
            {user.name}
          </td>

          <td
            className="px-6 py-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {user.email}
          </td>

          <td
            className="px-6 py-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {user.address}
          </td>

          <td className="px-6 py-4">
            <Badge role={user.role} />
          </td>
        </TableRow>
      )}
    />
  );
}