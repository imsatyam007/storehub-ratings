export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          shadow-xl
          p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}