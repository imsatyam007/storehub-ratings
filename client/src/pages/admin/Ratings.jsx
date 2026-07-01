import {
  useState,
  useEffect,
  useCallback,
} from "react";

import { useAuth } from "../../context/AuthContext";

import { getRatings } from "../../services/admin.service";

import PageHeader from "../../components/common/PageHeader";

import RatingFilters from "../../components/ratings/RatingFilters";
import RatingTable from "../../components/ratings/RatingTable";
import RatingPagination from "../../components/ratings/RatingPagination";

export default function Ratings() {
  const { token } = useAuth();

  const [ratings, setRatings] = useState([]);

  const [filters, setFilters] = useState({
    user: "",
    store: "",
    rating: "",
  });

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const loadRatings = useCallback(
    async () => {
      if (!token) return;

      try {
        setLoading(true);

        const res = await getRatings(
          {
            ...filters,
            page: currentPage,
            limit: 10,
          },
          token
        );

        setRatings(res.data.ratings);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [token, filters, currentPage]
  );

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  const handleFilterChange = (e) => {
    setCurrentPage(1);

    setFilters((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading ratings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ratings Management"
        description="Manage all submitted ratings."
      />

      <RatingFilters
        filters={filters}
        onChange={handleFilterChange}
      />

      <RatingTable
        ratings={ratings}
      />

      <RatingPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() =>
          setCurrentPage((p) =>
            Math.max(1, p - 1)
          )
        }
        onNext={() =>
          setCurrentPage((p) =>
            Math.min(
              totalPages,
              p + 1
            )
          )
        }
      />
    </div>
  );
}