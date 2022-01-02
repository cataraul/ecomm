import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import { ReactComponent as Logo } from "../assets/Lotus-Flower.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="list">
        <Link className="list-item" to="/shop">
          Shop
        </Link>
        <Link className="list-item" to="/shop">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
