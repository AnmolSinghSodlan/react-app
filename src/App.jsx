import React, { useState, useEffect } from "react";
import axios from "axios";

import { ThreeCircles } from "react-loader-spinner";
import { MdError } from "react-icons/md";

import UserCard from "./UserCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import styles from "./App.module.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hairColors = [
    { hair_color: "blond", background_color: "#f1cc8f" },
    { hair_color: "brown", background_color: "#DAA06D" },
    { hair_color: "black", background_color: "#000000" },
    { hair_color: "auburn", background_color: "#a52a2a" },
    { hair_color: "grey", background_color: "#999999" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${currentPage}&search=${searchTerm}`
        );
        const usersData = response.data.results.map((user, index) => {
          const userHairColor = user.hair_color.split(",")[0].trim();
          const backgroundColor =
            hairColors.find((color) => color.hair_color === userHairColor)
              ?.background_color || "#FFFFFF";
          return {
            ...user,
            background_color: backgroundColor,
          };
        });
        setUsers(usersData);
      } catch (error) {
        setError("Error fetching data");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onChange={handleSearch} />
      {loading ? (
        <div className={styles.loader}>
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#000"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : error ? (
        <>
          <div className={styles.errorIcon}>
            <MdError />
          </div>
          <div className={styles.errorText}>{error}</div>
        </>
      ) : (
        <div className={styles.userCards}>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};

export default App;
