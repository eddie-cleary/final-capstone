import React, { useState, useEffect, RouterLink } from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import RecipeCard from "../../shared/RecipeCard";
import { Typography, Stack, List } from "@mui/material";

const imageGroup = {
  flexDirection: "row",
  flexWrap: "wrap",
};

const AllRecipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("the data ", recipesData);
  }, [recipesData]);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipesData(res.data);
        console.log("the response ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const recipes = recipesData?.map((recipe) => {
    return <RecipeCard key={recipe.id} recipe={recipe} />;
  });

  return (
    <Layout>
      <Typography variant="h3">All Recipes</Typography>
      <List>
        <Stack sx={imageGroup}>{recipes}</Stack>
      </List>
    </Layout>
  );
};

export default AllRecipes;
