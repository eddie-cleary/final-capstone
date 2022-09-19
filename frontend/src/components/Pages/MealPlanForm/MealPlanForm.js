import React, { useState, useEffect } from "react";
import {
  TextField,
  Modal,
  Stack,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  closeRecipesModal,
  resetState,
  setMealPlanFormData,
} from "../../../redux/features/forms/mealplan/mealPlanDataSlice";
import DaysList from "./DaysList";
import RecipesList from "./RecipeChoices/RecipesList";
import axios from "axios";
import {
  setErrorMsg,
  setShowError,
  setSuccessMsg,
  setShowSuccess,
} from "../../../redux/features/forms/errors/errorsSlice";

const modalStyles = {
  overflow: "hidden",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

const modalParentHideScroll = {
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  height: "100%",
  width: "85vw",
  minWidth: "300px",
  maxWidth: "1200px",
  maxHeight: "90vh",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  top: "50%",
  left: "50%",
  backgroundColor: "#fff",
  overflow: "hidden",
};

const styledInput = {
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
  minWidth: "300px",
};

const MealPlanForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const title = useSelector((state) => state.mealPlanData.title);
  const isModalShowing = useSelector(
    (state) => state.mealPlanData.recipesModal.isShowing
  );
  const postObject = useSelector((state) => state.mealPlanData);
  const [currentErrors, setCurrentErrors] = useState();
  const [validForm, setValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newErrorList = [];

    if (!postObject.title) {
      newErrorList.push("Meal plan must have a title.");
    }

    if (postObject.days.length === 0) {
      newErrorList.push("Add at least 1 day to plan.");
    }

    if (
      !postObject.days.every((day) => {
        if (day.meals.length > 0) {
          return true;
        }
        return false;
      })
    ) {
      newErrorList.push("Every day must have at least 1 meal.");
    }

    postObject.days.forEach((day) => {
      if (
        !day.meals?.every((meal) => {
          if (meal.title.length > 0) {
            return true;
          }
          return false;
        })
      ) {
        newErrorList.push("Each meal must have a title.");
      }
    });

    postObject.days.forEach((day) => {
      day.meals?.forEach((meal) => {
        if (meal.recipes?.length === 0) {
          newErrorList.push("Each meal must have at least 1 recipe.");
        }
      });
    });

    if (newErrorList.length === 0) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }

    setCurrentErrors(newErrorList);
  }, [postObject]);

  const formatErrors = () =>
    currentErrors.map((error, index) => (
      <Typography key={index}>{error}</Typography>
    ));

  const handleSubmit = () => {
    setIsLoading(true);
    if (!validForm) {
      dispatch(setErrorMsg(formatErrors()));
      dispatch(setShowError(true));
    } else if (!isEdit) {
      postMealPlan();
    } else {
      putMealPlan();
    }
  };

  const postMealPlan = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/mealplans`, postObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuccessMsg("Meal plan saved!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const putMealPlan = () => {
    console.log("the put object is ", postObject);
    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/mealplans/${postObject.id}`,
        postObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(setMealPlanFormData(res.data));
        dispatch(setSuccessMsg("Meal plan updated!"));
        dispatch(setShowSuccess(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isEdit) {
      dispatch(resetState());
    }
  }, [dispatch, isEdit]);

  return (
    <>
      <Stack
        sx={{ width: "100%", maxWidth: "1200px" }}
        direction="row"
        justifyContent="center"
      >
        <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
          <Stack
            direction="column"
            sx={{ width: "100%", maxWidth: "470px", minWidth: "0px", px: 3 }}
          >
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              sx={styledInput}
              placeholder="Meal plan title"
            ></TextField>
            <Stack
              sx={{ mt: 3, mx: "auto" }}
              direction="row"
              alignSelf="flex-start"
            >
              <Button variant="btn" onClick={handleSubmit}>
                {isLoading ? (
                  <CircularProgress />
                ) : isEdit ? (
                  "Save Edits"
                ) : (
                  "Create Meal Plan"
                )}
              </Button>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%", mt: 10 }}>
            <DaysList />
          </Stack>
        </Stack>
      </Stack>
      <Modal
        open={isModalShowing}
        onClose={() => dispatch(closeRecipesModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={modalParentHideScroll}>
          <Stack sx={modalStyles}>
            <RecipesList />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default MealPlanForm;
