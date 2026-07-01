export default function UserStorePagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="
          px-4
          py-2
          rounded-lg
          border
          border-[var(--border)]
          disabled:opacity-50
        "
      >
        ← Previous
      </button>

      <span
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="
          px-4
          py-2
          rounded-lg
          border
          border-[var(--border)]
          disabled:opacity-50
        "
      >
        Next →
      </button>
    </div>
  );
}