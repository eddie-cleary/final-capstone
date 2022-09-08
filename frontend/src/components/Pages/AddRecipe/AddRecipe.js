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
import { useSelector } from "react-redux";
import ImgDropzone from "./ImgDropzone";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const AddRecipe = () => {
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState("");

  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isRecipeIngredientsValid, setIsRecipeIngredientsValid] =
    useState(false);

  const [steps, setSteps] = useState([{ info: "" }]);
  const [isStepsValid, setIsStepsValid] = useState(false);

  const [imgId, setimgId] = useState("");

  const [liked, setLiked] = useState(true);

  const [fileInput, setFileInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [info, setInfo] = useState({
    servings: 1,
    prepTime: "",
    cookTime: "",
  });

  const [postObject, setPostObject] = useState({
    title,
    description,
    servings: info.servings,
    prepTime: info.prepTime,
    cookTime: info.cookTime,
    imgId,
    recipeIngredients,
    steps,
    liked,
  });

  const postToServer = () => {
    console.log("post object ", postObject);

    axios
      .post(baseUrl + `/recipes/add`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        setErrMsg(err);
        openError();
      })
      .then(() => {
        setIsLoading(false);
        clearFormState();
        setSuccessMsg("Recipe Added!");
        openSuccess();
      });
  };

  const clearFormState = () => {
    setTitle("");
    setDescription("");
    setRecipeIngredients([]);
    setSteps([{ info: "" }]);
    setimgId("");
    setLiked(true);
    setFileInput("");
    setImageUploading(false);
    setValidForm(false);
    setInfo({
      servings: 1,
      prepTime: "",
      cookTime: "",
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (fileInput) {
      uploadImage(fileInput);
      return;
    }
    postToServer();
  };

  const uploadImage = async (fileInput) => {
    const API_KEY = "362171829159456";
    const CLOUD_NAME = "djoe";

    setImageUploading(true);

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

    setimgId(cloudinaryResponse.data.public_id);
  };

  const openSuccess = () => {
    setShowSuccess(true);
  };

  const closeSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  const openError = () => {
    setShowError(true);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  useEffect(() => {
    if (imgId) {
      console.log("img id exists ", imgId);
      setImageUploading(false);
      postToServer();
    }
  }, [imageUploading, imgId]);

  useEffect(() => {
    const result = steps.every((step) => {
      if (step.info.length > 2) {
        return true;
      }
      return false;
    });
    setIsStepsValid(result);
  }, [steps]);

  useEffect(() => {
    const result = recipeIngredients.every((ingredient) => {
      if (ingredient.quantity) {
        return true;
      }
      return false;
    });
    setIsRecipeIngredientsValid(result);
  }, [recipeIngredients]);

  useEffect(() => {});

  useEffect(() => {
    if (
      postObject.title.length > 2 &&
      postObject.description.length > 2 &&
      isStepsValid &&
      isRecipeIngredientsValid &&
      postObject.prepTime.length > 0 &&
      postObject.cookTime.length > 0
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [postObject]);

  useEffect(() => {
    console.log("updating post object");
    setPostObject({
      title,
      description,
      servings: info.servings,
      prepTime: info.prepTime,
      cookTime: info.cookTime,
      imgId,
      recipeIngredients,
      steps,
      liked,
    });
  }, [title, description, recipeIngredients, steps, info, liked, imgId]);

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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography>Ingredients</Typography>
              <ChosenIngredientsList
                recipeIngredients={recipeIngredients}
                setRecipeIngredients={setRecipeIngredients}
              />
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-evenly"
                sx={{ mt: 2, gap: "10px" }}
              >
                <IngredientSelect
                  recipeIngredients={recipeIngredients}
                  setRecipeIngredients={setRecipeIngredients}
                />
              </Stack>
            </Box>
            <Box sx={{ mt: 3 }}>
              <StepsList steps={steps} setSteps={setSteps} />
            </Box>
            <RecipeInfo info={info} setInfo={setInfo} />
            <Box sx={{ mt: 5 }}>
              {" "}
              <ImgDropzone setFileInput={setFileInput} setimgId={setimgId} />
            </Box>
            <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
              <FormControlLabel
                sx={{ textAlign: "center" }}
                control={
                  <Checkbox
                    checked={liked}
                    icon={<FavoriteBorder color="warning" />}
                    checkedIcon={<Favorite color="warning" />}
                    onChange={(e) => setLiked(e.target.checked)}
                  />
                }
                label="Mark as favorite?"
              />
            </Stack>
            <Button
              disabled={validForm ? false : true}
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              variant="contained"
            >
              {isLoading ? <CircularProgress /> : "Add Recipe"}
            </Button>
            <Snackbar
              open={showSuccess}
              autoHideDuration={5000}
              onClose={closeSuccess}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={closeSuccess}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMsg}
              </Alert>
            </Snackbar>
            <Snackbar
              open={showError}
              autoHideDuration={5000}
              onClose={closeError}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={closeError}
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
