import React, { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import {
  setErrorMsg,
  setShowError,
} from "../../redux/features/forms/errors/errorsSlice";
import { setAllRecipes } from "../../redux/features/recipes/recipesDataSlice";

const LikeRecipeButton = ({ recipe, setRecipe }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .put(baseUrl + `/recipes/like/${recipe.id}/${!recipe?.liked}`, "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => loadRecipes())
      .catch((err) => {
        if (err.response?.data?.message) {
          dispatch(setErrorMsg(err.response.data.message));
        } else if (err.response?.statusText) {
          dispatch(setErrorMsg(err.response.statusText));
        } else if (err.request) {
          dispatch(setErrorMsg("Network error."));
        } else {
          dispatch(setErrorMsg("Error"));
        }
        dispatch(setShowError(true));
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const loadRecipes = () => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(setAllRecipes(res.data)))
      .catch((err) => console.log(err));
  };

  return (
    <Button disabled={isLoading ? true : false} onClick={handleFavoriteClicked}>
      {recipe?.liked ? (
        <Favorite color="warning" />
      ) : (
        <FavoriteBorder color="warning" />
      )}
    </Button>
  );
};

export default LikeRecipeButton;
