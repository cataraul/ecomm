import React, { useContext, useState } from "react";
import styled from "styled-components";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <ProductContainer>
      <img src={item.imageUrl} alt={item.name} />
      <div className="product-details">
        <p>{item.name}</p>
        <p>{item.price}$</p>
      </div>
    </ProductContainer>
  );
};

export default CartItem;

const ProductContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  padding: 0.2rem;
  margin: 0.4rem 0;
  img {
    height: 4.2rem;
    width: 20%;
  }
  .product-details {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      font-size: 1.3rem;
      font-weight: 300;
    }
  }
`;
