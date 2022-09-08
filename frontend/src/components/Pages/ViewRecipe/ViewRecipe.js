import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { Stack, Card, CardMedia, Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import servingsIcon from './icons/servings.png'
import prepIcon from './icons/prepare.png'
import cookIcon from './icons/servings.png'


let RenderIngredients = ({ ingredients }) => {
  let renderedIngredients = [];
  ingredients?.map((ingredient) => {
    const { id: recipeId, quantity: quantityTsp, ingredient: ingredientName } = ingredient;
    //call utility function that converts tsp passing quantityTsp & return measurement + unit to change string below.
    renderedIngredients.push("You need: " + quantityTsp + " tsp of " + "ingredient with recipe id of " + recipeId) //todo: repl recipeId str with proper ingredientName when null fixed

  });
  return (
    renderedIngredients.map(ingredient => (
      <List>
        <ListItem>
          <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
          <ListItemText primary={ingredient} />
        </ListItem>
      </List>
    )))
}

const RenderSteps = ({ steps }) => {
  let renderedSteps = [];

  steps?.map((step, index) => {
    const { info: currentStep } = step;
    renderedSteps.push((index + 1) + ". " + currentStep)
  });
  return (
    renderedSteps.map(step => (
      <List>
        <ListItem>
          <ListItemIcon><ChevronRightIcon /></ListItemIcon>
          <ListItemText primary={step} />
        </ListItem>
      </List>
    )))
}

const TimeCard = (props) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 180 }}>
      <CardMedia
        component="img"
        alt="prepare icon"
        height="140"
        image={props.img} />
      <Typography variant="h5" component="div">{props.name}</Typography>
      <Typography variant="h5">{props.text}</Typography>
    </Card>
  )
}

const GridItem = ({ title }) => {
  return (
    <Grid item xs={12}><Paper elevation={5}>
      <Box display="flex" justifyContent="center" p={4} sx={{ width: "100vh" }}>
        <Typography variant="h3">{title}</Typography>
      </Box></Paper></Grid>
  )
}


const SingleRecipe = ({ props }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const recipePrepTime = recipe.prepTime
  const recipeCookTime = recipe.cookTime

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

  // console.log(JSON.stringify({ recipe }))

  return (
    <Layout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}><Paper elevation={5}>
          <Box display="flex" justifyContent="center" p={2} component="img" src={recipe.imgUrl} alt={`Picture of ${recipe.title}`} sx={{ width: "100vh" }} />
        </Paper></Grid>

        <GridItem title={recipe.title} />
        <GridItem title={`Category: ${recipe.category}`} />
        <GridItem title={recipe.description} />

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          width="100vh"
          spacing={2}
          sx={{ mt: 4 }}>
          <TimeCard name="Servings" text={`${recipe.servings}`} img={servingsIcon} />
          <TimeCard name="Prep Time" text={recipePrepTime == 1 ? "1 minute" : `${recipePrepTime} minutes`} img={prepIcon} />
          <TimeCard name="Cook Time" text={recipeCookTime == 1 ? "1 minute" : `${recipeCookTime} minutes`} img={cookIcon} />
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          width="100vh"
          spacing={2}
          sx={{ mt: 5 }}>
          <Paper elevation={5}><Box p={4} sx={{ width: "100vh" }}>
            <Typography variant="h4">Ingredients</Typography>
            <RenderIngredients ingredients={recipe.recipeIngredients} />
          </Box>
        </Paper>
      </Stack>

        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          width="100vh"
          spacing={2}
          sx={{ mt: 5 }}>
          <Paper elevation={5}><Box p={4} sx={{ width: "100vh" }}>
            <Typography variant="h4">Steps</Typography>
            <RenderSteps steps={recipe.steps} />
          </Box></Paper>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default SingleRecipe;
