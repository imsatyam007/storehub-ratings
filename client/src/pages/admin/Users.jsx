import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  getUsers,
  createUser,
} from "../../services/admin.service";

import Modal from "../../components/common/Modal";
import UserForm from "../../components/users/UserForm";
import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";
import UserPagination from "../../components/users/UserPagination";
import PageHeader from "../../components/common/PageHeader";

export default function Users() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

const loadUsers = useCallback(async () => {
  if (!token) return;

  try {
    setLoading(true);

    const res = await getUsers(
      {
        ...filters,
        page: currentPage,
        limit: 10,
        sortBy,
        order,
      },
      token
    );

    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  } catch (error) {
  console.error("Create User Error:", error.response?.data);
} finally {
    setLoading(false);
  }
}, [token, filters, currentPage, sortBy, order]);

useEffect(() => {
  loadUsers();
}, [loadUsers]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }

    setCurrentPage(1);
  };

  const handleCreateUser = async (formData) => {
  console.log(formData);

  try {
    setCreating(true);

    await createUser(formData, token);

    setOpenModal(false);

    loadUsers();
  } catch (error) {
  console.log(JSON.stringify(error.response.data, null, 2));
}finally {
    setCreating(false);
  }
};

  const handleFilterChange = (e) => {
    setCurrentPage(1);

    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-2 pb-8">
      
      <PageHeader
  title="Users Management"
  description="Search, filter and manage platform users."
  action={
    <button
      onClick={() => setOpenModal(true)}
      className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-xl
        bg-[var(--primary)]
        text-white
        hover:opacity-90
      "
    >
      <Plus size={18} />
      Create User
    </button>
  }
/>

      <UserFilters
        filters={filters}
        onChange={handleFilterChange}
      />

      <UserTable
        users={users}
        sortBy={sortBy}
        order={order}
        onSort={handleSort}
      />

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <Modal
        open={openModal}
        title="Create User"
        onClose={() => setOpenModal(false)}
      >
        <UserForm
          onSubmit={handleCreateUser}
          loading={creating}
        />
      </Modal>
    </div>
  );
}