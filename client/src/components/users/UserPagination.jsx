export default function UserPagination({
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
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        style={{
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        ← Previous
      </button>

      <div
        className="font-medium"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className="
          px-4
          py-2
          rounded-lg
          border
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        style={{
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        Next →
      </button>
    </div>
  );
}