export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl"
        style={{
          background: "var(--primary)",
        }}
      >
        S
      </div>

      <div>
        <h1
          className="text-2xl font-bold"
          style={{
            color: "var(--primary)",
          }}
        >
          StoreHub
        </h1>

        <p
          className="text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Ratings Platform
        </p>
      </div>
    </div>
  );
}