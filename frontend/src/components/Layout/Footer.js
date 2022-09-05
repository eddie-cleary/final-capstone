import { Container, Grid, Box, Link } from "@mui/material";

import React from "react";
import { Typography } from "@mui/material";
import { combineReducers } from "@reduxjs/toolkit";

const Footer = () => {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      bgcolor="#0D6EBF"
      color="black"
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>About</Box>
            <Typography>
              <Link href="/" color="inherit">
                Team
              </Link>
            </Typography>
            <Box>
              <Link href="/" color="inherit">
                GitHub
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Merit America
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Login
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Register
              </Link>
            </Box>
          </Grid>
          <Grid textAlign="center" item xs={12} sm={4}>
            <Box borderBottom={1}>Navigate</Box>
            <Box>
              <Link href="/" color="inherit">
                Create Meal Plan
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Viewl Meal Plans
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Grocery List
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Recipe Library
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          My Digital Meal Planner &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
