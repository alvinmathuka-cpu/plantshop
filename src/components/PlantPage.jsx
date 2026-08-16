import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({
  plants,
  onAddPlant,
  onSoldOut,
  searchTerm,
  setSearchTerm,
}) {
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} onSoldOut={onSoldOut} />
    </main>
  );
}

export default PlantPage;
