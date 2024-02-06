import React from "react";

export const StarRating = ({ rating, star, size }) => {
  const maxStars = 5;
  const displayRating = rating === null ? 0 : rating;
  return (
    <div style={{ fontSize: { size } }}>
      {[...Array(maxStars)].map((_, index) => (
        <span key={index} style={{ color: index < star ? "gold" : "gray" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: { size }, marginLeft: "3px" }}>({displayRating.toFixed(1)})</span>
    </div>
  );
};
