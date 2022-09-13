import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import {
  Stack,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import servingsIcon from "./icons/servings.png";
import prepIcon from "./icons/prepare.png";
import cookIcon from "./icons/cooking.png";
import { convertToMeasurement } from "../../../shared/conversions";

let RenderIngredients = ({ ingredients }) => {
  let renderedIngredients = [];
  ingredients?.map((ingredient) => {
    const {
      id: recipeId,
      quantity: quantityTsp,
      ingredient: ingredients,
    } = ingredient;
    let liquid = ingredients.liquid;
    let convertedMeasurement = convertToMeasurement(quantityTsp, liquid);
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

const SingleRecipe = ({ props }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const recipePrepTime = recipe.prepTime;
  const recipeCookTime = recipe.cookTime;

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Paper elevation={5} sx={{ maxWidth: "1200px", p: 10 }}>
        <Stack direction="row" alignItems="center">
          <Stack sx={{ width: "100%", maxWidth: "800px" }}>
            <Typography variant="h2" component="h1">
              {recipe.title}
            </Typography>
            <Typography sx={{ fontSize: "20px", mt: 3 }}>
              {recipe.description}
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
                text={`${recipe.servings}`}
                img={servingsIcon}
              />
            </Stack>
          </Stack>
          <Box
            component="img"
            src={`https://res.cloudinary.com/djoe/image/upload/c_fill/${recipe.imgId}.jpg`}
            sx={{
              aspectRatio: "1/1",
              width: "100%",
              maxWidth: "470px",
              objectFit: "cover",
            }}
            alt={`Picture of ${recipe.title}`}
          ></Box>
        </Stack>
        <Stack direction="column">
          <Stack direction="column">
            <Box>
              <Typography variant="h5">Ingredients</Typography>
              <RenderIngredients ingredients={recipe.recipeIngredients} />
            </Box>
          </Stack>
          <Stack sx={{ mt: 5 }} direction="column">
            <Box>
              <Typography variant="h5">Steps</Typography>
              <RenderSteps steps={recipe.steps} />
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default SingleRecipe;
