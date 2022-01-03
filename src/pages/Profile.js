import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import ButtonComponent from "../components/Button/Button";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <ButtonComponent type="button" className="logOut" onClick={onLogout}>
          Logout
        </ButtonComponent>
      </header>
      <main>
        Name: <h2>{formData.name}</h2>
        Email: <h2>{formData.email}</h2>
      </main>
    </div>
  );
};

export default Profile;
