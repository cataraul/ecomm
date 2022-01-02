import React, { useState } from "react";
import SHOP_DATA from "../shopData";
import PreviewCollection from "../components/Collection/PreviewCollection";

const Shop = () => {
  const [collections, setCollections] = useState(SHOP_DATA);
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
