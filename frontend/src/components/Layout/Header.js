import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Menu, Home } from "@mui/icons-material";

const header = (theme) => ({
  height: "100%",
 
});

const title = (theme) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
});

const Header = ({ setOpen, open, matches }) => {
  const dispatch = useDispatch();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={header}
    >
 
        <Link to="/home" underline="none" color="#bed9d2">
      <Home sx={{
        color:"#71af47",
        position:"absolute",
        left:"5px",
       top: "1px",
        fontSize: "2em",
        }}/>
      </Link>

      <Typography color="
#4f5453" variant="h4" component="h1" sx={title}>
        My Digital Meal Planner 
      </Typography>
      <Button
        sx={{
          position: "absolute",
          right: "5px",
          color:"#41262d",
          ...(matches && { display: "none" }),
        }}
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </Button>
    </Stack>
  );
};

export default Header;
