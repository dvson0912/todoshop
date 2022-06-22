import React from "react";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import Search from "../components/Search/Search";

const Layout1 = (Element) => {
  return (props) => (
    <>
      <Nav />
      <Element {...props} />
      <Footer />
    </>
  );
};

export default Layout1;
