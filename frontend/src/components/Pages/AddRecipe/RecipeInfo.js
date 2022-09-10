import React from "react";
import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setServings,
  setPrepTime,
  setCookTime,
} from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";

const RecipeInfo = () => {
  const servings = useSelector((state) => state.addRecipeData.servings);
  const prepTime = useSelector((state) => state.addRecipeData.prepTime);
  const cookTime = useSelector((state) => state.addRecipeData.cookTime);
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" alignItems="flex-end" sx={{ mt: 4 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="servings-label">Servings</InputLabel>
            <Select
              labelId="servings-label"
              id="servings"
              value={servings}
              label="Servings"
              onChange={(e) => dispatch(setServings(e.target.value))}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mx: 3 }}>
          <OutlinedInput
            id="prepTime"
            value={prepTime}
            required
            placeholder="Prep time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                dispatch(setPrepTime(e.target.value));
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
        <Box>
          <OutlinedInput
            id="cookTime"
            value={cookTime}
            required
            placeholder="Cook Time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                dispatch(setCookTime(e.target.value));
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
      </Stack>
    </>
  );
};

export default RecipeInfo;
