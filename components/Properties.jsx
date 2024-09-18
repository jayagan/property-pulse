"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await res.json();
        setTotalItems(data.total);
        setProperties(data.properties);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, [page, pageSize]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (loading) return <Spinner loading={loading} />;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0
            ? "No properties found"
            : properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
