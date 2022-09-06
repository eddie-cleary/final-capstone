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
import ChosenIngredients from "./ChosenIngredients";
import RecipeInfo from "./RecipeInfo";

const AddRecipe = () => {
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState("");

  const [ingredientList, setIngredientList] = useState([]);

  const [stepsList, setStepsList] = useState([""]);

  const [favorite, setFavorite] = useState(true);

  const [info, setInfo] = useState({
    servings: 1,
    preptime: "",
    cooktime: "",
  });

  const [postObject, setPostObject] = useState({
    title,
    description,
    ingredientList,
    stepsList,
    info,
    favorite,
  });

  const [validForm, setValidForm] = useState(false);

  const handleSubmit = () => {};

  useEffect(() => {
    if (
      postObject.title.length > 2 &&
      postObject.description.length > 2 &&
      postObject.ingredientList.length > 0 &&
      postObject.stepsList[0].length > 2 &&
      postObject.info.preptime.length > 0 &&
      postObject.info.cooktime.length > 0
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
      ingredientList,
      stepsList,
      info,
      favorite,
    });
  }, [title, description, ingredientList, stepsList, info, favorite]);

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
              <ChosenIngredients
                ingredientList={ingredientList}
                setIngredientList={setIngredientList}
              />
              <Stack direction="row" sx={{ mt: 2 }}>
                <IngredientSelect
                  ingredientList={ingredientList}
                  setIngredientList={setIngredientList}
                />
              </Stack>
            </Box>
            <Box sx={{ mt: 3 }}>
              <StepsList stepsList={stepsList} setStepsList={setStepsList} />
            </Box>
            <RecipeInfo
              info={info}
              setInfo={setInfo}
              favorite={favorite}
              setFavorite={setFavorite}
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
