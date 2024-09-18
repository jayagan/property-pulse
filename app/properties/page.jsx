import React from "react";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
