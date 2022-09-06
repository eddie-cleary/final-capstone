import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import {
  Avatar,
  Stack,
  Typography,
  Button,
  formHelperTextClasses,
  bottomNavigationActionClasses,
} from "@mui/material";
import { useDispatch } from "react-redux";

const header ={
  background: 'linear-gradient(90deg, rgb(56, 81, 112) 0%, rgb(159, 211, 199) 100%)',
position: 'static',
height: '75px',
}

const Header = () => {
  const dispatch = useDispatch();
  return (
    <AppBar sx = { header }>
      <Toolbar>
      
        <h1>My Digital Meal Planner 🥗</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

