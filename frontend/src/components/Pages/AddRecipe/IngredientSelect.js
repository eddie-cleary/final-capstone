import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";

const IngredientSelect = ({ setRecipeIngredients, recipeIngredients }) => {
  //Todo: make this a fetch call later
  const allIngredients = [
    { name: "Garlic", isLiquid: false },
    { name: "Water", isLiquid: true },
  ];

  const defaultIngredient = { name: "", quantity: "" };

  const [chosenIngredient, setChosenIngredient] = useState("");
  const [validIngredient, setValidIngredient] = useState(false);

  const addIngredientToList = () => {
    const newList = [...recipeIngredients];
    let newIngredient = newList[newList.length];
    newIngredient = {
      ...defaultIngredient,
      name: chosenIngredient.name,
      isLiquid: chosenIngredient.isLiquid,
    };
    newList.push(newIngredient);
    setRecipeIngredients(newList);
  };

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
              setChosenIngredient(validIngredient);
              setValidIngredient(true);
              // end loop
              return false;
            }
            setChosenIngredient("");
            setValidIngredient(false);
            // continue loop
            return true;
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choose ingredient" />
        )}
      />
      <Button
        onClick={addIngredientToList}
        sx={{ ml: 2 }}
        variant="outlined"
        disabled={validIngredient ? false : true}
      >
        <Add fontSize="small" />
      </Button>
    </>
  );
};

export default IngredientSelect;
