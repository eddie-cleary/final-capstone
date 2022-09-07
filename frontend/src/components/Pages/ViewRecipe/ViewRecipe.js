import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { Stack, Card, CardMedia, Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const loaded = false;

let RenderIngredients = (props) => {
  let renderedIngredients = [];
  for (let i=0; i<props.arr.length; i++) {
      let currIngredientObj = props.arr[i];
      const {id:recipeId, quantity:quantityTsp, ingredient:ingredientName} = currIngredientObj;
      //call utility function that converts tsp passing quantityTsp & return measurement + unit to change string below.
      renderedIngredients.push("You need: " + quantityTsp + " tsp of " + "ingredient with recipe id of " + recipeId) //todo: repl recipeId str with proper ingredientName when null fixed
  }
  return (
    renderedIngredients.map(ingredient => (
    <List>
      <ListItem>
      <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
      <ListItemText primary={ingredient}/>
      </ListItem>
    </List>
  )))
}

const RenderSteps = (props) => {
  let renderedSteps = [];
  for (let i=0; i<props.arr.length; i++) {
    let currStepObj = props.arr[i];
    const {info:currentStep} = currStepObj;
    renderedSteps.push((i+1) + ". " + currentStep)
  }
  return (
    renderedSteps.map(step => (
      <List>
        <ListItem>
        <ListItemIcon><ChevronRightIcon /></ListItemIcon>
        <ListItemText primary={step}/>
        </ListItem>
      </List>
    )))
}


const SingleRecipe = (props) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
        loaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

        <Grid item xs={12}><Paper elevation={5}>
          <Box display="flex" justifyContent="center" p={4} sx={{ width: "100vh" }}>
            <Typography variant="h3">{recipe.title}</Typography>
          </Box></Paper></Grid>

        <Grid item xs={12}><Paper elevation={5}>
          <Box display="flex" justifyContent="center" p={4} sx={{ width: "100vh" }}>
            <Typography variant="h4">{`Category: ${recipe.category}`}</Typography>
          </Box></Paper></Grid>

        <Grid item xs={12}><Paper elevation={5}>
          <Box display="flex" justifyContent="center" p={4} sx={{ width: "100vh" }}>
            <Typography variant="h4">{`Description: ${recipe.description}`}</Typography>
          </Box></Paper></Grid>

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          width="100vh"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Card variant="outlined" sx={{ maxWidth: 180 }}>
            <CardMedia
              component="img"
              alt="prepare icon"
              height="140"
              image={require("./icons/servings.png")} />
            <Typography variant="h5" component="div">Servings</Typography>
            <Typography variant="h5">{`${recipe.prepTime}`}</Typography>
          </Card>

          <Card variant="outlined" sx={{ maxWidth: 180 }}>
            <CardMedia
              component="img"
              alt="prepare icon"
              height="140"
              image={require("./icons/prepare.png")} />
            <Typography variant="h5" component="div">Prep Time</Typography>
            <Typography variant="h5">{`${recipe.prepTime} minutes`}</Typography>
          </Card>

          <Card variant="outlined" sx={{ maxWidth: 180 }}>
            <CardMedia
              component="img"
              alt="prepare icon"
              height="140"
              image={require("./icons/cooking.png")} 
              />
            <Typography variant="h5" component="div">Cook Time</Typography>
            <Typography variant="h5">{`${recipe.cookTime} minutes`}</Typography>
          </Card>
        </Stack>

  
        <Stack
          direction="column"
          justifyContent = "center"
          width="100vh"
          spacing={2}
          sx={{ mt: 5 }}>
          <Paper elevation={5}><Box p={4} sx={{ width: "100vh" }}>
          <Typography variant="h4">Ingredients</Typography>
          <RenderIngredients arr={recipe.recipeIngredients}/>
        </Box></Paper>
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
          <RenderSteps arr={recipe.steps}/>
        </Box></Paper>
        </Stack> 
        </Grid>
    </Layout>
  );
};

export default SingleRecipe;
