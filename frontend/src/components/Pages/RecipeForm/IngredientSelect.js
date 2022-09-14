import { Autocomplete, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import MeasurementSelect from "./MeasurementSelect";
import { calculateQuantity } from "../../../shared/conversions";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setIngredient,
  setFraction,
  setIsFormValid,
  setMeasurement,
  setIsIngredientsLoading,
  setNumber,
  setIsIngredientValid,
  setAllIngredients,
} from "../../../redux/features/forms/addrecipe/addRecipeIngredientSlice.js";
import { setRecipeIngredients } from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";
import {
  setErrMsg,
  setShowError,
  showErrorMessage,
} from "../../../redux/features/forms/addrecipe/addRecipeFormSlice";
import { CustomButton } from "../../..";

const IngredientSelect = () => {
  const token = useSelector((state) => state.auth.token);

  const ingredient = useSelector(
    (state) => state.addRecipeIngredient.ingredient
  );
  const recipeIngredients = useSelector(
    (state) => state.addRecipeData.recipeIngredients
  );
  const number = useSelector((state) => state.addRecipeIngredient.number);
  const fraction = useSelector((state) => state.addRecipeIngredient.fraction);
  const measurement = useSelector(
    (state) => state.addRecipeIngredient.measurement
  );
  const isIngredientValid = useSelector(
    (state) => state.addRecipeIngredient.isIngredientValid
  );
  const isFormValid = useSelector(
    (state) => state.addRecipeIngredient.isFormValid
  );
  const allIngredients = useSelector(
    (state) => state.addRecipeIngredient.allIngredients
  );
  const isIngredientsLoading = useSelector(
    (state) => state.addRecipeIngredient.isIngredientsLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(baseUrl + `/ingredient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setAllIngredients(res.data));
      })
      .catch((err) => {
        dispatch(setErrMsg("Error retrieving ingredients. "));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsIngredientsLoading(false));
      });
  }, []);

  useEffect(() => {
    if (isIngredientValid && (number > 0 || fraction > 0) && measurement) {
      console.log(isIngredientValid);
      console.log(number > 0);
      console.log(fraction > 0);
      console.log(measurement);
      dispatch(setIsFormValid(true));
      return;
    }
    dispatch(setIsFormValid(false));
  }, [isIngredientValid, measurement, number, fraction]);

  const handleAddIngredient = () => {
    const currQuantity = calculateQuantity(number, fraction, measurement);
    const newList = [...recipeIngredients];
    let newIngredient = newList[newList.length];
    newIngredient = {
      name: ingredient.name,
      quantity: currQuantity,
      liquid: ingredient.liquid,
    };
    newList.push(newIngredient);
    dispatch(setRecipeIngredients(newList));
    dispatch(setNumber(""));
    dispatch(setFraction(""));
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="ingredient-select"
        sx={{ flexGrow: 1 }}
        loading={isIngredientsLoading}
        options={allIngredients}
        noOptionsText="No ingredients"
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(e) => {
          const choice = e.target.textContent;
          allIngredients.every((validIngredient) => {
            if (choice === validIngredient.name) {
              dispatch(setMeasurement(""));
              dispatch(setIngredient(validIngredient));
              dispatch(setIsIngredientValid(true));
              return false;
            }
            dispatch(setMeasurement(""));
            dispatch(setIngredient(""));
            dispatch(setIsIngredientValid(false));
            return true;
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choose ingredient" />
        )}
      />
      <MeasurementSelect />
      <CustomButton
        onClick={handleAddIngredient}
        sx={{ height: "58px" }}
        variant="contained"
        disabled={isFormValid ? false : true}
      >
        <Add fontSize="small" />
      </CustomButton>
    </>
  );
};

export default IngredientSelect;
