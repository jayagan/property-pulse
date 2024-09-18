import React from "react";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>

      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
