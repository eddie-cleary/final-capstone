import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Stack, Typography } from "@mui/material";
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
      <Typography variant="h3">My Recipes</Typography>
      <Stack direction="row">{recipesList}</Stack>
    </Layout>
  );
};

export default MyRecipes;
