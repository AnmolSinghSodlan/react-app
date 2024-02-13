import React from "react";

import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className={styles.paginationCurrentPage}>Page {currentPage}</span>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
