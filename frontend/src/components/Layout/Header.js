import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Menu } from "@mui/icons-material";
import useAuth from "../../shared/useAuth";

const header = (theme) => ({
  background:
    "linear-gradient(90deg, rgb(56, 81, 112) 0%, rgb(159, 211, 199) 100%)",
  height: "100%",
});

const title = (theme) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
});

const Header = ({ setOpen, open, matches }) => {
  const isAuth = useAuth();

  const dispatch = useDispatch();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={header}
    >
      <Typography color="white" variant="h4" component="h1" sx={title}>
        My Digital Meal Planner 🥗
      </Typography>
      {isAuth && (
        <Button
          sx={{
            position: "absolute",
            right: "15px",
            ...(matches && { display: "none" }),
          }}
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </Button>
      )}
    </Stack>
  );
};

export default Header;
