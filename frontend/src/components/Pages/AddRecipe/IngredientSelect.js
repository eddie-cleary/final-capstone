import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import MeasurementSelect from "./MeasurementSelect";
import { calculateQuantity } from "../../../shared/conversions";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";

const IngredientSelect = ({
  setErrMsg,
  setRecipeIngredients,
  recipeIngredients,
}) => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/ingredient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllIngredients(res.data);
      })
      .catch((err) => {
        setErrMsg("Error retrieving ingredients. ");
      })
      .then(() => {
        setLoadingIngredients(false);
      });
  }, []);

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentFraction, setCurrentFraction] = useState(0);
  const [currentMeasurement, setCurrentMeasurement] = useState("");
  const [validIngredient, setValidIngredient] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  const handleAddIngredient = () => {
    const currQuantity = calculateQuantity(
      currentNumber,
      currentFraction,
      currentMeasurement
    );
    const newList = [...recipeIngredients];
    let newIngredient = newList[newList.length];
    newIngredient = {
      name: currentIngredient.name,
      quantity: currQuantity,
      liquid: currentIngredient.liquid,
    };
    newList.push(newIngredient);
    setRecipeIngredients(newList);
    setCurrentIngredient("");
    setCurrentNumber("");
    setCurrentFraction("");
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
        loading={loadingIngredients}
        options={allIngredients}
        noOptionsText="Failed to load."
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
