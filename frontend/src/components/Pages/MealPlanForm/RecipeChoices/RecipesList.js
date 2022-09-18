import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, List } from "@mui/material";
import { baseUrl } from "../../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import RecipeCardAddToMeal from "./RecipeCardAddToMeal";
import {
  setErrorMsg,
  setShowError,
} from "../../../../redux/features/forms/errors/errorsSlice";

const RecipesList = () => {
  const token = useSelector((state) => state.auth.token);
  const [recipes, setRecipes] = useState();
  const dispatch = useDispatch();

  const recipeComponents = recipes?.map((recipe, idx) => (
    <RecipeCardAddToMeal key={idx} recipe={recipe} />
  ));

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRecipes(res.data))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  return (
    <Stack>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {recipeComponents}
      </List>
    </Stack>
  );
};

export default RecipesList;
