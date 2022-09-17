import React from "react";
import { Stack, Button, Link, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link as ReactLink } from "react-router-dom";
import squareLogo from "../../assets/logo-square.svg";

const header = (theme) => ({
  width: "100%",
});

const title = (theme) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
});

const Header = ({ setOpen, open, matches }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={header}
    >
      <Link to="/home" component={ReactLink} underline="none" color="#bed9d2">
        <Box component="img" height="90px" src={squareLogo}></Box>
      </Link>

      <Button
        sx={{
          ...(matches && { display: "none" }),
        }}
        onClick={() => setOpen(!open)}
      >
        <Menu fontSize="large" />
      </Button>
    </Stack>
  );
};

export default Header;
