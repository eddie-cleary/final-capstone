import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import servingsIcon from "./icons/servings.png";
import prepIcon from "./icons/prepare.png";
import cookIcon from "./icons/cooking.png";
import { convertToMeasurement } from "../../../shared/conversions";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";

let RenderIngredients = ({ ingredients, currentServings }) => {
  let renderedIngredients = [];
  ingredients?.map((ingredient) => {
    const {
      id: recipeId,
      quantity: quantityTsp,
      ingredient: ingredients,
    } = ingredient;
    let liquid = ingredients.liquid;
    let convertedMeasurement = convertToMeasurement(
      quantityTsp * currentServings,
      liquid
    );
    renderedIngredients.push(convertedMeasurement + " of " + ingredients.name);
  });
  return renderedIngredients.map((ingredient, index) => (
    <List key={index}>
      <ListItem>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={ingredient} />
      </ListItem>
    </List>
  ));
};

const RenderSteps = ({ steps }) => {
  let renderedSteps = [];

  steps?.map((step, index) => {
    const { info: currentStep } = step;
    renderedSteps.push(index + 1 + ". " + currentStep);
  });
  return renderedSteps.map((step) => (
    <List key={step}>
      <ListItem>
        <ListItemIcon>
          <ChevronRightIcon />
        </ListItemIcon>
        <ListItemText primary={step} />
      </ListItem>
    </List>
  ));
};

const InfoCard = (props) => {
  return (
    <Stack direction="column" alignItems="center">
      <Box component="img" src={props.img} alt="prepare icon" width="50px" />
      <Typography variant="h6" component="div">
        <BoldUnderline text={props.name} />
      </Typography>
      <Typography variant="h6">{props.text}</Typography>
    </Stack>
  );
};

const BoldUnderline = ({ text }) => {
  return (
    <Box sx={{ mt: 1 }} fontWeight="fontWeightBold">
      {text}
    </Box>
  );
};

const SingleRecipe = ({ recipe }) => {
  const recipePrepTime = recipe?.prepTime;
  const recipeCookTime = recipe?.cookTime;
  const [currentServings, setCurrentServings] = useState(1);

  useEffect(() => {
    setCurrentServings(recipe?.servings);
  }, [recipe]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Paper elevation={5} sx={{ maxWidth: "1200px", p: 6 }}>
      <Stack direction={matches ? "column" : "row-reverse"} alignItems="center">
        <Box
          component="img"
          src={
            recipe?.imgId
              ? `https://res.cloudinary.com/djoe/image/upload/c_fill/${recipe?.imgId}.jpg`
              : ""
          }
          sx={{
            aspectRatio: "1/1",
            width: "100%",
            maxWidth: "470px",
            objectFit: "cover",
          }}
          alt={`Picture of ${recipe?.title}`}
        ></Box>
        <Stack sx={{ width: "100%", maxWidth: "800px", mt: matches ? 5 : 0 }}>
          <Typography variant="h2" component="h1">
            {recipe?.title}
          </Typography>
          <Typography sx={{ fontSize: "20px", mt: 3 }}>
            {recipe?.description}
          </Typography>
          <Stack sx={{ width: "100%", mt: 5, gap: "40px" }} direction="row">
            <InfoCard
              name="Prep time"
              text={
                recipePrepTime == 1 ? "1 minute" : `${recipePrepTime} minutes`
              }
              img={prepIcon}
            />
            <InfoCard
              name="Cook time"
              text={
                recipeCookTime == 1 ? "1 minute" : `${recipeCookTime} minutes`
              }
              img={cookIcon}
            />
            <InfoCard
              name="Servings"
              text={currentServings}
              img={servingsIcon}
            />
            <Stack sx={{ ml: -4 }} justifyContent="flex-end">
              <Button
                onClick={() =>
                  setCurrentServings(
                    currentServings < 10 ? currentServings + 1 : currentServings
                  )
                }
                sx={{ p: 0 }}
              >
                <AddBox fontSize="large" />
              </Button>
              <Button
                onClick={() =>
                  setCurrentServings(
                    currentServings > 1 ? currentServings - 1 : currentServings
                  )
                }
                sx={{ p: 0 }}
              >
                <IndeterminateCheckBox fontSize="large" />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" sx={{ mt: matches ? 7 : 0 }}>
        <Stack direction="column">
          <Box>
            <Typography variant="h5">Ingredients</Typography>
            <RenderIngredients
              ingredients={recipe?.recipeIngredients}
              currentServings={currentServings}
            />
          </Box>
        </Stack>
        <Stack sx={{ mt: 5 }} direction="column">
          <Box>
            <Typography variant="h5">Steps</Typography>
            <RenderSteps steps={recipe?.steps} />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SingleRecipe;
