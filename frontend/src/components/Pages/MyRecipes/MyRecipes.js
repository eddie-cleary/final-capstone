import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../Layout/Layout";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import MyRecipeCard from "../../shared/MyRecipeCard";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const loadRecipes = useCallback(() => {
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
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  useEffect(() => {
    loadRecipes();
  }, [dispatch, token, recipes, loadRecipes]);

  const recipesList = recipes.map((recipe) => {
    return (
      <MyRecipeCard
        key={recipe.id}
        recipe={recipe}
        refreshParent={loadRecipes}
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
