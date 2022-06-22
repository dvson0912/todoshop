import React from "react";
import Menu from "../components/componentAdmin/Menu/Menu";

const Layout2 = ({ children, link }) => {
  return (
    <>
      <Menu link={link} />
      {children}
    </>
  );
};

export default Layout2;
