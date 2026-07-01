import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            className="block font-medium"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          autoComplete="off"
          className={`
            w-full
            h-11
            px-4
            rounded-xl
            border
            outline-none
            transition-all
            duration-200
            bg-white
            border-[var(--border)]
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]
            focus:ring-opacity-20
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p
            className="text-sm"
            style={{
              color: "var(--danger)",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;