import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material"

import React from "react";



const Layout = ({ children }) => {
  return (

    <Grid container >
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <main >{children}</main>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>


  );
};

export default Layout;

