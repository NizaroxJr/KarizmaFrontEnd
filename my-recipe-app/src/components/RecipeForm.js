import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function RecipeForm() {
  const classes = useStyles();
  const [recipe, setRecipe] = useState({
    nom: "",
    ingredients: "",
    etapes: "",
    tempsPreparation: "",
    photo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/recettes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nouvelle recette ajoutée:", data);
        // Réinitialiser le formulaire après l'ajout de la recette
        setRecipe({
          nom: "",
          ingredients: "",
          etapes: "",
          tempsPreparation: "",
          photo: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de la recette:", error)
      );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Recipe
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Recipe Name"
              name="nom"
              value={recipe.nom}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Ingredients (separate by comma)"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              rows={4}
              label="Preparation Steps"
              name="etapes"
              value={recipe.etapes}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              label="Preparation Time (minutes)"
              name="tempsPreparation"
              value={recipe.tempsPreparation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Photo URL"
              name="photo"
              value={recipe.photo}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add Recipe
        </Button>
      </form>
    </Container>
  );
}

export default RecipeForm;
