import { Link, Typography, Stack, Avatar, useTheme } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import * as React from "react";
import { lightGreen } from "@mui/material/colors";

export default function MyMealPlanCard({ title, bgImg, id }) {
  const theme = useTheme();

  return (
    <Link component={ReactLink} to={`/mealplans/${id}`}>
      <Avatar
        sx={{ bgcolor: theme.palette.primary.main, width: 330, height: 340 }}
        variant="square"
      >
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Stack>
            <img alt="meal plan art" src={bgImg} width="310px" />
          </Stack>
          <Typography
            sx={{
              color: "#1c1c1c",
              fontSize: "1.2em",
              position: "absolute",
              ml: "auto",
              mr: "auto",
              pr: "10px",
              left: "0",
              right: "0",
              textAlign: "center",
              maxWidth: "150px",
              justifyContent: "center",
            }}
          >
            {title}
          </Typography>
        </Stack>
      </Avatar>
    </Link>
  );
}
