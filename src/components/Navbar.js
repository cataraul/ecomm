import React from "react";
import NavbarForm from "./NavbarForm";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavBar>
      <div className="logo">
        <p>BlackBelt Store</p>
      </div>
      <NavbarForm />
    </NavBar>
  );
};

export default Navbar;

const NavBar = styled.nav`
  width: 100%;
  min-height: 8vh;
  background-color: rgba(20, 26, 34, 255);
`;
