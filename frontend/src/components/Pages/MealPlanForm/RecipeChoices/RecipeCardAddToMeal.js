import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addRecipeToMeal } from "../../../../redux/features/forms/mealplan/mealPlanDataSlice";

const RecipeCardAddToMeal = ({ recipe }) => {
  const dispatch = useDispatch();
  const [servings, setServings] = useState("");
  const [validForm, setValidForm] = useState(false);
  const theme = useTheme();

  const addRecipeObj = {
    recipe: {
      id: recipe.id,
      name: recipe.name,
    },
    servings,
  };

  useEffect(() => {
    if (servings > 0) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [servings]);

  const handleAddRecipe = () => {
    if (!servings) {
      return;
    }
    dispatch(addRecipeToMeal(addRecipeObj));
  };

  return (
    <Box
      component="article"
      sx={{
        m: 2,
        height: 300,
        width: 340,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.text.main}`,
        p: 0,
        overflow: "hidden",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Box
          component="img"
          src={
            recipe.imgId &&
            `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
          }
          alt={recipe.name}
          sx={{ height: 150, objectFit: "cover", objectPosition: "center" }}
        />
        <Box component="div" sx={{ height: "100%" }}>
          <Stack
            direction="row"
            sx={{ height: "100%", p: 1.5 }}
            justifyContent="space-between"
          >
            <Stack justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography sx={{ textAlign: "center" }} variant="titleSmall">
                {recipe.name.length > 50
                  ? recipe.name.substring(0, 70) + "..."
                  : recipe.name}
              </Typography>
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignSelf="flex-end"
                sx={{ width: "100%", mb: "5px", height: "50px" }}
              >
                <FormControl sx={{ minWidth: "120px" }}>
                  <InputLabel
                    sx={{
                      textTransform: "capitalize",
                      marginTop: "-1px",
                      fontSize: "17px",
                    }}
                    id="servings-select-label"
                  >
                    Servings
                  </InputLabel>
                  <Select
                    labelId="servings-select-label"
                    id="servings-select"
                    value={servings}
                    label="Servings"
                    sx={{ height: "103%", width: "130px", mr: 2 }}
                    onChange={(e) => setServings(e.target.value)}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  disabled={validForm ? false : true}
                  onClick={handleAddRecipe}
                  variant="btn"
                  sx={{ textTransform: "capitalize" }}
                >
                  Add Recipe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default RecipeCardAddToMeal;
