import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button,
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

  const [imageUpload, setImageUpload] = useState("");

  const [liked, setLiked] = useState(true);

  useEffect(() => {
    console.log("wow it worked " + imageUpload);
  }, [imageUpload]);

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
    recipeIngredients,
    steps,
    liked,
  });

  const [validForm, setValidForm] = useState(false);

  const handleSubmit = async () => {
    console.log(postObject);

    axios
      .post(baseUrl + `/recipes/add`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
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
      recipeIngredients,
      steps,
      liked,
    });
  }, [title, description, recipeIngredients, steps, info, liked]);

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
              <Stack direction="row" sx={{ mt: 2 }}>
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
            <ImageUpload
              imageUpload={ImageUpload}
              setImageUpload={setImageUpload}
            />
            <Button
              disabled={validForm ? false : true}
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Add Recipe
            </Button>
          </Stack>
        </form>
      </section>
    </Layout>
  );
};

export default AddRecipe;
