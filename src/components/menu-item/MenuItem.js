import React from "react";
import "../../styles/menuItem.scss";
import { Link } from "react-router-dom";

const MenuItem = ({ title, imageUrl, size }) => {
  return (
    <div className={`${size} menu-item`}>
      <Link
        to="/shop"
        style={{ textDecoration: "none" }}
        className={`${size} menu-item`}
      >
        <div
          className="background-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="content">
          <h1 className="title">{title}</h1>
          <span className="subtitle">SHOP NOW</span>
        </div>
      </Link>
    </div>
  );
};

export default MenuItem;
