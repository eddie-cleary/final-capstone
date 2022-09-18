import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { CircularProgress } from "@mui/material";
import Layout from "../../Layout/Layout";
import RecipeForm from "../RecipeForm/RecipeForm";
import { setRecipeFormData } from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";
import {
  setErrorMsg,
  setShowError,
} from "../../../redux/features/forms/errors/errorsSlice";

const EditRecipe = () => {
  const currUserId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [isRecipeLoaded, setisRecipeLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRecipe(res.data))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => setisRecipeLoaded(true));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (isRecipeLoaded && isAuthorized) {
      dispatch(setRecipeFormData(recipe));
    }
  }, [isRecipeLoaded, isAuthorized, dispatch, recipe]);

  useEffect(() => {
    if (isRecipeLoaded) {
      if (recipe.creatorId === currUserId) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [isRecipeLoaded, currUserId, recipe?.creatorId]);

  return (
    <Layout>
      {!isRecipeLoaded && <CircularProgress />}
      {isRecipeLoaded && isAuthorized && <RecipeForm isEdit={true} />}
    </Layout>
  );
};

export default EditRecipe;

//update the add recipe data in state
//render out the addrecipe component, call it RecipeForm
// pass in that it is an edit, handle submit as a put, with id
