import React from "react";
import { Avatar, Stack, Typography, Button, formHelperTextClasses, bottomNavigationActionClasses } from "@mui/material";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();


  return (
    <Stack direction="row">
<<<<<<< Updated upstream
      <Typography variant="h2" >My Digital Meal Planner</Typography>
   
=======
      <Typography variant="h4">Header</Typography>

      <Button
        onClick={() => {
          dispatch(deleteUser());
          dispatch(addToken(null));
        }}
      >
        Logout
      </Button>
>>>>>>> Stashed changes
    </Stack>
  );
};

export default Header;
