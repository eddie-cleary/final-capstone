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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const RecipeInfo = ({ info, setInfo, favorite, setFavorite }) => {
  return (
    <>
      <Stack direction="row" alignItems="flex-end" sx={{ mt: 4 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="servings-label">Servings</InputLabel>
            <Select
              labelId="servings-label"
              id="servings"
              value={info.servings}
              label="Servings"
              onChange={(e) => setInfo({ ...info, servings: e.target.value })}
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
            id="preptime"
            value={info.preptime}
            required
            placeholder="Prep time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInfo({ ...info, preptime: e.target.value });
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
        <Box>
          <OutlinedInput
            id="cooktime"
            value={info.cooktime}
            required
            placeholder="Cook Time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInfo({ ...info, cooktime: e.target.value });
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
      </Stack>
      <Stack sx={{ mt: 5 }} direction="row" justifyContent="center">
        <FormControlLabel
          sx={{ textAlign: "center" }}
          control={
            <Checkbox
              checked={favorite}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              onChange={(e) => setFavorite(e.target.checked)}
            />
          }
          label="Mark as favorite?"
        />
      </Stack>
    </>
  );
};

export default RecipeInfo;
