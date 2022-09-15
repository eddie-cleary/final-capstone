import { Card, CardHeader, CardMedia, CardActions, Link } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import LikeRecipeButton from "../shared/LikeRecipeButton";

export default function RecipeCard({ recipe }) {
  return (
    <Card elevation={5} sx={{ m: 2, height: 340, width: 330 }}>
      <Link
        sx={{ textDecoration: "none" }}
        component={ReactLink}
        to={`/recipes/${recipe.id}`}
      >
        <CardHeader title={recipe.name} />
        <CardMedia
          component="img"
          height="194"
          image={
            recipe.imgId &&
            `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
          }
          alt={recipe.name}
        />
      </Link>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LikeRecipeButton recipe={recipe} />
      </CardActions>
    </Card>
  );
}
