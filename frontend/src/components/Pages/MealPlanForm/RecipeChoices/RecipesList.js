import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, List } from "@mui/material";
import { baseUrl } from "../../../../shared/baseUrl";
import { useSelector } from "react-redux";
import RecipeCardAddToMeal from "./RecipeCardAddToMeal";

const RecipesList = () => {
  const token = useSelector((state) => state.auth.token);
  const [recipes, setRecipes] = useState();

  const recipeComponents = recipes?.map((recipe, idx) => (
    <RecipeCardAddToMeal key={idx} recipe={recipe} />
  ));

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

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
