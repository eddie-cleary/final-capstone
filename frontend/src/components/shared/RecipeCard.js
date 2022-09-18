import {
  Card,
  CardMedia,
  CardActions,
  Link,
  Typography,
  useTheme,
  Stack,
  CardContent,
} from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import LikeRecipeButton from "../shared/LikeRecipeButton";

export default function RecipeCard({ recipe }) {
  const theme = useTheme();
  return (
    <Card
      elevation={5}
      sx={{
        m: 2,
        height: 315,
        width: 400,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.text.main}`,
        p: 0,
      }}
    >
      <Link
        sx={{ textDecoration: "none", pb: 0 }}
        component={ReactLink}
        to={`/recipes/${recipe.id}`}
      >
        <CardContent sx={{ p: 0 }}>
          <CardMedia
            component="img"
            height="210"
            image={
              recipe.imgId &&
              `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
            }
            alt={recipe.name}
          />
        </CardContent>
      </Link>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: -2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack>
            <Typography sx={{ ml: 1, fontWeight: "bold" }}>
              {recipe.name}
            </Typography>
            <Typography sx={{ ml: 1, mt: 1, fontSize: "16px" }}>
              Shared by {recipe.creatorUsername}
            </Typography>
          </Stack>
          <LikeRecipeButton recipe={recipe} />
        </Stack>
      </CardActions>
    </Card>
  );
}
