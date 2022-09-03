import React from "react";
import { Link } from "react-router-dom";
import { Typography, Stack } from "@mui/material";

const Sidebar = () => {
  return (
    <Stack>
      <Typography variant="h4">Sidebar</Typography>
      <Link to="/recipes">Recipes</Link>
      <Link to="/mealplans">Meal Plans</Link>
    </Stack>
  );
};

export default Sidebar;
