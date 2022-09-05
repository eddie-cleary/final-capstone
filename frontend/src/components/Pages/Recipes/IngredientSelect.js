import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";

const IngredientSelect = ({ setIngredientList, ingredientList }) => {
  //Todo: make this a fetch call later
  const allIngredients = ["Garlic", "Salt"];

  const defaultIngredient = { name: "", quantity: "1", measurement: "1" };

  const [chosenIngredient, setChosenIngredient] = useState("");
  const [validIngredient, setValidIngredient] = useState(false);

  const addIngredientToList = () => {
    const newList = [...ingredientList];
    let newIngredient = newList[newList.length];
    newIngredient = { ...defaultIngredient, name: chosenIngredient };
    newList.push(newIngredient);
    setIngredientList(newList);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="ingredient-select"
        sx={{ flexGrow: 1 }}
        options={allIngredients}
        onChange={(e) => {
          const choice = e.target.textContent;
          allIngredients.every((validIngredient) => {
            if (choice === validIngredient) {
              setChosenIngredient(choice);
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
