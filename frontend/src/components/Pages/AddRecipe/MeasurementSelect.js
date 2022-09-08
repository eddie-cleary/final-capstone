import React, { useEffect } from "react";
import { MenuItem, Stack, InputLabel, Select } from "@mui/material";
import { fractionOptions } from "../../../shared/quantityOptions";

const MeasurementSelect = ({
  currentIngredient,
  currentNumber,
  setCurrentNumber,
  currentFraction,
  setCurrentFraction,
  currentMeasurement,
  setCurrentMeasurement,
}) => {
  const measurementOptions = currentIngredient.isLiquid
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
    setCurrentMeasurement(currentIngredient.isLiquid ? "Ounce" : "Teaspoon");
  }, [currentIngredient]);

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
    <Stack direction="row" sx={{ gap: "10px" }}>
      <Stack>
        <InputLabel id="number">Number</InputLabel>
        <Select
          labelId="number"
          id="number-select"
          label="Number"
          value={currentNumber}
          onChange={(e) => {
            console.log("setting current number to " + e.target.value);
            setCurrentNumber(e.target.value);
          }}
        >
          {numberSelectors}
        </Select>
      </Stack>
      <Stack>
        <InputLabel id="fraction">Fraction</InputLabel>
        <Select
          labelId="fraction"
          id="fraction-select"
          label="Fraction"
          value={currentFraction}
          onChange={(e) => {
            console.log("setting current fraction to " + e.target.value);
            setCurrentFraction(e.target.value);
          }}
        >
          {fractionSelectors}
        </Select>
      </Stack>
      <Stack>
        <InputLabel id="measurement">Measurement</InputLabel>
        <Select
          labelId="measurement"
          id="measurement-select"
          label="Measurement"
          value={currentMeasurement}
          onChange={(e) => {
            console.log("setting current measurement to " + e.target.value);
            setCurrentMeasurement(e.target.value);
          }}
        >
          {measurementOptions}
        </Select>
      </Stack>
    </Stack>
  );
};

export default MeasurementSelect;
