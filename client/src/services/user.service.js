import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ==============================
// User Dashboard
// ==============================
export const getDashboard = (token) => {
  return axios.get(`${API}/user/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Get All Stores
// ==============================
export const getStores = (
  filters,
  page,
  token
) => {
  return axios.get(`${API}/user/stores`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: filters.name,
      address: filters.address,
      page,
    },
  });
};

// ==============================
// Get Store Details
// ==============================
export const getStoreById = (
  id,
  token
) => {
  return axios.get(`${API}/user/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Submit Rating
// ==============================
export const submitRating = (
  storeId,
  rating,
  token
) => {
  return axios.post(
    `${API}/user/stores/${storeId}/rating`,
    {
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ==============================
// Update Rating
// ==============================
export const updateRating = (
  storeId,
  rating,
  token
) => {
  return axios.put(
    `${API}/user/stores/${storeId}/rating`,
    {
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ==============================
// My Ratings
// ==============================
export const getMyRatings = (
  token
) => {
  return axios.get(`${API}/user/ratings`, {
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
    `${API}/user/password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};