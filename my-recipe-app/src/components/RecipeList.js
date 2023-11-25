import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const RecipeList = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipe data from API (adjust URL and headers accordingly)
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search term (name, ingredients, or duration)
    const filtered = recipes.filter((recipe) => {
      const { name, ingredients, duration } = recipe;

      const searchLower = searchTerm.toLowerCase().trim();
      const nameLower = name.toLowerCase();
      const ingredientsLower = ingredients.join(" ").toLowerCase();

      return (
        nameLower.includes(searchLower) ||
        ingredientsLower.includes(searchLower) ||
        duration.toString().includes(searchLower)
      );
    });

    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        List of Recipes
      </Typography>
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {recipe.name}
                </Typography>
                <Typography color="textSecondary">
                  Duration: {recipe.duration} minutes
                </Typography>
                <Typography variant="body2" component="p">
                  Ingredients: {recipe.ingredients.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
