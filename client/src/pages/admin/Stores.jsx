import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getStores,
  createStore,
  getOwners,
} from "../../services/admin.service";

import Modal from "../../components/common/Modal";

import StoreFilters from "../../components/stores/StoreFilters";
import StoreTable from "../../components/stores/StoreTable";
import StorePagination from "../../components/stores/StorePagination";
import StoreForm from "../../components/stores/StoreForm";
import PageHeader from "../../components/common/PageHeader";

export default function Stores() {
  const { token } = useAuth();

  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadStores = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await getStores(
        {
          ...filters,
          page: currentPage,
          limit: 10,
          sortBy,
          order,
        },
        token
      );

      setStores(res.data.stores);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Stores Error:", error);
    } finally {
      setLoading(false);
    }
  }, [
    token,
    filters,
    currentPage,
    sortBy,
    order,
  ]);

  const loadOwners = async () => {
    try {
      const res = await getOwners(token);

      setOwners(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStores();
    loadOwners();
  }, [loadStores]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setOrder("asc");
    }

    setCurrentPage(1);
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

  const handleCreateStore = async (
    formData
  ) => {
    try {
      setCreating(true);

      await createStore(formData, token);

      setOpenModal(false);

      loadStores();
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading stores...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <PageHeader
  title="Stores Management"
  description="Search, filter and manage stores."
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
      {creating ? "Creating..." : "Create Store"}
    </button>
  }
/>

      <StoreFilters
        filters={filters}
        onChange={handleFilterChange}
      />

      <StoreTable
        stores={stores}
        sortBy={sortBy}
        order={order}
        onSort={handleSort}
      />

      <StorePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <Modal
        open={openModal}
        title="Create Store"
        onClose={() =>
          setOpenModal(false)
        }
      >
        <StoreForm
          owners={owners}
          onSubmit={handleCreateStore}
          loading={creating}
        />
      </Modal>
    </div>
  );
}