import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants on component mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load plants");
        return response.json();
      })
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
      .then((response) => {
        if (!response.ok) throw new Error("Unable to create plant");
        return response.json();
      })
      .then((data) => setPlants((currentPlants) => [...currentPlants, data]));
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
      .then((response) => {
        if (!response.ok) throw new Error("Unable to update plant");
        setPlants((currentPlants) =>
          currentPlants.map((plant) =>
            plant.id === id ? { ...plant, isOutOfStock: true } : plant
          )
        );
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
