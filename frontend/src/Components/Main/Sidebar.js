import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <div>
      <Typography variant="h2">Sidebar</Typography>
      <Link to="/recipes">Recipes</Link>
      <Link to="/mealplans">Meal Plans</Link>
    </div>
  );
};

export default Sidebar;
