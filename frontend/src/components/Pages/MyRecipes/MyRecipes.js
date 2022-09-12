import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import RecipeCard from "../../shared/MyRecipeCard";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import MyRecipeCard from "../../shared/MyRecipeCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const loadRecipes = () => {
    axios
      .get(baseUrl + `/recipes/myRecipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const recipesList = recipes.map((recipe) => {
    return (
      <MyRecipeCard
        key={recipe.id}
        recipe={recipe}
        refreshOnDelete={loadRecipes}
      />
    );
  });

  return (
    <Layout>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Typography variant="h3">My Recipes</Typography>
        <Grid
          container
          sx={{ mt: 2, mb: 10 }}
          spacing={5}
          justifyContent="center"
          alignItems="space-evenly"
          flexWrap="wrap"
          flexGrow="1"
        >
          {recipesList}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MyRecipes;
