import { useState } from "react";

import Button from "../common/Button";

export default function UserForm({
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            p-3
            outline-none
            focus:border-[var(--primary)]
          "
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            p-3
            outline-none
            focus:border-[var(--primary)]
          "
          required
        />
      </div>

      {/* Address */}
      <div>
        <label className="block mb-2 font-medium">
          Address
        </label>

        <textarea
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            p-3
            outline-none
            focus:border-[var(--primary)]
          "
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            p-3
            outline-none
            focus:border-[var(--primary)]
          "
          required
        />
      </div>

      {/* Role */}
      <div>
        <label className="block mb-2 font-medium">
          Role
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            p-3
            outline-none
            focus:border-[var(--primary)]
          "
        >
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          loading={loading}
          fullWidth={false}
        >
          Create User
        </Button>
      </div>
    </form>
  );
}