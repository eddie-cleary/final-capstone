import { useState } from "react";
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
  const [servings, setServings] = useState();

  const addRecipeObj = {
    id: recipe.id,
    title: recipe.title,
    servings,
  };

  const handleAddRecipe = () => {
    if (!servings) {
      return;
    }
    dispatch(addRecipeToMeal(addRecipeObj));
  };

  return (
    <Button onClick={handleAddRecipe}>
      <Card elevation={5} sx={{ height: 340, width: 330 }}>
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
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
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
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </Card>
    </Button>
  );
};

export default RecipeCardAddToMeal;
