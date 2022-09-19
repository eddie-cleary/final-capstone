import React, { useState, useEffect, useCallback } from "react";
import {
  InputLabel,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import IngredientSelect from "./IngredientSelect";
import StepsList from "./StepsList";
import ChosenIngredientsList from "./ChosenIngredientsList";
import RecipeInfo from "./RecipeInfo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ImgDropzone from "./ImgDropzone";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  resetState,
  setImgId,
  setName,
  setDescription,
  setLiked,
} from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";
import {
  setIsLoading,
  setIsImageUploaded,
  setIsStepsValid,
  setIsRecipeIngredientsValid,
  setIsFormValid,
} from "../../../redux/features/forms/addrecipe/addRecipeFormSlice";
import CategorySelect from "./CategorySelect";
import {
  setShowError,
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import PageTitle from "../../shared/PageTitle";
import PageLayout from "../../shared/PageLayout";

const RecipeForm = ({ isEdit }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const recipeId = useSelector((state) => state.addRecipeData.id);
  const name = useSelector((state) => state.addRecipeData.name);
  const description = useSelector((state) => state.addRecipeData.description);

  const recipeIngredients = useSelector(
    (state) => state.addRecipeData.recipeIngredients
  );
  const liked = useSelector((state) => state.addRecipeData.liked);
  const [likedChecked, setLikedChecked] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const isLoading = useSelector((state) => state.addRecipeForm.isLoading);
  const isImageUploaded = useSelector(
    (state) => state.addRecipeForm.isImageUploaded
  );
  const isFormValid = useSelector((state) => state.addRecipeForm.isFormValid);
  const isRecipeIngredientsValid = useSelector(
    (state) => state.addRecipeForm.isRecipeIngredientsValid
  );
  const isStepsValid = useSelector((state) => state.addRecipeForm.isStepsValid);
  const postObject = useSelector((state) => state.addRecipeData);
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.layout.isMobile);

  const matches = useMediaQuery("(max-width: 1080px)");

  const postToServer = useCallback(() => {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/recipes/add`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Recipe Added!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsLoading(false));
        dispatch(resetState());
      });
  }, [dispatch, postObject, token]);

  const putToServer = useCallback(() => {
    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/recipes/${recipeId}`,
        postObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(setSuccessMsg("Recipe Updated!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsLoading(false));
        dispatch(resetState());
      });
  }, [dispatch, postObject, recipeId, token]);

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    if (fileInput) {
      uploadImage(fileInput);
      return;
    }

    if (!isEdit) {
      postToServer();
    } else {
      putToServer();
    }
  };

  useEffect(() => {
    if (postObject?.recipesLiked?.length > 0) {
      if (isEdit) {
        if (!likedChecked && postObject) {
          if (postObject.recipesLiked.includes(user.id)) {
            dispatch(setLiked(true));
          }
          setLikedChecked(true);
        }
      }
    }
  }, [
    postObject.recipesLiked,
    dispatch,
    isEdit,
    likedChecked,
    postObject,
    user.id,
  ]);

  const uploadImage = async (fileInput) => {
    const API_KEY = "362171829159456";
    const CLOUD_NAME = "djoe";

    const signatureResponse = await axios.get(
      process.env.REACT_APP_BASE_URL + "/get-signature",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const signature = signatureResponse?.data?.signature;
    const timestamp = signatureResponse?.data?.timestamp;

    const data = new FormData();
    data.append("file", fileInput);
    data.append("api_key", API_KEY);
    data.append("signature", signature);
    data.append("timestamp", timestamp);
    data.append("folder", "MealPlanner");

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(setImgId(cloudinaryResponse.data.public_id));
  };

  useEffect(() => {
    if (postObject.imgId !== null) {
      dispatch(setIsImageUploaded(true));
    }
  }, [postObject.imgId, dispatch]);

  useEffect(() => {
    if (isImageUploaded && postObject.imgId !== null) {
      dispatch(setIsImageUploaded(false));
      if (!isEdit) {
        postToServer();
      } else {
        putToServer();
      }
    }
  }, [
    isImageUploaded,
    dispatch,
    isEdit,
    postToServer,
    putToServer,
    postObject.imgId,
  ]);

  useEffect(() => {
    const result = postObject.steps.every((step) => {
      if (step.length > 2) {
        return true;
      }
      return false;
    });
    dispatch(setIsStepsValid(result));
  }, [postObject.steps, dispatch]);

  useEffect(() => {
    let result = false;
    if (recipeIngredients.length > 0) {
      result = recipeIngredients.every((ingredient) => {
        if (ingredient.quantity > 0) {
          return true;
        }
        return false;
      });
    }

    dispatch(setIsRecipeIngredientsValid(result));
  }, [postObject.recipeIngredients, dispatch, recipeIngredients]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(resetState());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (
      postObject.name.length > 2 &&
      postObject.description.length > 2 &&
      postObject.recipeCategories?.length > 0 &&
      isStepsValid &&
      isRecipeIngredientsValid &&
      postObject.prepTime > 0 &&
      postObject.cookTime > 0
    ) {
      dispatch(setIsFormValid(true));
    } else {
      dispatch(setIsFormValid(false));
    }
  }, [postObject, isStepsValid, isRecipeIngredientsValid, dispatch]);

  return (
    <PageLayout>
      <form>
        <Stack mb={5} alignItems="center">
          <Stack sx={{ maxWidth: isMobile ? "95%" : "700px" }}>
            <PageTitle title={isEdit ? "Edit Recipe" : "Add Recipe"} />
            <Box sx={{ transform: "scale(0.85)", mt: -13 }}>
              <Stack sx={{ mt: 3 }}>
                <InputLabel>Name</InputLabel>
                <TextField
                  value={name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  sx={{ mt: 1 }}
                  placeholder="Recipe Name"
                ></TextField>
              </Stack>
              <Stack sx={{ mt: 2 }}>
                <InputLabel>Description</InputLabel>
                <TextField
                  sx={{ mt: 1 }}
                  rows={3}
                  multiline
                  placeholder="Description"
                  value={description}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                />
              </Stack>
              <CategorySelect />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ mb: matches ? 0 : -3 }}>
                  Ingredients
                </Typography>
                <ChosenIngredientsList />
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-evenly"
                  sx={{ mt: 2, gap: "10px", flexWrap: matches ? "wrap" : "" }}
                >
                  <IngredientSelect />
                </Stack>
              </Box>
              <Box sx={{ mt: 3 }}>
                <StepsList />
              </Box>
              <RecipeInfo />
              <Box sx={{ mt: 5 }}>
                {" "}
                <ImgDropzone
                  isEdit={isEdit}
                  fileInput={fileInput}
                  setFileInput={setFileInput}
                />
              </Box>
              <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
                <FormControlLabel
                  sx={{ textAlign: "center" }}
                  control={
                    <Checkbox
                      checked={liked}
                      icon={<FavoriteBorder color="warning" />}
                      checkedIcon={<Favorite color="warning" />}
                      onChange={(e) => dispatch(setLiked(e.target.checked))}
                    />
                  }
                  label="Mark as favorite?"
                />
              </Stack>
              <Button
                disabled={isFormValid ? false : true}
                onClick={handleSubmit}
                sx={{ mt: 3, width: "100%" }}
                variant="btn"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : isEdit ? (
                  "Edit Recipe"
                ) : (
                  "Add Recipe"
                )}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </PageLayout>
  );
};

export default RecipeForm;
