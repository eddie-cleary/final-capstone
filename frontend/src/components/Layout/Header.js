import React from "react";
import { Avatar, Stack, Typography, Button, formHelperTextClasses, bottomNavigationActionClasses } from "@mui/material";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();


  return (
    <Stack direction="row">
      <Typography variant="h2" >My Digital Meal Planner</Typography>
   
    </Stack>
  );
};

export default Header;
