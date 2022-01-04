import React, { useContext, useState } from "react";
import ButtonComponent from "../Button/Button";
import CartContext from "../../context/cart/CartContext";
import { toast } from "react-toastify";

const CollectionItem = ({ item }) => {
  const { addToCart, cartItems, increaseQuantity } = useContext(CartContext);

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
      <ButtonComponent onClick={() => checkCartItems()}>
        Add to Cart
      </ButtonComponent>
    </div>
  );
};

export default CollectionItem;
