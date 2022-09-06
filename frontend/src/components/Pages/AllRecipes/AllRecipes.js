import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { Typography, Stack, List, ListItem } from "@mui/material";

const AllRecipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const recipes = recipesData.map((recipe) => {
    return <ListItem key={recipe.id}>{recipe.title}</ListItem>;
  });

  return (
    <Layout>
      <Typography variant="h2">All Recipes</Typography>
      <List>
        <Stack>{recipes}</Stack>
      </List>
    </Layout>
  );
};

export default AllRecipes;
