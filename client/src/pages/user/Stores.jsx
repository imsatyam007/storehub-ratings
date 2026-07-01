import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  getStores,
  submitRating,
  updateRating,
} from "../../services/user.service";

import UserStoreFilters from "../../components/users/UserStoreFilters";
import UserStoreTable from "../../components/users/UserStoreTable";
import UserStorePagination from "../../components/users/UserStorePagination";
import RatingModal from "../../components/users/RatingModal";

export default function Stores() {
  const { token } = useAuth();

  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedStore, setSelectedStore] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const loadStores = async () => {
    try {
      const res = await getStores(
        filters,
        page,
        token
      );

      setStores(res.data.stores);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStores();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    setPage(1);

    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRate = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  const handleSubmitRating = async (
    storeId,
    rating
  ) => {
    try {
      setLoading(true);

      if (selectedStore.userRating) {
        await updateRating(
          storeId,
          rating,
          token
        );
      } else {
        await submitRating(
          storeId,
          rating,
          token
        );
      }

      setOpenModal(false);

      loadStores();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1
          className="text-3xl font-bold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Stores
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Browse stores and submit your ratings.
        </p>
      </section>

      <UserStoreFilters
        filters={filters}
        onChange={handleFilterChange}
      />

      <UserStoreTable
        stores={stores}
        onRate={handleRate}
      />

      <UserStorePagination
        currentPage={page}
        totalPages={totalPages}
        onPrevious={() =>
          setPage((prev) =>
            Math.max(prev - 1, 1)
          )
        }
        onNext={() =>
          setPage((prev) =>
            Math.min(prev + 1, totalPages)
          )
        }
      />

      <RatingModal
        open={openModal}
        store={selectedStore}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}