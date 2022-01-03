import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Logo } from "../assets/Lotus-Flower.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartProducts from "./CartProducts/CartProducts";
const Navbar = () => {
  const [cartVisibility, setCartVisibility] = useState(false);
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
        <Link className="list-item" to="/profile">
          Profile
        </Link>
        <button
          className="show-cart-items"
          onClick={() => setCartVisibility((prevState) => !prevState)}
        >
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
          {cartVisibility ? <CartProducts /> : <></>}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
