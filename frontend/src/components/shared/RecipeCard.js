import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Link,
  Checkbox,
  Button,
  Modal,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import {
  FavoriteSharp,
  FavoriteBorder,
  Favorite,
  Delete,
} from "@mui/icons-material";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <>
      <Link component={ReactLink} to={`/recipes/${recipe.id}`}>
        <Card elevation={5} sx={{ height: 340, width: 330 }}>
          <CardHeader
            action={
              <IconButton>
                <FavoriteSharp color="warning" sx={{ marginRight: 1 }} />
              </IconButton>
            }
            title={recipe.title}
          />
          <CardMedia
            component="img"
            height="194"
            image={
              recipe.imgId &&
              `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
            }
            alt={recipe.title}
          />
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Checkbox
            checked={liked}
            icon={<FavoriteBorder color="warning" />}
            checkedIcon={<Favorite color="warning" />}
            onChange={(e) => setLiked(e.target.checked)}
          /> */}
          </CardActions>
        </Card>
      </Link>
    </>
  );
}
