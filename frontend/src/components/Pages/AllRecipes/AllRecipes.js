import React, { useState, useEffect, RouterLink } from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { Typography, Stack, List, ListItem, ImageList, ImageListItem, ImageListItemBar, Card, CardActionArea, CardContent, CardHeader, CardMedia } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const recipeCard = (theme) => ({
  width: 250,
  height: 230,
  margin: '10px',
  [theme.breakpoints.down("md")]: {
    width: 330,
    height: 200,
  }
});
const recipeData = [
  {
    img: 'https://images.unsplash.com/photo-1619096118293-a34a2f9b7339',
    title: 'Perfect Poached Egg',
    description: '',
    id: '1',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    description: '',
    id: '2',
  },
  {
    img: 'https://images.unsplash.com/photo-1648437595587-e6a8b0cdf1f9',
    title: 'Street Tacos',
    description: '',
    id: '3',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    description: '',
    id: '4',
  },
  {
    img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    title: 'Pesto Pasta',
    description: '',
    id: '5',
  },
  {
    img: 'https://images.unsplash.com/photo-1633983055303-2e33e153b7dc',
    title: '3 Alarm Chili',
    description: '',
    id: '6',
  },
  {
    img: 'https://images.unsplash.com/photo-1593629718617-bc1b024cf15a',
    title: 'Lemon Rosemary Foccacia',
    description: '',
    id: '7',
  },
  {
    img: 'https://images.unsplash.com/photo-1568146244603-ea84f076d043',
    title: 'Pad Thai',
    description: '',
    id: '8',
  },
  {
    img: 'https://images.unsplash.com/photo-1621336946382-744beb662211',
    title: 'Chia Energy Balls',
    description: '',
    id: '9',
  },
  {
    img: 'https://images.unsplash.com/photo-1562007908-69cf18a6da04',
    title: 'Apple Tart',
    description: '',
    id: '10',
  },
  {
    img: 'https://images.unsplash.com/photo-1623961990059-28356e226a77',
    title: 'Shrimp Paella',
    description: '',
    id: '11',
  },
  {
    img: 'https://images.unsplash.com/photo-1588484588657-0bbbee05132f',
    title: 'French Toast',
    description: '',
    id: '12',
  },
];
const imageGroup = (theme) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  }

});
const cardTitle = (theme) => ({
  fontSize: 25,
  paddingTop: 1,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {

    fontSize: 10,
  }
});

const AllRecipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get(baseUrl + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecipesData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const recipes = recipesData.map((recipe) => {
    return <ListItem key={recipe.id}>{recipe.title}</ListItem>;
  });

  return (
    <Layout>
      <Typography variant="h3">All My Recipes</Typography>
      <List>

        <Stack sx={imageGroup} >{recipes}
          {recipeData.map((item) => (
            <Card sx={recipeCard}>
              <CardActionArea component={RouterLink} to="/recipe/{id}">
                <CardMedia
                  component="img"
                  height="150"
                  image={`${item.img}?w=248&h=150&fit=crop&auto=format`}
                  alt={item.title}
                />
                <CardContent sx={{ padding: 0 }}>
                  <CardHeader sx={cardTitle}
                    title={item.title}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </List>
    </Layout>
  );
};

export default AllRecipes;


