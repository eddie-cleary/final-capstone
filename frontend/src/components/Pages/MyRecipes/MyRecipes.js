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

  const recipesList = recipes.map((recipe) => {
    return <MyRecipeCard recipe={recipe} />;
  });

  useEffect(() => {
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
  }, []);

  return (
    <Layout>
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h1">My Recipes</Typography>
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
