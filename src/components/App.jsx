import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants on component mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Add a new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => setPlants([...plants, data]));
  };

  // Mark plant as sold out
  const handleSoldOut = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isOutOfStock: true }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants(plants.map((plant) => (plant.id === id ? updatedPlant : plant)));
      });
  };

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={plants}
        onAddPlant={handleAddPlant}
        onSoldOut={handleSoldOut}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;
