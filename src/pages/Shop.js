import React, { useState, useEffect, useContext } from "react";
import SHOP_DATA from "../shopData";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PreviewCollection from "../components/Collection/PreviewCollection";
import CartContext from "../context/cart/CartContext";

const Shop = () => {
  const [collections, setCollections] = useState(SHOP_DATA);
  const { cartItems } = useContext(CartContext);

  return (
    <div className="shop-page">
      {collections.map((collection) => {
        return (
          <PreviewCollection
            key={collection.id}
            id={collection.id}
            title={collection.title}
            items={collection.items}
          />
        );
      })}
    </div>
  );
};

export default Shop;
