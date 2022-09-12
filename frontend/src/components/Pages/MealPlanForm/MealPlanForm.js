import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import {
  TextField,
  Modal,
  Button,
  Stack,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  closeRecipesModal,
} from "../../../redux/features/forms/mealplan/mealPlanDataSlice";
import DaysList from "./DaysList";
import RecipesList from "./RecipeChoices/RecipesList";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  maxWidth: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styledInput = {
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
  minWidth: "300px",
};

const MealPlanForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.mealPlanData.title);
  const isModalShowing = useSelector(
    (state) => state.mealPlanData.recipesModal.isShowing
  );
  const postObject = useSelector((state) => state.mealPlanData);
  const [currentErrors, setCurrentErrors] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [showSuccess, setShowSuccess] = useState();
  const [errMsg, setErrMsg] = useState();
  const [showError, setShowError] = useState();
  const [validForm, setValidForm] = useState(false);

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
        if (day.length > 0) {
          return true;
        }
        return false;
      })
    ) {
      newErrorList.push("Every day must have at least 1 meal.");
    }

    postObject.days.forEach((day) => {
      if (
        !day.every((meal) => {
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
      day.forEach((meal) => {
        if (meal.recipes.length === 0) {
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
    if (!validForm) {
      setErrMsg(formatErrors());
      setShowError(true);
    } else if (!isEdit) {
      postMealPlan();
    }
  };

  const postMealPlan = () => {
    console.log("Meal plan posted ", postObject);
    setSuccessMsg("Meal plan saved!");
    setShowSuccess(true);
  };

  //Todo: move stack to the left x amount when sidebar is opened to keep centered
  return (
    <Layout>
      <Stack direction="row" justifyContent="center">
        <Stack direction="column" sx={{ width: "100%" }}>
          <Stack
            direction="row"
            sx={{ width: "100%", maxWidth: "400px", flexWrap: "wrap" }}
          >
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              sx={styledInput}
              placeholder="Meal plan title"
            ></TextField>
            <Stack sx={{ mt: 3, ml: 2 }} direction="row" alignSelf="flex-start">
              <Button variant="contained">Edit</Button>
              <Button onClick={handleSubmit} sx={{ ml: 4 }} variant="contained">
                Save Meal Plan
              </Button>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%", mt: 5 }}>
            <DaysList />
          </Stack>
        </Stack>
      </Stack>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMsg}
        </Alert>
      </Snackbar>

      <Modal
        open={isModalShowing}
        onClose={() => dispatch(closeRecipesModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Stack sx={modalStyles}>
          <RecipesList />
        </Stack>
      </Modal>
    </Layout>
  );
};

export default MealPlanForm;
