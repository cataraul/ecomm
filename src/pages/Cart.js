import React, { useContext, useState } from "react";
import CartContext from "../context/cart/CartContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  faAngleUp,
  faAngleDown,
  faMoneyBill,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [cartItemsCopy, setCartItemsCopy] = useState({ ...cartItems });
  const incrementQuantity = (item) => {
    if (cartItems.includes(item)) {
      return;
    } else {
      console.log("it is not");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>There are yet no products added to the cart.</h1>
        <GoBackBtn>
          <Link to="/shop" className="go-back-link">
            go back to shop
          </Link>
        </GoBackBtn>
      </div>
    );
  }
  return (
    <div>
      <h1>Cart Items</h1>
      <PageContainer>
        <ItemsContainer>
          {cartItems.map((item) => {
            return (
              <Item key={item.id}>
                <img src={item.imageUrl} alt="" />
                <div className="item-details">
                  <p> {cartItemsCopy.quantity ? cartItemsCopy.quantity : 0} </p>
                  <p>
                    <FontAwesomeIcon icon={faTimes} />
                  </p>
                  <div className="details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price} $</p>
                  </div>
                </div>
                <div className="item-quantity">
                  <button
                    className="button-arrow"
                    onClick={() => incrementQuantity(item)}
                  >
                    <FontAwesomeIcon icon={faAngleUp} />
                  </button>
                  <button className="button-delete">
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                  <button className="button-arrow">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </button>
                </div>
              </Item>
            );
          })}
        </ItemsContainer>
        <TotalContainer>
          <p className="total">
            Total:
            {cartItems.reduce((amount, item) => item.price + amount, 0)}$
          </p>
          <GoBackBtn>
            <Link to="/checkout">
              checkout <FontAwesomeIcon icon={faMoneyBill} />
            </Link>
          </GoBackBtn>
        </TotalContainer>
      </PageContainer>
    </div>
  );
};

export default Cart;

const GoBackBtn = styled.button`
  height: 3rem;
  width: 10rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #fefefe;
  color: black;
  border: 1px solid black;

  &:hover {
    border: 1px solid #fefefe;
    background-color: #030303;
    color: #fefefe;
    a {
      color: #fefefe;
    }
  }
`;

const PageContainer = styled.section`
  width: 100%;
  display: flex;
`;

const ItemsContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const Item = styled.div`
  border: 1px solid gray;
  height: 20rem;
  margin: 0.4rem 0;
  display: flex;
  img {
    height: 100%;
    width: 20%;
  }
  .item-details {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .item-name {
      font-size: 2rem;
    }
    .item-price {
      font-size: 1.5rem;
    }
  }
  .item-quantity {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    button {
      font-size: 2rem;
      background: none;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const TotalContainer = styled.div`
  height: 20rem;
  width: 20%;
  border: 1px solid black;
  margin: 0.4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0;
  p {
    font-size: 3rem;
  }
`;
