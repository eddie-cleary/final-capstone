import React, { useState, useEffect, RouterLink } from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import MyRecipeCard from "../../shared/MyRecipeCard";
import {
  Typography,
  Stack,
  List,
  ListItem,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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
    return <MyRecipeCard key={recipe.id} recipe={recipe} />;
  });

  return (
    <Layout>
      <Typography variant="h3">All My Recipes</Typography>
      <List>
        <Stack sx={imageGroup}>{recipes}</Stack>
      </List>
    </Layout>
  );
};

export default AllRecipes;
