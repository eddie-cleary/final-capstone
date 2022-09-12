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

const ViewMealPlan = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [mealPlan, setMealPlan] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  useEffect(() => {
    console.log("the meal plan is ", mealPlan);
  }, [mealPlan]);

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

  const handleRecipeModal = () => {
    console.log("modal");
  };

  const MealRecipe = ({ mealRecipe }) => {
    return (
      <ListItem>
        <Button onClick={handleRecipeModal}>
          <Typography>{mealRecipe.recipe.title}</Typography>
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
      {/* <Modal open={showRecipeModal} onClose={setShowRecipeModal(false)}></Modal> */}
    </Layout>
  );
};

export default ViewMealPlan;
