import React from "react";
import {
  Stack,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const Ingredient = ({ index, data, ingredientList, setIngredientList }) => {
  const deleteMe = () => {
    const newList = ingredientList.filter((ingredient, idx) => idx !== index);
    setIngredientList(newList);
  };

  return (
    <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <InputLabel>&nbsp;</InputLabel>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {data.name}
        </Typography>
      </Stack>
      <Stack sx={{ mx: 2 }}>
        <InputLabel id="quantity">Quantity</InputLabel>
        <Select
          labelId="quantity"
          id="quantity-select"
          label="Quantity"
          value={data.quantity}
          onChange={(e) => {
            const currObj = ingredientList[index];
            currObj.quantity = e.target.value;
            const newList = [...ingredientList];
            newList[index] = currObj;
            setIngredientList(newList);
          }}
        >
          <MenuItem value={1 / 8}>1/8</MenuItem>
          <MenuItem value={1 / 4}>1/4</MenuItem>
          <MenuItem value={1 / 3}>1/3</MenuItem>
          <MenuItem value={1 / 2}>1/2</MenuItem>
          <MenuItem value={2 / 3}>2/3</MenuItem>
          <MenuItem value={3 / 4}>3/4</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </Stack>
      <Stack>
        <InputLabel id="measurement">Measurement</InputLabel>
        <Select
          labelId="measurement"
          id="measurement-select"
          label="Measurement"
          value={data.measurement}
          onChange={(e) => {
            const currObj = ingredientList[index];
            currObj.measurement = e.target.value;
            const newList = [...ingredientList];
            newList[index] = currObj;
            setIngredientList(newList);
          }}
        >
          <MenuItem value="1">Teaspoon</MenuItem>
          <MenuItem value="2">Tablespoon</MenuItem>
          <MenuItem value="3">Cup</MenuItem>
          <MenuItem value="4">Pound</MenuItem>
          <MenuItem value="5">Quart</MenuItem>
          <MenuItem value="6">Pint</MenuItem>
        </Select>
      </Stack>
      <Button
        onClick={deleteMe}
        variant="outlined"
        sx={{ height: "56px", ml: 2, alignSelf: "flex-end" }}
      >
        -
      </Button>
    </Stack>
  );
};

export default Ingredient;
