import React, { useState } from "react";
import ButtonComponent from "../components/Button/Button";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/signin.scss";

const EditEmail = () => {
  const [newEmail, setNewEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const navigate = useNavigate();

  const resignIn = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    const user = auth.currentUser;
    const { password } = formData;
    const { email } = user;
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmailHandler();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const promptForCredentials = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const updateEmailHandler = () => {
    const auth = getAuth();
    let user = auth.currentUser;
    if (user) {
      updateEmail(auth.currentUser, `${newEmail}`)
        .then(() => {
          toast.success("Email Updated!");
          updateEmailDB();
        })
        .catch((error) => {
          toast.warning("There was an error updating your email!");
          alert(error);
        });
    }
  };
  const updateEmailDB = async () => {
    const auth = getAuth();
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      email: newEmail,
    });
    navigate("/profile");
  };
  return (
    <div className="sign-in-container">
      <h1>Update your Email</h1>
      <form onSubmit={(e) => resignIn(e)}>
        <div className="input-container">
          <label htmlFor="email">Enter current email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => promptForCredentials(e)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Enter current password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => promptForCredentials(e)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="new-email">New Email:</label>
          <input type="email" id="new-email" onChange={changeEmail} />
        </div>
        <ButtonComponent>Update Email</ButtonComponent>
      </form>
    </div>
  );
};

export default EditEmail;
