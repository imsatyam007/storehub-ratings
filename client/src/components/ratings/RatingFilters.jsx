export default function RatingFilters({
  filters,
  onChange,
}) {
  return (
    <div
      className="
        grid
        md:grid-cols-3
        gap-6
        bg-white
        p-6
        rounded-2xl
        border
        border-[var(--border)]
      "
    >
      {/* User */}

      <div>
        <label className="block mb-2 font-medium">
          User
        </label>

        <input
          type="text"
          name="user"
          value={filters.user}
          onChange={onChange}
          placeholder="Search by user"
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      {/* Store */}

      <div>
        <label className="block mb-2 font-medium">
          Store
        </label>

        <input
          type="text"
          name="store"
          value={filters.store}
          onChange={onChange}
          placeholder="Search by store"
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      {/* Rating */}

      <div>
        <label className="block mb-2 font-medium">
          Rating
        </label>

        <select
          name="rating"
          value={filters.rating}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
      </div>
    </div>
  );
}