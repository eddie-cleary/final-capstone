import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cardClasses, Grid, Hidden } from "@mui/material"

import React from "react";
const gridContainer = {
  width: '100vw',
  height: '100vh',
}

const header = {
  height: '200px',
}
const sidebar = {
  width: '200px',
}
const main = {
  width: 'calc(100vw - 200px)',
  height: 'calc(100vh -300px)',
}
const footer = {
height: '100px',
}

const Layout = ({ children }) => {
  return (

    <Grid container sx={gridContainer}>
      <Grid item xs={12}>
        <Header sx={{ header }} />
      </Grid>
      <Hidden smDown>
      <Grid item  sm>
        <Sidebar sx={ sidebar }/>
      </Grid>
      </Hidden>
      <Hidden mdUp>
        Insert Collapsible menu
      </Hidden>
      <Grid item sm={9}>
        <main sx = { main }>{children}</main>
      </Grid>
      <Grid item xs={12}>
        <Footer sx= { footer }/>
      </Grid>
    </Grid>


  );
};

export default Layout;

