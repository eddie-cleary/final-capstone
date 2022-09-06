import React from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Button, Typography, Stack, Link } from "@mui/material";
import { deleteUser, addToken } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const sidebar ={
  width: '200px',
  height: '100px',
  alignItems: 'start',
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Stack sx= {sidebar}>
      <Typography variant="h4">Menu</Typography>
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
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Sidebar;
