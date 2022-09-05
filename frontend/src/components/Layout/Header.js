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

const Header = () => {
  const dispatch = useDispatch();
  return (
    <AppBar style={{ position: "static", height: "10vh" }}>
        <Toolbar>
            <IconButton
              size="large"
              textS
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <h4
              >
                My Digital Meal Planner 🥗
            </h4>
        </Toolbar>
    </AppBar>
  );
};

export default Header;
