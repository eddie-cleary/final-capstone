import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
