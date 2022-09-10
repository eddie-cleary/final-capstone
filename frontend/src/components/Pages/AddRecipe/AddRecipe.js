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

const AddRecipe = () => {
  const token = useSelector((state) => state.auth.token);
  const title = useSelector((state) => state.addRecipeData.title);
  const description = useSelector((state) => state.addRecipeData.description);

  const steps = useSelector((state) => state.addRecipeData.steps);
  const recipeIngredients = useSelector(
    (state) => state.addRecipeData.recipeIngredients
  );
  const liked = useSelector((state) => state.addRecipeData.liked);
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
    console.log("the post object ", postObject);
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
        console.log("the error ", err);
        // dispatch(setErrMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsLoading(false));
        dispatch(resetState());
      });
  };

  const handleSubmit = async () => {
    console.log("handling submit");
    dispatch(setIsLoading(true));
    if (fileInput) {
      console.log("file input found");
      uploadImage(fileInput);
      return;
    }
    postToServer();
  };

  const uploadImage = async (fileInput) => {
    console.log("uploading image");
    const API_KEY = "362171829159456";
    const CLOUD_NAME = "djoe";

    dispatch(setIsImageUploading(true));

    const signatureResponse = await axios.get(baseUrl + "/get-signature", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("sig response ", signatureResponse);

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

    console.log("setting image id to ", cloudinaryResponse.data.public_id);
    dispatch(setImgId(cloudinaryResponse.data.public_id));
  };

  useEffect(() => {
    console.log("post object image id is updated");
    if (isImageUploading) {
      dispatch(setIsImageUploading(false));
      console.log("posting image to server");
      postToServer();
    }
  }, [postObject.imgId]);

  useEffect(() => {
    const result = steps.every((step) => {
      if (step.info.length > 2) {
        return true;
      }
      return false;
    });
    dispatch(setIsStepsValid(result));
  }, [steps]);

  useEffect(() => {
    const result = recipeIngredients.every((ingredient) => {
      if (ingredient.quantity) {
        return true;
      }
      return false;
    });
    dispatch(setIsRecipeIngredientsValid(result));
  }, [recipeIngredients]);

  useEffect(() => {
    if (
      postObject.title.length > 2 &&
      postObject.description.length > 2 &&
      isStepsValid &&
      isRecipeIngredientsValid &&
      postObject.prepTime.length > 0 &&
      postObject.cookTime.length > 0
    ) {
      dispatch(setIsFormValid(true));
    } else {
      dispatch(setIsFormValid(false));
    }
  }, [postObject]);

  return (
    <Layout>
      <section>
        <form>
          <Stack sx={{ maxWidth: "550px" }}>
            <Typography variant="h5">Add Recipe</Typography>
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
            <Box sx={{ mt: 3 }}>
              <Typography>Ingredients</Typography>
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
              <ImgDropzone fileInput={fileInput} setFileInput={setFileInput} />
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
              sx={{ mt: 3 }}
              variant="contained"
            >
              {isLoading ? <CircularProgress /> : "Add Recipe"}
            </Button>
            <Snackbar
              open={showSuccess}
              autoHideDuration={5000}
              onClose={() => setShowSuccess(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={(e) => setShowSuccess(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMsg}
              </Alert>
            </Snackbar>
            <Snackbar
              open={showError}
              autoHideDuration={5000}
              onClose={() => setShowError(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={() => setShowError(false)}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errMsg}
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </section>
    </Layout>
  );
};

export default AddRecipe;
