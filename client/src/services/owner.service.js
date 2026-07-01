import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ==============================
// Owner Dashboard
// ==============================
export const getDashboard = (token) => {
  return axios.get(`${API}/owner/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Change Password
// ==============================
export const changePassword = (
  data,
  token
) => {
  return axios.put(
    `${API}/owner/password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};