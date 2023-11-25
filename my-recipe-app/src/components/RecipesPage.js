import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";

const RecipesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <RecipeList searchTerm={searchTerm} />
    </div>
  );
};

export default RecipesPage;
