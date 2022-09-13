import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import {
  Typography,
  ListItem,
  Button,
  List,
  Stack,
  Modal,
} from "@mui/material";
import SingleRecipe from "../../shared/SingleRecipe/SingleRecipe";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  maxWidth: "1200px",
  maxHeight: "90vh",
  width: "85vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const ViewMealPlan = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [mealPlan, setMealPlan] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl + `/mealplans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMealPlan(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (currentRecipe) {
      setShowRecipeModal(true);
    }
  }, [currentRecipe]);

  const handleCloseModal = () => {
    setShowRecipeModal(false);
    setCurrentRecipe(null);
  };

  useEffect(() => {
    console.log("recipe modal is showing ", showRecipeModal);
    console.log("current recipe is ", currentRecipe);
  }, [showRecipeModal]);

  const MealRecipe = ({ mealRecipe }) => {
    return (
      <ListItem>
        <Button onClick={() => setCurrentRecipe(mealRecipe.recipe)}>
          <Typography sx={{ textTransform: "capitalize" }}>
            {mealRecipe.recipe.title}
          </Typography>
        </Button>
      </ListItem>
    );
  };

  const Meal = ({ meal }) => {
    return (
      <ListItem>
        <Stack>
          <Typography>{meal.title}</Typography>
          <List>
            {meal.mealRecipes.map((mealRecipe, index) => {
              return <MealRecipe key={index} mealRecipe={mealRecipe} />;
            })}
          </List>
        </Stack>
      </ListItem>
    );
  };

  const Day = ({ day, index }) => {
    return (
      <ListItem>
        <Stack>
          <Typography>{`Day ${index + 1}`}</Typography>
          <List>
            {day.meals.map((meal, index) => (
              <Meal key={index} meal={meal} />
            ))}
          </List>
        </Stack>
      </ListItem>
    );
  };

  const dayComponents = mealPlan?.days?.map((day, index) => (
    <Day key={index} day={day} index={index} />
  ));

  return (
    <Layout>
      <Stack>{dayComponents}</Stack>
      <Modal keepMounted open={showRecipeModal} onClose={handleCloseModal}>
        <Stack sx={modalStyles}>
          <SingleRecipe recipe={currentRecipe} />
        </Stack>
      </Modal>
    </Layout>
  );
};

export default ViewMealPlan;
