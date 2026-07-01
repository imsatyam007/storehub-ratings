import Input from "../common/Input";

export default function UserFilters({
  filters,
  onChange,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Input
          label="Name"
          placeholder="Search by name"
          name="name"
          value={filters.name}
          onChange={onChange}
        />

        <Input
          label="Email"
          placeholder="Search by email"
          name="email"
          value={filters.email}
          onChange={onChange}
        />

        <Input
          label="Address"
          placeholder="Search by address"
          name="address"
          value={filters.address}
          onChange={onChange}
        />

        <div className="space-y-2">
          <label
            className="block font-medium"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Role
          </label>

          <select
            name="role"
            value={filters.role}
            onChange={onChange}
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-[var(--border)]
              outline-none
              bg-white
              focus:border-[var(--primary)]
            "
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Owner</option>
            <option value="USER">User</option>
          </select>
        </div>

      </div>
    </div>
  );
}