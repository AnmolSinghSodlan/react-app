import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "./UserCard";
import Pagination from "./Pagination";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hairColors = [
    { hair_color: "blond", background_color: "#b38b67" },
    { hair_color: "brown", background_color: "#8B4513" },
    { hair_color: "black", background_color: "#000000" },
    { hair_color: "auburn", background_color: "#A52A2A" },
    // Add more colors as needed
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${currentPage}&search=${searchTerm}`
        );
        const usersData = response.data.results.map((user, index) => {
          const userHairColor = user.hair_color.split(",")[0].trim(); // Get the first hair color
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
    <div>
      <input type="text" placeholder="Search by name" onChange={handleSearch} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default App;
