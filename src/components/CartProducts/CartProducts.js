import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../../context/cart/CartContext";
import CartItem from "./CartItem";
import ButtonComponent from "../Button/Button";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartProducts = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <CartProductsContainer>
      {cartItems.length > 0 ? (
        <h1>
          {cartItems.map((item) => {
            return <CartItem item={item} key={item.id}></CartItem>;
          })}
        </h1>
      ) : (
        <h2>hah</h2>
      )}
      <ButtonComponent className="checkout">
        <Link to="/cart" className="ckeckout-link">
          Go to Cart <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </ButtonComponent>
    </CartProductsContainer>
  );
};

export default CartProducts;

const CartProductsContainer = styled.div`
  height: 20rem;
  width: 20rem;
  border: 1px solid black;
  position: absolute;
  right: 3rem;
  margin-top: 1rem;
  background-color: #fefefe;
  z-index: 9999;
  overflow: scroll;
  .checkout {
    position: relative;
    bottom: 0;
    left: 25%;

    &:hover {
      a {
        color: #fefefe;
      }
    }
  }
`;
