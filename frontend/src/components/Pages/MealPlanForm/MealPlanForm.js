import React from "react";
import Layout from "../../Layout/Layout";
import { TextField, Modal, Button, Stack, Typography } from "@mui/material";
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

const MealPlanForm = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.mealPlanData.title);
  const isModalShowing = useSelector(
    (state) => state.mealPlanData.recipesModal.isShowing
  );
  const modalDayIndex = useSelector(
    (state) => state.mealPlanData.recipesModal.dayIndex
  );
  const modalMealIndex = useSelector(
    (state) => state.mealPlanData.recipesModal.mealIndex
  );

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
              <Button sx={{ ml: 4 }} variant="contained">
                Save
              </Button>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%", mt: 5 }}>
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
        <Stack sx={modalStyles}>
          <RecipesList />
        </Stack>
      </Modal>
    </Layout>
  );
};

export default MealPlanForm;
