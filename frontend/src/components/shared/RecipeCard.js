import { Card, CardHeader, CardMedia, CardActions, Link } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link component={ReactLink} to={`/recipes/${recipe.id}`}>
      <Card elevation={5} sx={{ m: 2, height: 340, width: 330 }}>
        <CardHeader title={recipe.title} />
        <CardMedia
          component="img"
          height="194"
          image={
            recipe.imgId &&
            `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
          }
          alt={recipe.title}
        />
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end" }}
        ></CardActions>
      </Card>
    </Link>
  );
}
