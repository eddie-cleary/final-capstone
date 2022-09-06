import { Container, Grid, Box, Link } from "@mui/material";

import React from "react";
import { Typography } from "@mui/material";
import { combineReducers } from "@reduxjs/toolkit";

const footer = {

  background: 'linear-gradient(90deg, rgb(56, 81, 112) 0%, rgb(159, 211, 199) 100%)',
  color: "#142d4c",
  fontWeight: 'bolder',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  paddingTop: '20px',
  height: '100px',

}

const Footer = () => {
  return (

    <Box sx={footer} >
      <Typography textAlign="center" pt={{ xs: 1, sm: 2 }} >
      Created in Collaboration by: Edward Cleary, Kimberly Bryant, Chantele Lohr, and Brandon Vo 
        <br />
    
        My Digital Meal Planner &reg; {new Date().getFullYear()} <br/>
      
      </Typography>
    </Box>
  
  );
};

export default Footer;
