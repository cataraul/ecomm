import React, { useContext, useState } from "react";
import styled from "styled-components";

const CartItem = ({ item }) => {
  console.log(item);
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <ProductContainer>
      <img src={item.imageUrl} alt={item.name} />
      <div className="product-details">
        <p>{item.name}</p>
        <p>{item.price}</p>
        <p>Quantity:{quantity}</p>
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
  img {
    height: 4rem;
    width: 20%;
  }
  .product-details {
    width: 80%;
    display: flex;
    align-items: center;
    p {
      font-size: 1rem;
      font-weight: 300;
    }
  }
`;
