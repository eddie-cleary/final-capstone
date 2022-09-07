import React, { useState, useEffect } from "react";
import {
  Stack,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { quantityOptions } from "../../../shared/quantityOptions";

const ChosenIngredient = ({
  index,
  data,
  recipeIngredients,
  setRecipeIngredients,
}) => {
  const [quantitiesArray, setQuantitiesArray] = useState([]);
  const [currentMeasurement, setCurrentMeasurement] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const currentIngredient = recipeIngredients[index];

  const deleteChosenIngredient = () => {
    const newList = recipeIngredients.filter(
      (ingredient, idx) => idx !== index
    );
    setRecipeIngredients(newList);
  };

  useEffect(() => {
    const newQuantitiesArray = quantityOptions(currentMeasurement);
    setQuantitiesArray(newQuantitiesArray);
  }, [currentMeasurement]);

  useEffect(() => {
    currentIngredient.quantity = currentQuantity;
    const newList = [...recipeIngredients];
    newList[index] = currentIngredient;
    setRecipeIngredients(newList);
  }, [currentQuantity, currentIngredient]);

  const MeasurementOptions = ({ isLiquid }) => {
    const measurementOptions = isLiquid
      ? [
          <MenuItem key="48" value="Ounce">
            Ounce
          </MenuItem>,
          <MenuItem key="1536" value="Quart">
            Quart
          </MenuItem>,
          <MenuItem key="768" value="Pint">
            Pint
          </MenuItem>,
        ]
      : [
          <MenuItem key="8" value="Teaspoon">
            Teaspoon
          </MenuItem>,
          <MenuItem key="24" value="Tablespoon">
            Tablespoon
          </MenuItem>,
          <MenuItem key="384" value="Cup">
            Cup
          </MenuItem>,
        ];

    return (
      <Stack direction="row">
        <Stack>
          <InputLabel id="measurement">Measurement</InputLabel>
          <Select
            labelId="measurement"
            id="measurement-select"
            label="Measurement"
            value={currentMeasurement}
            onChange={(e) => {
              // updateSelectableQuantities(e.target.value);
              setCurrentQuantity("");
              setCurrentMeasurement(e.target.value);
            }}
          >
            {measurementOptions}
          </Select>
        </Stack>
        <Stack sx={{ mx: 2 }}>
          <InputLabel id="quantity">Quantity</InputLabel>
          <Select
            labelId="quantity"
            id="quantity-select"
            label="Quantity"
            value={currentQuantity}
            onChange={(e) => {
              const quantitySelected = e.target.value;
              const currIngredient = recipeIngredients[index];
              currIngredient.quantity = quantitySelected;
              const newList = [...recipeIngredients];
              newList[index] = currIngredient;
              setRecipeIngredients(newList);
              setCurrentQuantity(quantitySelected);
            }}
          >
            {quantitiesArray.map((quantity, index) => {
              return (
                <MenuItem key={index} value={quantity.value}>
                  {quantity.label}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <InputLabel>&nbsp;</InputLabel>
        <Typography variant="h6">{data.name}</Typography>
      </Stack>
      <MeasurementOptions isLiquid={data.isLiquid} />
      <Button
        onClick={deleteChosenIngredient}
        variant="outlined"
        sx={{ height: "56px", ml: 2, alignSelf: "flex-end" }}
      >
        -
      </Button>
    </Stack>
  );
};

export default ChosenIngredient;
