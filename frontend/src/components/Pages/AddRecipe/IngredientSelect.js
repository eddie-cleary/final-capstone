import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import MeasurementSelect from "./MeasurementSelect";
import {
  convertToMeasurement,
  calculateQuantity,
} from "../../../shared/conversions";

const IngredientSelect = ({ setRecipeIngredients, recipeIngredients }) => {
  //Todo: make this a fetch call later
  const allIngredients = [
    { name: "Garlic", isLiquid: false },
    { name: "Water", isLiquid: true },
  ];

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentFraction, setCurrentFraction] = useState(0);
  const [currentMeasurement, setCurrentMeasurement] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [validIngredient, setValidIngredient] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const handleAddIngredient = () => {
    const currQuantity = calculateQuantity(
      currentNumber,
      currentFraction,
      currentMeasurement
    );
    console.log("current quantity " + currQuantity);
    const string = convertToMeasurement(
      currQuantity,
      currentIngredient.isLiquid
    );
    console.log("the string " + string);
    // convertToMeasurement()
    const newList = [...recipeIngredients];
    let newIngredient = newList[newList.length];
    newIngredient = {
      name: currentIngredient.name,
      quantity: currentQuantity,
      isLiquid: currentIngredient.isLiquid,
    };
    newList.push(newIngredient);
    setRecipeIngredients(newList);
  };

  useEffect(() => {
    if (
      validIngredient &&
      (currentNumber > 0 || currentFraction > 0) &&
      currentMeasurement
    ) {
      setValidForm(true);
      return;
    }
    setValidForm(false);
  }, [validIngredient, currentMeasurement, currentNumber, currentFraction]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="ingredient-select"
        sx={{ flexGrow: 1 }}
        options={allIngredients}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(e) => {
          const choice = e.target.textContent;
          allIngredients.every((validIngredient) => {
            if (choice === validIngredient.name) {
              setCurrentMeasurement("");
              setCurrentIngredient(validIngredient);
              setValidIngredient(true);
              return false;
            }
            setCurrentMeasurement("");
            setCurrentIngredient("");
            setValidIngredient(false);
            return true;
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choose ingredient" />
        )}
      />
      <MeasurementSelect
        currentIngredient={currentIngredient}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
        currentFraction={currentFraction}
        setCurrentFraction={setCurrentFraction}
        currentMeasurement={currentMeasurement}
        setCurrentMeasurement={setCurrentMeasurement}
      />
      <Button
        onClick={handleAddIngredient}
        sx={{ height: "58px" }}
        variant="outlined"
        disabled={validForm ? false : true}
      >
        <Add fontSize="small" />
      </Button>
    </>
  );
};

export default IngredientSelect;
