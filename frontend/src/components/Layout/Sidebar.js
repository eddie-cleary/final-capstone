import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Button, Typography, Stack, Link } from "@mui/material";
import { deleteUser, addToken } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <Stack>
      <Typography variant="h4">Sidebar</Typography>
      <Button variant="text">
        <Link to="/recipes" component={ReactLink} underline="none">
          View Recipes
        </Link>
      </Button>
      <Button variant="text">
        <Link to="/mealplans" component={ReactLink} underline="none">
          My Meal Plans
        </Link>
      </Button>
      <Button variant="text">
        <Link to="/recipes/add" component={ReactLink} underline="none">
          Add Recipe
        </Link>
      </Button>
      <Button
        onClick={() => {
          dispatch(deleteUser());
          dispatch(addToken(null));
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Sidebar;
