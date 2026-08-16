import React from "react";

function PlantCard({ plant, onSoldOut }) {
  const handleSoldOutClick = () => {
    onSoldOut(plant.id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      {plant.isOutOfStock ? (
        <button>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleSoldOutClick}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
