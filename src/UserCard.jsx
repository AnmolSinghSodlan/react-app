import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const UserCard = ({ user }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      const response = await axios.get("https://picsum.photos/200/300");
      setImageUrl(response.request.responseURL);
    };
    fetchRandomImage();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      style={{
        backgroundColor: user.background_color,
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <LazyLoadImage
        alt="User"
        effect="blur"
        src={imageUrl}
        height={300}
        width={200}
        placeholderSrc={"https://via.placeholder.com/200x300?text=Loading..."}
      />
      <h3>Name: {user.name}</h3>
      <p>Hair Color: {capitalizeFirstLetter(user.hair_color)}</p>
      <p>Skin Color: {capitalizeFirstLetter(user.skin_color)}</p>
      <p>Gender: {capitalizeFirstLetter(user.gender)}</p>
      <p>Number of Vehicles: {user.vehicles.length}</p>
    </div>
  );
};

export default UserCard;
