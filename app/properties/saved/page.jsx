"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import PropertyCard from "@/components/PropertyCard";

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch(`/api/bookmarks`);

        if (res?.status === 200) {
          const savedProps = await res.json();
          setSavedProperties(savedProps);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [userId]);

  if (loading) return <Spinner loading={loading} />;

  return (
    !loading && (
      <section className="px-4 py-6">
        <h1 className="text-2xl mb-4 ml-60">Saved Properties</h1>
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.length === 0
              ? "No saved properties"
              : savedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
          </div>
        </div>
      </section>
    )
  );
};

export default SavedPropertiesPage;
