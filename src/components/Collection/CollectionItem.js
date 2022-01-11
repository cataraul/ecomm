import React, { useContext } from "react";
import ButtonComponent from "../Button/Button";
import CartContext from "../../context/cart/CartContext";
import { toast } from "react-toastify";

const CollectionItem = ({ item, checkIfItemExists }) => {
  //Get cartItems and functions from context api
  const { addToCart } = useContext(CartContext);

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
          checkIfItemExists(item);
        }}
      >
        Add to Cart
      </ButtonComponent>
    </div>
  );
};

export default CollectionItem;
