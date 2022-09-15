import React from "react";
import { Stack, Typography, Button, Link } from "@mui/material";
import { Menu } from "@mui/icons-material";
import useAuth from "../../shared/useAuth";
import { Link as ReactLink } from "react-router-dom";

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
  const isAuth = useAuth();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={header}
    >
      <Link to="/home" component={ReactLink} underline="none" color="#bed9d2">
        {/* <Home
          sx={{
            color: "#71af47",
            position: "absolute",
            left: "5px",
            top: "1px",
            fontSize: "2em",
          }}
        /> */}
      </Link>

      <Typography color="#4f5453" variant="h4" component="h1" sx={title}>
        My Digital Meal Planner
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
