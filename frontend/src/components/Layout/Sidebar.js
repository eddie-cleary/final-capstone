import React from "react";
import { Link } from "react-router-dom";
import {Button,  Typography, Stack } from "@mui/material";
import { deleteUser, addToken } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";


  
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <Stack>
      <Typography variant="h4">Sidebar</Typography>
      <Link to="/recipes">Recipes</Link>
      <Link to="/mealplans">Meal Plans</Link>
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
