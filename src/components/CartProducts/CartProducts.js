import React from "react";
import styled from "styled-components";

const CartProducts = () => {
  return <CartProductsContainer></CartProductsContainer>;
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
`;
