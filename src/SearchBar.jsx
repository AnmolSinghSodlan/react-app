import { FaSearch } from "react-icons/fa";

import styles from "./SearchBar.module.css";

function SearchBar({ searchTerm, onChange }) {
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
      />
      <button className={styles.searchButton}>
        <FaSearch className={styles.icon} />
      </button>
    </div>
  );
}

export default SearchBar;
