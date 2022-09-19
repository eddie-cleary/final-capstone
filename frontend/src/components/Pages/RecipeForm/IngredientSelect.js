import {
  Autocomplete,
  TextField,
  Tooltip,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { Add } from "@mui/icons-material";
import MeasurementSelect from "./MeasurementSelect";
import { calculateQuantity } from "../../../shared/conversions";
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
  setIngredientToCreate,
} from "../../../redux/features/forms/addrecipe/addRecipeIngredientSlice.js";
import { setRecipeIngredients } from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";
import {
  setShowError,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import AddIngredientOption from "./AddIngredientOption";

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

  const matches = useMediaQuery("(max-width: 1080px)");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/ingredient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setAllIngredients(res.data));
      })
      .catch((err) => {
        dispatch(setErrorMsg("Error retrieving ingredients. "));
        dispatch(setShowError(true));
      })
      .then(() => {
        dispatch(setIsIngredientsLoading(false));
      });
  }, [dispatch, token]);

  useEffect(() => {
    if (isIngredientValid && (number > 0 || fraction > 0) && measurement) {
      dispatch(setIsFormValid(true));
      return;
    }
    dispatch(setIsFormValid(false));
  }, [isIngredientValid, measurement, number, fraction, dispatch]);

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
        sx={{ flexGrow: 1, flexBasis: matches ? "100%" : "" }}
        loading={isIngredientsLoading}
        includeInputInList={true}
        options={allIngredients}
        noOptionsText={<AddIngredientOption />}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onInputChange={(e, v) => dispatch(setIngredientToCreate(v))}
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
      <Tooltip title="Add Ingredient">
        <span>
          <Button
            onClick={handleAddIngredient}
            sx={{ height: "58px" }}
            variant="btn"
            disabled={isFormValid ? false : true}
          >
            <Add fontSize="small" />
          </Button>
        </span>
      </Tooltip>
    </>
  );
};

export default IngredientSelect;
