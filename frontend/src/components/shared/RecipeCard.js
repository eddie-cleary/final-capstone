import { Link, Typography, useTheme, Stack, Box } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import LikeRecipeButton from "../shared/LikeRecipeButton";
import ShareButton from "./ShareButton";
import imagePlaceHolder from "../../assets/remade-recipe-placeholder.png";

export default function RecipeCard({ recipe }) {
  const theme = useTheme();
  return (
    <Box
      component="article"
      sx={{
        m: 2,
        height: 270,
        width: 340,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.text.main}`,
        p: 0,
        overflow: "hidden",
      }}
    >
      <Link
        sx={{ textDecoration: "none", pb: 0 }}
        component={ReactLink}
        to={`/recipes/${recipe.id}`}
      >
        <Stack sx={{ height: "100%", maxHeight: "100%", mt: "-7px" }}>
          <Box
            component="img"
            src={
              recipe?.imgId
                ? `https://res.cloudinary.com/djoe/image/upload/c_fill,h_500,w_500/${recipe.imgId}.jpg`
                : `${imagePlaceHolder}`
            }
            alt={recipe.name}
            sx={{
              height: 165,
              objectFit: recipe?.imgId ? "cover" : "contain",
              objectPosition: "center",
            }}
          />
          <Box component="div" sx={{ height: "100%" }}>
            <Stack
              direction="row"
              sx={{ height: "100%", p: 1.5 }}
              justifyContent="space-between"
            >
              <Stack justifyContent="center" sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    height: "50%",
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  variant="titleSmall"
                >
                  {recipe.name.length > 50
                    ? recipe.name.substring(0, 60) + "..."
                    : recipe.name}
                </Typography>
                <Typography
                  sx={{
                    mt: "auto",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    mb: 1,
                  }}
                  variant="textSmall"
                >{`Shared by ${recipe.creatorUsername}`}</Typography>
              </Stack>
              <Box alignSelf="flex-end">
                <LikeRecipeButton recipe={recipe} />
                <Box sx={{ ml: "8px" }}>
                  <ShareButton recipe={recipe} />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Link>
    </Box>
  );
}
