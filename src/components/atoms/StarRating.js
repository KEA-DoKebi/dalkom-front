import React from "react";

export const StarRating = ({ rating, star }) => {
  const maxStars = 5;

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <span key={index} style={{ color: index < star ? "gold" : "gray" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: "15px", marginLeft: "3px" }}>({rating})</span>
    </div>
  );
};
