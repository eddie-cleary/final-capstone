import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { IconButton } from "@mui/material";
import { DeleteOutlineOutlined, FavoriteSharp } from "@mui/icons-material";
import { Link } from "@mui/material";
import { Link as ReactLink, useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  console.log(recipe);
  return (
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
          <IconButton>
            <DeleteOutlineOutlined />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
