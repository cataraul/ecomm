import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/signin.scss";
import ButtonComponent from "../components/Button/Button";
import CartContext from "../context/cart/CartContext";

const SignIn = () => {
  const { cartItemsContext } = useContext(CartContext);
  const auth = getAuth();
  const [cartItems, setCartItems] = useState([]);
  //This state will hold the form data that user inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //Destructuring from the form data the email and password
  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      //Keeping The previous data that formData had
      ...prevState,
      //[e.target.id] gives us the id of the input that we type in and based on that we set the property(either its email or password) to that inputs value
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
        checkItems();
      }
    } catch (error) {
      toast.error("User Credentials Wrong");
    }
  };

  const checkItems = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    let cartItemsRef = [...docSnap.data().cartItems];
    let cartItemsLocal = JSON.parse(localStorage.getItem("cartItemsContext"));

    if (docSnap.exists()) {
      if (cartItemsRef.length > 0) {
        return;
      } else if (cartItemsRef.length <= 0 && cartItemsLocal.length > 0) {
        await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          cartItems: [...cartItemsLocal],
        });
      } else if (cartItemsRef.length <= 0 && cartItemsLocal.length <= 0) {
        return;
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h1>Welcome Back!</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faUser} />
          </i>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            placeholder="Password..."
            id="password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="buttons">
          <ButtonComponent>Sign In</ButtonComponent>
        </div>
      </form>
      {/* Google OAuth */}
      <Link to="/forgot-password" className="forgot-password">
        Forgot password
      </Link>
      <Link to="/sign-up" className="forgot-password sign-up">
        Sign up Instead
      </Link>
    </div>
  );
};

export default SignIn;
