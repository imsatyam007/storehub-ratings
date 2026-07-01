import Button from "../common/Button";

export default function StorePagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between">
      <Button
        fullWidth={false}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        ← Previous
      </Button>

      <p>
        Page {currentPage} of {totalPages}
      </p>

      <Button
        fullWidth={false}
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next →
      </Button>
    </div>
  );
}