import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="btn btn-sm btn-secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Попередня сторінка
      </button>
      <span className="mx-2">
        Сторінка {currentPage} з {totalPages}
      </span>
      <button
        className="btn btn-sm btn-secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Наступна сторінка
      </button>
    </div>
  );
};

export default Pagination;
