export default function StoreFilters({
  filters,
  onChange,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block mb-2 font-medium">
          Store Name
        </label>

        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={onChange}
          placeholder="Search by store name"
          className="w-full border border-[var(--border)] rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={onChange}
          placeholder="Search by email"
          className="w-full border border-[var(--border)] rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Address
        </label>

        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={onChange}
          placeholder="Search by address"
          className="w-full border border-[var(--border)] rounded-xl p-3"
        />
      </div>
    </div>
  );
}