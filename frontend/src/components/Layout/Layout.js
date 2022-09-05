import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Grid, Hidden } from "@mui/material";

import React from "react";
const gridContainer = {
  minWidth: "100vw",
  minHeight: "100vh",
 
};

const header = {
  height: "100px",
};
const sidebar = {
  width: "200px",
  position: 'fixed',
  top: '100px',

};
const main = {
  width: "calc(100vw - 200px)",
  height: "calc(100vh -100px)",
  position: 'fixed',
  left: "200px",
  top: '100px',

};
const footer = {
  height: "100px",
};

const Layout = ({ children }) => {
  return (
    <Grid container sx={gridContainer}>
      <Grid sx={header} item xs={12}>
        <Header />
      </Grid>
      {/* <Hidden smDown> */}
        <Grid item sm sx={sidebar}>
          <Sidebar  />
        </Grid>
      {/* </Hidden> */}
      {/* <Hidden mdUp>Insert Collapsible menu</Hidden> */}
      <Grid item sm={9} sx={main}>
        <main >{children}</main>
      </Grid>
      <Grid item xs={12} sx={footer}>
        <Footer  />
      </Grid>
    </Grid>
  );
};

export default Layout;
