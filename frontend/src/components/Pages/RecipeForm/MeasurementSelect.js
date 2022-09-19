import React, { useEffect } from "react";
import {
  MenuItem,
  Stack,
  InputLabel,
  Select,
  useMediaQuery,
} from "@mui/material";
import { fractionOptions } from "../../../shared/quantityOptions";
import { useSelector } from "react-redux";
import {
  setMeasurement,
  setNumber,
  setFraction,
} from "../../../redux/features/forms/addrecipe/addRecipeIngredientSlice";
import { useDispatch } from "react-redux";

const MeasurementSelect = () => {
  const ingredient = useSelector(
    (state) => state.addRecipeIngredient.ingredient
  );
  const fraction = useSelector((state) => state.addRecipeIngredient.fraction);
  const number = useSelector((state) => state.addRecipeIngredient.number);
  const measurement = useSelector(
    (state) => state.addRecipeIngredient.measurement
  );
  const dispatch = useDispatch();

  const matches = useMediaQuery("(max-width: 1080px)");

  const measurementOptions = ingredient.liquid
    ? [
        <MenuItem key="1" value="Ounce">
          Ounce
        </MenuItem>,
        <MenuItem key="2" value="Quart">
          Quart
        </MenuItem>,
        <MenuItem key="3" value="Pint">
          Pint
        </MenuItem>,
      ]
    : [
        <MenuItem key="4" value="Teaspoon">
          Teaspoon
        </MenuItem>,
        <MenuItem key="5" value="Tablespoon">
          Tablespoon
        </MenuItem>,
        <MenuItem key="6" value="Cup">
          Cup
        </MenuItem>,
      ];

  useEffect(() => {
    dispatch(setMeasurement(ingredient.liquid ? "Ounce" : "Teaspoon"));
  }, [ingredient, dispatch]);

  const numberSelectors = [];
  for (let i = 0; i < 11; i++) {
    numberSelectors.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  const fractionSelectors = [];
  fractionOptions.forEach((fraction) => {
    fractionSelectors.push(
      <MenuItem key={fraction.value} value={fraction.value}>
        {fraction.label}
      </MenuItem>
    );
  });

  return (
    <Stack direction="row" sx={{ gap: "10px", flexGrow: matches ? "1" : "" }}>
      <Stack sx={{ flexBasis: "initial", flexGrow: "1" }}>
        <InputLabel id="number">Number</InputLabel>
        <Select
          labelId="number"
          id="number-select"
          label="Number"
          value={number}
          onChange={(e) => {
            dispatch(setNumber(e.target.value));
          }}
        >
          {numberSelectors}
        </Select>
      </Stack>
      <Stack sx={{ flexBasis: "initial", flexGrow: matches ? "1" : "" }}>
        <InputLabel id="fraction">Fraction</InputLabel>
        <Select
          labelId="fraction"
          id="fraction-select"
          label="Fraction"
          value={fraction}
          onChange={(e) => {
            dispatch(setFraction(e.target.value));
          }}
        >
          {fractionSelectors}
        </Select>
      </Stack>
      <Stack
        sx={{
          flexGrow: matches ? "5" : "",
        }}
      >
        <InputLabel id="measurement">Measurement</InputLabel>
        <Select
          labelId="measurement"
          id="measurement-select"
          label="Measurement"
          value={measurement}
          onChange={(e) => {
            dispatch(setMeasurement(e.target.value));
          }}
        >
          {measurementOptions}
        </Select>
      </Stack>
    </Stack>
  );
};

export default MeasurementSelect;
