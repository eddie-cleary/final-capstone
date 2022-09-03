import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUser, addToken } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Stack direction="row">
      <Typography variant="h4">Header</Typography>
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

export default Header;
