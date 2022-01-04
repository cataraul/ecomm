import React from "react";
import { Link } from "react-router-dom";
import "../../styles/collection.scss";
import CollectionItem from "./CollectionItem";

const PreviewCollection = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <Link to={`/${title.toLowerCase()}`} className="title-link">
        <h1 className="title">{title.toUpperCase()}</h1>
      </Link>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => {
            return <CollectionItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default PreviewCollection;
