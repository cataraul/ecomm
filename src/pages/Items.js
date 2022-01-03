import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SHOP_DATA from "../shopData";
import CollectionItem from "../components/Collection/CollectionItem";

const Items = () => {
  //Getting the collection item that the user clicked
  const location = useLocation();
  // Removing non-alphanumeric characters from the string
  const itemsName = location.pathname.replace(/\W/g, "");
  return (
    <ItemsContainer>
      {SHOP_DATA.filter((item) => item.title.toLowerCase() == itemsName).map(
        (item) => {
          return item.items.map((clothingItem) => {
            return (
              <CollectionItem
                key={clothingItem.id}
                item={clothingItem}
              ></CollectionItem>
            );
          });
        }
      )}
    </ItemsContainer>
  );
};

export default Items;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  row-gap: 1rem;
`;
