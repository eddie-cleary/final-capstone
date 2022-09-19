import React, { useState, useEffect } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Stack, Typography, Button } from "@mui/material";
import axios from "axios";
import {
  setShowError,
  setShowSuccess,
  setSuccessMsg,
  setErrorMsg,
} from "../../../redux/features/forms/errors/errorsSlice";
import { setAllIngredients } from "../../../redux/features/forms/addrecipe/addRecipeIngredientSlice";

const AddIngredientOption = () => {
  const ingredientToCreate = useSelector(
    (state) => state.addRecipeIngredient.ingredientToCreate
  );
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [askIsLiquid, setAskIsLiquid] = useState(null);
  const [data, setData] = useState({ name: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFormValid) {
      setIsLoading(true);
      axios
        .post(process.env.REACT_APP_BASE_URL + "/ingredient", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          dispatch(setSuccessMsg("Ingredient " + data.name + " added!"));
          dispatch(setShowSuccess(true));
        })
        .then(() => {
          setData({ name: "" });
          setIsFormValid(false);
          setIsLoading(false);
          axios
            .get(process.env.REACT_APP_BASE_URL + "/ingredient", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              dispatch(setAllIngredients(res.data));
            });
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            dispatch(setErrorMsg(err.response.data.message));
          } else if (err.response?.statusText) {
            dispatch(setErrorMsg(err.response.statusText));
          } else if (err.request) {
            dispatch(setErrorMsg("Network error."));
          } else {
            dispatch(setErrorMsg("Error"));
          }
          dispatch(setShowError(true));
        });
    }
  }, [data, ingredientToCreate, token, dispatch, isFormValid]);

  useEffect(() => {
    if (data.name.length > 2) {
      data.name[0].toUpperCase();
      if (data.isLiquid === true || data.isLiquid === false) {
        setIsFormValid(true);
      }
    }
  }, [data.isLiquid, data, data.name.length]);

  const handleYesLiquid = () => {
    setData({ ...data, isLiquid: true });
  };

  const handleNoLiquid = () => {
    setData({ ...data, isLiquid: false });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    data.name = ingredientToCreate;
    setAskIsLiquid(true);
  };

  const AskIsLiquid = () => {
    return (
      <Stack textAlign="center">
        <Typography fontWeight="bold">Is it a liquid?</Typography>
        <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-around">
          <Button variant="btn" onClick={handleYesLiquid}>
            Yes
          </Button>
          <Button variant="btn" onClick={handleNoLiquid}>
            No
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      {askIsLiquid ? (
        <AskIsLiquid />
      ) : (
        <Stack>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={isLoading ? true : false}
              onClick={handleAddIngredient}
              variant="btn"
            >
              Add Ingredient <AddCircleOutline sx={{ ml: 1 }} />
            </Button>
          )}
        </Stack>
      )}
    </>
  );
};

export default AddIngredientOption;
