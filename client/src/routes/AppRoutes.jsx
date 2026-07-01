import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/user/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import OwnerChangePassword from "../pages/owner/ChangePassword";

import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import OwnerLayout from "../layouts/OwnerLayout";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import GuestRoute from "../pages/auth/GuestRoute";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";

import Stores from "../pages/admin/Stores";
import StoreDetails from "../pages/admin/StoreDetails";
import Ratings from "../pages/admin/Ratings";

import UserStores from "../pages/user/Stores";
import UserStoreDetails from "../pages/user/StoreDetails";
import MyRatings from "../pages/user/MyRatings";
import ChangePassword from "../pages/user/ChangePassword";
import OwnerRatings from "../pages/owner/Ratings";
import OwnerMyStore from "../pages/owner/MyStore";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= Authentication ================= */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* ================= Admin ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/users/:id"
          element={<UserDetails />}
        />

        <Route
          path="/admin/stores"
          element={<Stores />}
        />

        <Route
          path="/admin/stores/:id"
          element={<StoreDetails />}
        />

        <Route
          path="/admin/ratings"
          element={<Ratings />}
        />
      </Route>

      {/* ================= Owner ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["OWNER"]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />
        <Route
          path="/owner/store"
          element={<OwnerMyStore />}
        />
        <Route
          path="/owner/ratings"
          element={<OwnerRatings />}
        />
          <Route
            path="/owner/change-password"
            element={<OwnerChangePassword />}
          />
      </Route>
    

      {/* ================= User ================= */}
{/* User */}
<Route
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <UserLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/user/dashboard"
    element={<UserDashboard />}
  />

  <Route
    path="/user/stores"
    element={<UserStores />}
  />

  <Route
    path="/user/stores/:id"
    element={<UserStoreDetails />}
  />

  <Route
    path="/user/ratings"
    element={<MyRatings />}
  />

  <Route
    path="/user/change-password"
    element={<ChangePassword />}
  />
</Route>

    </Routes>
  );
}