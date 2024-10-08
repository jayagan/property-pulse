import React from "react";
import { fetchFeaturedProperties } from "@/utils/requests";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
  const featuredProperties = await fetchFeaturedProperties();

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
