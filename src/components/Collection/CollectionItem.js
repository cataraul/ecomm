import React, { useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ButtonComponent from "../Button/Button";
import CartContext from "../../context/cart/CartContext";
import { toast } from "react-toastify";

const CollectionItem = ({ item, getData }) => {
  //Get cartItems and functions from context api
  const { addToCart, cartItems, increaseQuantity } = useContext(CartContext);
  const [fetchedData, setFetchedData] = useState();
  //Check if a user is signed in, and if it is add the cart items to users database
  const auth = getAuth();
  // useEffect(() => {
  //   getData();
  // }, []);

  const checkIfUserIsLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // addItemsToUsersDatabase();
      } else {
      }
    });
    //Fetch data from firestore
  };

  const addItemsToCartHandler = (item) => {
    checkIfUserIsLoggedIn(item);
  };

  const checkCartItems = () => {
    if (cartItems.includes(item)) {
      toast(
        "If you want to add multiple products of the same type, go to cart!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        }
      );
    } else {
      addToCart(item);
      // addItemsToCartHandler(item);
      // getData(item);
      toast("Item added to card!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />
      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price} $</span>
      </div>
      <ButtonComponent
        onClick={() => {
          checkCartItems();
          getData(item);
        }}
      >
        Add to Cart
      </ButtonComponent>
    </div>
  );
};

export default CollectionItem;
