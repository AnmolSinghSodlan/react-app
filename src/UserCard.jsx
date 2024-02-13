import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

import styles from "./UserCard.module.css";

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
    if (str.toLowerCase() === "n/a") {
      return "N/A";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className={styles.cardSl}
      style={{
        backgroundColor: `${user.background_color}`,
      }}
    >
      <div className={styles.cardImage}>
        <LazyLoadImage
          alt="User"
          effect="blur"
          src={imageUrl}
          height={300}
          width={200}
          className={styles.userImage}
        />
        <div
          className={styles.cardHeading}
          style={{
            color:
              user.hair_color === "n/a" ||
              user.hair_color === "none" ||
              user.hair_color === "white"
                ? "#636262"
                : "#fff",
          }}
        >
          Name: {capitalizeFirstLetter(user.name)}
        </div>
        <div
          className={styles.cardText}
          style={{
            color:
              user.hair_color === "n/a" ||
              user.hair_color === "none" ||
              user.hair_color === "white"
                ? "#636262"
                : "#fff",
          }}
        >
          Hair Color: {capitalizeFirstLetter(user.hair_color)}
        </div>
        <div
          className={styles.cardText}
          style={{
            color:
              user.hair_color === "n/a" ||
              user.hair_color === "none" ||
              user.hair_color === "white"
                ? "#636262"
                : "#fff",
          }}
        >
          Skin Color: {capitalizeFirstLetter(user.skin_color)}
        </div>
        <div
          className={styles.cardText}
          style={{
            color:
              user.hair_color === "n/a" ||
              user.hair_color === "none" ||
              user.hair_color === "white"
                ? "#636262"
                : "#fff",
          }}
        >
          Gender: {capitalizeFirstLetter(user.gender)}
        </div>
        <div
          className={styles.cardText}
          style={{
            color:
              user.hair_color === "n/a" ||
              user.hair_color === "none" ||
              user.hair_color === "white"
                ? "#636262"
                : "#fff",
          }}
        >
          Number of Vehicles: {user.vehicles.length}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
