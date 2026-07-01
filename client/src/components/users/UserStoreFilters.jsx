export default function UserStoreFilters({
  filters,
  onChange,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Store Name
        </label>

        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={onChange}
          placeholder="Search by store name"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            px-4
            py-3
            outline-none
            focus:border-[var(--primary)]
          "
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Address
        </label>

        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={onChange}
          placeholder="Search by address"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            px-4
            py-3
            outline-none
            focus:border-[var(--primary)]
          "
        />
      </div>
    </div>
  );
}