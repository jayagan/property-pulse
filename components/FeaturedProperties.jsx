"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const res = await fetch(`/api/properties/featured`);

        if (res?.status === 200) {
          const result = await res.json();
          setFeaturedProperties(result);
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  if (loading) return <Spinner loading={loading} />;
  return (
    featuredProperties.length && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
              >
                <FeaturedPropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
