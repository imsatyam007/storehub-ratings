import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../services/owner.service";

export default function ChangePassword() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword(
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        token
      );

      alert(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1
        className="text-3xl font-bold mb-2"
        style={{
          color: "var(--text-primary)",
        }}
      >
        Change Password
      </h1>

      <p
        className="mb-8"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Update your account password.
      </p>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-2xl
          border
          border-[var(--border)]
          p-8
          space-y-6
        "
      >
        {/* Current Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                px-4
                py-3
                pr-12
                outline-none
                focus:border-[var(--primary)]
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showCurrent ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                px-4
                py-3
                pr-12
                outline-none
                focus:border-[var(--primary)]
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showNew ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                px-4
                py-3
                pr-12
                outline-none
                focus:border-[var(--primary)]
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3
            rounded-xl
            bg-[var(--primary)]
            text-white
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
}