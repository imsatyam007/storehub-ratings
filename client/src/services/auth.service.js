import api from "../api/axios";

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// Change Password
export const changePassword = (data, token) => {
  return api.put("/auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};