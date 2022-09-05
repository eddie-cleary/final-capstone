import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import Layout from "../../Layout/Layout";
import Ingredient from "./Ingredient";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const ingredient = { name: "", quantity: "1", measurement: "1" };
  const [ingredientList, setIngredientList] = useState([]);
  const [chosenIngredient, setChosenIngredient] = useState("");
  const [validIngredient, setValidIngredient] = useState(false);

  useEffect(() => {
    console.log(chosenIngredient);
  }, [chosenIngredient]);

  const addIngredientToList = () => {
    const newList = [...ingredientList];
    let newIngredient = newList[newList.length];
    newIngredient = { ...ingredient, name: chosenIngredient };
    newList.push(newIngredient);
    setIngredientList(newList);
  };

  const ingredients = ingredientList.map((ingredient, index) => {
    return (
      <Ingredient
        index={index}
        data={ingredient}
        ingredientList={ingredientList}
        setIngredientList={setIngredientList}
        key={index}
      />
    );
  });

  const allIngredients = ["Garlic", "Salt"];

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
              <Stack>{ingredients}</Stack>
              <Stack direction="row" sx={{ mt: 2 }}>
                <Autocomplete
                  disablePortal
                  id="ingredient-select"
                  sx={{ flexGrow: 1 }}
                  options={allIngredients}
                  onChange={(e) => {
                    console.log("change detected");
                    const choice = e.target.textContent;
                    console.log("choice is " + choice);
                    console.log("detected change " + choice);
                    allIngredients.every((validIngredient) => {
                      if (choice === validIngredient) {
                        setChosenIngredient(choice);
                        setValidIngredient(true);
                        // end loop
                        return false;
                      }
                      setChosenIngredient("");
                      setValidIngredient(false);
                      // continue loop
                      return true;
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose ingredient" />
                  )}
                />
                <Button
                  onClick={addIngredientToList}
                  sx={{ ml: 2 }}
                  variant="outlined"
                  disabled={validIngredient ? false : true}
                >
                  +
                </Button>
              </Stack>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mt: 2 }}>Steps</Typography>
              <Box>
                <Stack direction="row" alignItems="stretch" sx={{ mt: 2 }}>
                  <InputLabel sx={{ mr: 2 }}>1</InputLabel>
                  <TextField sx={{ flexGrow: 1 }}></TextField>
                  <Button sx={{ ml: 2 }} variant="outlined" color="warning">
                    -
                  </Button>
                </Stack>
              </Box>
              <Stack direction="row" sx={{ mt: 2 }} justifyContent="center">
                <Button sx={{ px: 3 }} variant="contained">
                  Add Step
                </Button>
              </Stack>
            </Box>
            <Stack direction="row" sx={{ mt: 4 }}>
              <Box>
                <InputLabel id="servings">Servings</InputLabel>
                <TextField placeholder="Servings" id="servings"></TextField>
              </Box>
              <Box sx={{ mx: 3 }}>
                <InputLabel id="preptime">Prep Time</InputLabel>
                <TextField placeholder="Prep Time" id="preptime"></TextField>
              </Box>
              <Box>
                <InputLabel id="cooktime">Cook Time</InputLabel>
                <TextField placeholder="Cook Time" id="cooktime"></TextField>
              </Box>
            </Stack>
            <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
              <FormControlLabel
                sx={{ textAlign: "center" }}
                control={<Checkbox defaultChecked />}
                label="Mark as favorite?"
              />
            </Stack>
            <Button variant="contained">Add Recipe</Button>
          </Stack>
        </form>
      </section>
    </Layout>
  );
};

export default AddRecipe;
