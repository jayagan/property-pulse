"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res?.status === 200) {
          const searchProperties = await res.json();
          setProperties(searchProperties);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch search results");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  if (loading) return <Spinner loading={loading} />;
  return (
    !loading && (
      <>
        <section className="bg-blue-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <PropertySearchForm />
          </div>
        </section>
        <section className="px-4 py-6">
          <Link
            className="flex items-center text-blue-500 hover:underline mb-3"
            href={"/properties"}
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl  mb-4">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.length === 0
                ? "No matching search results"
                : properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default SearchResultsPage;
