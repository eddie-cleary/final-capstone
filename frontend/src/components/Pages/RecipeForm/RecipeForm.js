import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import Layout from "../../Layout/Layout";
import IngredientSelect from "./IngredientSelect";
import StepsList from "./StepsList";
import ChosenIngredientsList from "./ChosenIngredientsList";
import RecipeInfo from "./RecipeInfo";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import ImgDropzone from "./ImgDropzone";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  resetState,
  setImgId,
  setTitle,
  setDescription,
  setLiked,
} from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";
import {
  setShowSuccess,
  setShowError,
  setSuccessMsg,
  setErrMsg,
  setIsLoading,
  setIsImageUploading,
  setIsStepsValid,
  setIsRecipeIngredientsValid,
  setIsFormValid,
} from "../../../redux/features/forms/addrecipe/addRecipeFormSlice";
import { CustomButton } from "../../..";
import CategorySelect from "./CategorySelect";

const RecipeForm = ({ isEdit }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const recipeId = useSelector((state) => state.addRecipeData.id);
  const title = useSelector((state) => state.addRecipeData.title);
  const description = useSelector((state) => state.addRecipeData.description);

  const steps = useSelector((state) => state.addRecipeData.steps);
  const recipeIngredients = useSelector(
    (state) => state.addRecipeData.recipeIngredients
  );
  const liked = useSelector((state) => state.addRecipeData.liked);
  const [likedChecked, setLikedChecked] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const isLoading = useSelector((state) => state.addRecipeForm.isLoading);
  const isImageUploading = useSelector(
    (state) => state.addRecipeForm.isImageUploading
  );
  const isFormValid = useSelector((state) => state.addRecipeForm.isFormValid);
  const isRecipeIngredientsValid = useSelector(
    (state) => state.addRecipeForm.isRecipeIngredientsValid
  );
  const isStepsValid = useSelector((state) => state.addRecipeForm.isStepsValid);
  const errMsg = useSelector((state) => state.addRecipeForm.errMsg);
  const successMsg = useSelector((state) => state.addRecipeForm.successMsg);
  const showSuccess = useSelector((state) => state.addRecipeForm.showSuccess);
  const showError = useSelector((state) => state.addRecipeForm.showError);
  const postObject = useSelector((state) => state.addRecipeData);
  const dispatch = useDispatch();

  const postToServer = () => {
    console.log("the post object", postObject);

    axios
      .post(baseUrl + `/recipes/add`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Recipe Added!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        dispatch(setErrMsg(err.response));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsLoading(false));
        dispatch(resetState());
      });
  };

  const putToServer = () => {
    axios
      .put(baseUrl + `/recipes/${recipeId}`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Recipe Updated!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        // dispatch(setErrMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsLoading(false));
        dispatch(resetState());
      });
  };

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
  }, [postObject.recipesLiked]);

  const uploadImage = async (fileInput) => {
    const API_KEY = "362171829159456";
    const CLOUD_NAME = "djoe";

    dispatch(setIsImageUploading(true));

    const signatureResponse = await axios.get(baseUrl + "/get-signature", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    if (isImageUploading) {
      dispatch(setIsImageUploading(false));
      postToServer();
    }
  }, [postObject.imgId]);

  useEffect(() => {
    const result = postObject.steps.every((step) => {
      if (step.length > 2) {
        return true;
      }
      return false;
    });
    dispatch(setIsStepsValid(result));
  }, [postObject.steps]);

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
  }, [postObject.recipeIngredients]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(resetState());
    }
  }, []);

  useEffect(() => {
    if (
      postObject.title.length > 2 &&
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
  }, [postObject, isStepsValid, isRecipeIngredientsValid]);

  return (
    <section>
      <form>
        <Stack sx={{ maxWidth: "550px" }}>
          <Typography variant="h5">
            {isEdit ? "Edit Recipe" : "Add Recipe"}
          </Typography>
          <Stack sx={{ mt: 3 }}>
            <InputLabel>Title</InputLabel>
            <TextField
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              sx={{ mt: 1 }}
              placeholder="Recipe title"
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
            <Typography sx={{ mb: -3 }}>Ingredients</Typography>
            <ChosenIngredientsList />
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="space-evenly"
              sx={{ mt: 2, gap: "10px" }}
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
          <CustomButton
            disabled={isFormValid ? false : true}
            onClick={handleSubmit}
            sx={{ mt: 3 }}
            variant="contained"
          >
            {isLoading ? (
              <CircularProgress />
            ) : isEdit ? (
              "Edit Recipe"
            ) : (
              "Add Recipe"
            )}
          </CustomButton>
          <Snackbar
            open={showSuccess}
            autoHideDuration={5000}
            onClose={() => dispatch(setShowSuccess(false))}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => dispatch(setShowSuccess(false))}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={showError}
            autoHideDuration={5000}
            onClose={() => dispatch(setShowError(false))}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => dispatch(setShowError(false))}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errMsg}
            </Alert>
          </Snackbar>
        </Stack>
      </form>
    </section>
  );
};

export default RecipeForm;
