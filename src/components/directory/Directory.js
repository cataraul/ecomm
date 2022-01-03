import React, { useState } from "react";
import "../../styles/directory.scss";
import MenuItem from "../menu-item/MenuItem";
import { Link } from "react-router-dom";

const Directory = () => {
  const [sections, setSections] = useState([
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/gSGmnfY/hats.jpg",
      id: 1,
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/bNDxM8y/jackets.jpg",
      id: 2,
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/4sjc0pC/sneakers.jpg",
      id: 3,
    },
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/84830nZ/womens.jpg",
      size: "large",
      id: 4,
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/WFj82mv/mens.jpg",
      size: "large",
      id: 5,
    },
    {
      title: "jewelery",
      imageUrl: "https://i.ibb.co/6FjTY1t/jewelery.jpg",
      size: "larger",
      id: 6,
    },
  ]);
  return (
    <div className="directory-menu">
      {sections.map((section) => {
        return (
          <MenuItem
            title={section.title}
            imageUrl={section.imageUrl}
            size={section.size}
            key={section.id}
          />
        );
      })}
    </div>
  );
};

export default Directory;
