import api from "../api/axios";

// Dashboard
export const getDashboard = (token) => {
  return api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get Users
export const getUsers = (params, token) => {
  return api.get("/admin/users", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create User
export const createUser = (data, token) => {
  return api.post("/admin/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get User Details
export const getUserById = (id, token) => {
  return api.get(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Get All Stores
// ==============================
export const getStores = (params, token) => {
  return api.get("/admin/stores", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Get Store Details
// ==============================
export const getStoreById = (id, token) => {
  return api.get(`/admin/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Create Store
// ==============================
export const createStore = (data, token) => {
  return api.post("/admin/stores", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ==============================
// Get Store Owners
// ==============================
export const getOwners = (token) => {
  return api.get("/admin/users?role=OWNER", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get All Ratings
export const getRatings = (params, token) => {
  return api.get("/admin/ratings", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};