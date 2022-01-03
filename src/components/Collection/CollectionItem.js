import React from "react";
import ButtonComponent from "../Button/Button";

const CollectionItem = ({ item }) => {
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
      <ButtonComponent>Add to Cart</ButtonComponent>
    </div>
  );
};

export default CollectionItem;
