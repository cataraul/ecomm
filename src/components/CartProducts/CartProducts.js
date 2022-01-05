import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import CartContext from "../../context/cart/CartContext";
import CartItem from "./CartItem";
import ButtonComponent from "../Button/Button";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartProducts = () => {
  // const { cartItems } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData();
      } else {
      }
    });
  };
  const getData = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems([...docSnap.data().cartItems]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <CartProductsContainer>
      {cartItems.length > 0 ? (
        <h1>
          {cartItems.map((item) => {
            return <CartItem item={item} key={item.id}></CartItem>;
          })}
        </h1>
      ) : (
        <h2>The cart it empty, add products!</h2>
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
  max-height: 20rem;
  width: 20rem;
  border: 1px solid black;
  position: absolute;
  right: 3rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
  background-color: #fefefe;
  z-index: 9999;
  overflow: scroll;
  h2 {
    text-align: center;
    padding: 1rem 0;
  }
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
