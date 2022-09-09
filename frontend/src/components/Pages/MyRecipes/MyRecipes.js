import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import RecipeCard from "../../shared/MyRecipeCard"
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { useSelector } from "react-redux";

let name = "Pasta"
let description = "Yum yum yum yum.. I'm hungry"
let imgUrl = "https://cdn.vox-cdn.com/thumbor/92Psv_m7KJHKoAoaagT3-QE1WPg=/0x0:4500x3000/1200x800/filters:focal(1890x1140:2610x1860)/cdn.vox-cdn.com/uploads/chorus_image/image/57391659/pasta_flyer.0.jpg"
let imgAlt = `Picture of ${name}`
let date = "April 12, 2022"

let RenderMyRecipes = ({recipeList}) => {
  return (
    recipeList?.map((recipe) => <Grid item key={recipe.id}><RecipeCard name={recipe.title} img={recipe.imgId} alt={`Picture of ${recipe.title}`}/></Grid>)
  )
}

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/myRecipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Grid container
      justifyContent="center"
      alignItems="center"
      >
      <Typography variant="h1">My Recipes</Typography>
      <Grid container 
      sx={{mt:2, mb: 10}} 
      spacing={5}
      justifyContent="center"
      alignItems="space-evenly"
      flexWrap= "wrap"
      justifyContent= "flex-start"
      flexGrow= "1"
      >
        <RenderMyRecipes recipeList={recipes}/>
      </Grid>

      </Grid>
    </Layout>
  );
};

export default MyRecipes;

//

//       <h1>My Favorites</h1>
//       <Grid container 
//       sx={{mt:2, mb: 4}}
//       spacing={4}
//       justifyContent="center"
//       alignItems="center"
//       >
//         {/* Template card below for function that calls */}
//         <Grid item key=""><RecipeCard name="Pasta" date={date} img={imgUrl} alt={imgAlt}/></Grid>
//       </Grid>*