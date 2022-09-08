import React from "react";
import Layout from "../../Layout/Layout";
import RecipeCard from "../../shared/MyRecipeCard"
import { Grid } from "@mui/material";

let name = "Pasta"
let description = "Yum yum yum yum.. I'm hungry"
let imgUrl = "https://cdn.vox-cdn.com/thumbor/92Psv_m7KJHKoAoaagT3-QE1WPg=/0x0:4500x3000/1200x800/filters:focal(1890x1140:2610x1860)/cdn.vox-cdn.com/uploads/chorus_image/image/57391659/pasta_flyer.0.jpg"
let imgAlt = `Picture of ${name}`
let date = "April 12, 2022"

const MyRecipes = () => {
  return (
    <Layout>
      <h1>My Recipes</h1>
      <Grid container sx={{mt:2, mb: 10}}spacing={4}>
        <Grid item key="<SET KEY TO RECIPE NAME>"><RecipeCard name="Pasta" date={date} img={imgUrl} alt={imgAlt}/></Grid>   {/*For function that calls endpoint*/}
        <Grid item key=""><RecipeCard name="Pancakes" date="August 08, 2022" img="https://bit.ly/3AYsWA7" alt="Picture of Pancakes"/></Grid>         {/* delete */}
      </Grid>

      <h1>My Favorites</h1>
      <Grid container sx={{mt:2, mb: 4}}spacing={4}>
        {/* Template card below for function that calls */}
        <Grid item key=""><RecipeCard name="Pasta" date={date} img={imgUrl} alt={imgAlt}/></Grid>  {/* delete */}
      </Grid>
    </Layout>
  );
};

export default MyRecipes;
