import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Button,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addRecipeToMeal } from "../../../../redux/features/forms/mealplan/mealPlanDataSlice";

const RecipeCardAddToMeal = ({ recipe }) => {
  const dispatch = useDispatch();
  const [servings, setServings] = useState("");
  const [validForm, setValidForm] = useState(false);

  const addRecipeObj = {
    id: null,
    meal_id: null,
    recipe: {
      id: recipe.id,
      title: recipe.title,
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
    <Card elevation={5} sx={{ height: 340, width: 330, mt: 3 }}>
      <CardHeader title={recipe.title} />
      <CardMedia
        component="img"
        height="194"
        image={
          recipe.imgId &&
          `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
        }
        alt={recipe.title}
      />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl sx={{ minWidth: "120px" }}>
          <InputLabel
            sx={{ textTransform: "capitalize" }}
            id="servings-select-label"
          >
            Servings
          </InputLabel>
          <Select
            labelId="servings-select-label"
            id="servings-select"
            value={servings}
            label="Servings"
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
          variant="contained"
        >
          Add Recipe
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCardAddToMeal;
