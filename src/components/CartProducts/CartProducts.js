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

const CartProducts = ({ setCartVisibility }) => {
  const { cartItemsContext } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    checkUser();
    return () => {
      setCartItems([]);
    };
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData();
      } else {
        let cartItemsLocal = JSON.parse(
          localStorage.getItem("cartItemsContext")
        );
        if (cartItemsLocal.length > 0) {
          setCartItems([...cartItemsLocal]);
        } else {
          setCartItems([...cartItemsContext]);
        }
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
      <p className="total">
        Total:
        {cartItems.reduce(
          (amount, item) => item.price * item.quantity + amount,
          0
        )}
        $
      </p>
      {cartItems.length > 0 ? (
        <Link to="/cart" className="ckeckout-link">
          <ButtonComponent
            className="checkout"
            onClick={() => setCartVisibility((prevstate) => !prevstate)}
          >
            Go to Cart <FontAwesomeIcon icon={faShoppingCart} />
          </ButtonComponent>
        </Link>
      ) : (
        <></>
      )}
    </CartProductsContainer>
  );
};

export default CartProducts;

const CartProductsContainer = styled.div`
  max-height: 20rem;
  width: 22rem;
  border: 1px solid black;
  position: absolute;
  right: 3rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
  background-color: #fefefe;
  z-index: 9999;
  overflow-y: scroll;
  h2 {
    text-align: center;
    padding: 1rem 0;
  }
  .checkout {
    position: relative;
    bottom: 0;
    left: 25%;
    margin: 0.5rem 0;
    &:hover {
      a {
        color: #fefefe;
      }
    }
  }
  .total {
    margin: 0.5rem 0;
    font-size: 1.4rem;
    text-align: center;
  }
  @media only screen and (max-width: 450px) {
    right: 1rem;
  }
  @media only screen and (max-width: 380px) {
    right: 0.5rem;
    width: 17rem;
  }
  @media only screen and (max-width: 290px) {
    right: 0.255rem;
    width: 15rem;
  }
`;
