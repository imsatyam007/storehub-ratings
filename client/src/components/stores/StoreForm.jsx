import { useState } from "react";

import Button from "../common/Button";

export default function StoreForm({
  owners = [],
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
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
      className="space-y-5"
    >
      <input
        name="name"
        placeholder="Store Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <input
        name="email"
        placeholder="Store Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="address"
        placeholder="Store Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <select
        name="ownerId"
        value={formData.ownerId}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      >
        <option value="">
          Select Owner
        </option>

        {owners.map((owner) => (
          <option
            key={owner.id}
            value={owner.id}
          >
            {owner.name}
          </option>
        ))}
      </select>

      <Button
        type="submit"
        loading={loading}
        fullWidth={false}
      >
        Create Store
      </Button>
    </form>
  );
}