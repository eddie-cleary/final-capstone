import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress,
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
import ImageUpload from "./ImageUpload";
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

  useEffect(() => {
    console.log("wow it worked " + imgId);
  }, [imgId]);

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

  const [validForm, setValidForm] = useState(false);

  const handleSubmit = async () => {
    console.log(postObject);
    setIsLoading(true);
    // await handleImageUpload(fileInput);

    // axios
    //   .post(baseUrl + `/recipes/add`, postObject, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .then(() => {
    //     setIsLoading(false);
    //   });
  };

  const handleImageUpload = async (fileInput) => {
    const API_KEY = "362171829159456";
    const CLOUD_NAME = "djoe";

    const signatureResponse = await axios.get(baseUrl + "/get-signature", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const signature = signatureResponse.data.signature;
    const timestamp = signatureResponse.data.timestamp;

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
            <RecipeInfo
              info={info}
              setInfo={setInfo}
              favorite={liked}
              setFavorite={setLiked}
            />
            <ImageUpload setFileInput={setFileInput} setimgId={setimgId} />
            <Button
              disabled={validForm ? false : true}
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              variant="contained"
            >
              {isLoading ? <CircularProgress /> : "Add Recipe"}
            </Button>
          </Stack>
        </form>
      </section>
    </Layout>
  );
};

export default AddRecipe;
