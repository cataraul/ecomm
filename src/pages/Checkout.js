import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase.config";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutForm from "../components/CheckoutComponents/CheckoutForm";
import CardInfo from "../components/CheckoutComponents/CardInfo";
import {
  faAngleUp,
  faAngleDown,
  faMoneyBill,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import CartContext from "../context/cart/CartContext";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const { cartItemsContext } = useContext(CartContext);

  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    checkUser();
    return false;
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getData();
      } else {
        navigate("/sign-in");
        setCartItems([...cartItemsContext]);
        toast.warn("You must log in or create an account before you continue.");
      }
    });
  };
  const getData = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems([...docSnap.data().cartItems]);
      setUserData({ ...docSnap.data() });
    }
  };
  const removeData = async () => {
    navigate("/");
    toast.success("Thank you , your order has been successfully completed!");
    await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
      cartItems: [],
    });
    let emptyArr = [];
    localStorage.setItem("cartItemsContext", JSON.stringify(emptyArr));
  };
  const paymentHandler = (e) => {
    removeData();
  };
  return isLoggedIn ? (
    <CheckoutContainer>
      <div className="items">
        <h2 style={{ textAlign: "center" }}>Bag Summary</h2>
        {cartItems.map((item) => {
          return (
            <Item key={item.id}>
              <img src={item.imageUrl} alt="" />
              <div className="item-details">
                <p> {item.quantity} </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} />
                </p>
                <div className="details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">{item.price} $</p>
                </div>
              </div>
            </Item>
          );
        })}
      </div>
      <CheckoutInformation>
        <h2>
          Delivery:
          {cartItems.reduce(
            (amount, item) => item.price * item.quantity + amount,
            0
          ) > 149.99
            ? " Free delivery!"
            : ` Add a product/products worth of ${(
                149.99 -
                cartItems.reduce(
                  (amount, item) => item.price * item.quantity + amount,
                  0
                )
              ).toFixed(2)}$ to get free delivery!`}
        </h2>

        <div className="details">
          <p className="user-info">
            Name : <span>{userData.name}</span>
          </p>
          <p className="user-info">
            Email : <span>{userData.email}</span>
          </p>
          <p className="user-info">
            Address : <span>{userData.address}</span>
          </p>
          <p className="user-info">
            City : <span>{userData.city}</span>
          </p>
          <p className="user-info">
            Phone Number : <span>{userData.phoneNumber}</span>
          </p>
        </div>
        <div className="information">
          <h3>
            Total:
            {cartItems.reduce(
              (amount, item) => item.price * item.quantity + amount,
              0
            )}
            $
          </h3>
          <h3>
            Delivery:
            {cartItems.reduce(
              (amount, item) => item.price * item.quantity + amount,
              0
            ) > 149.99
              ? " Free shipping!"
              : `9.99$`}
          </h3>
        </div>
        <CardInfo paymentHandler={paymentHandler} />
      </CheckoutInformation>
    </CheckoutContainer>
  ) : (
    <>
      <CheckoutForm />
      <div className="items">
        <h2 style={{ textAlign: "center" }}>Bag Summary</h2>
        {cartItems.map((item) => {
          return (
            <Item key={item.id}>
              <img src={item.imageUrl} alt="" />
              <div className="item-details">
                <p> {item.quantity} </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} />
                </p>
                <div className="details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">{item.price} $</p>
                </div>
              </div>
            </Item>
          );
        })}
      </div>
    </>
  );
};

export default Checkout;

const CheckoutContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  .items {
    width: 70%;
    padding: 0.4rem;
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 800px) {
    .items {
      width: 100%;
      padding: 0;
      margin: auto 0;
    }
  }
`;

const CheckoutInformation = styled.div`
  width: 65%;
  padding: 0.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .details {
    width: 30rem;
    border-radius: 0.4rem;
    border: 1px solid black;
    margin: 1rem 0;
  }
  .user-info {
    padding: 1rem;
    font-size: 1.2rem;
    span {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .information {
    border: 1px solid black;
    width: 30rem;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.4rem;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    .details {
      width: 100%;
    }
    .information {
      width: 100%;
    }
  }
`;
const Item = styled.div`
  border: 1px solid gray;
  height: 15rem;
  display: flex;
  width: 100%;
  margin: 0.5rem;
  img {
    height: 100%;
    width: 25%;
  }
  .item-details {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .item-name {
      font-size: 2rem;
    }
    .item-price {
      font-size: 1.5rem;
    }
  }
  @media only screen and (max-width: 1024px) {
    justify-content: space-between;
    img {
      width: 30%;
    }
    .item-details {
      width: 40%;
    }
    .item-quantity {
      width: 10%;
      padding-right: 1.5rem;
    }
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    img {
      width: 30%;
    }
    .item-details {
      width: 40%;
    }
    .item-quantity {
      width: 10%;
      padding-right: 1.5rem;
    }
  }
  @media only screen and (max-width: 545px) {
    height: 15rem;
    .details {
      .item-name {
        font-size: 1.5rem;
      }
      .item-price {
        font-size: 1.2rem;
      }
    }
  }
  @media only screen and (max-width: 425px) {
    flex-direction: column;
    min-height: 20rem;
    align-items: center;
    img {
      padding-top: 1rem;
      height: 50%;
      text-align: center;
    }
    .item-details {
      width: 80%;
      flex-direction: row;
      justify-content: space-around;
    }
    .item-quantity {
      width: 50%;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 0;
    }
  }
`;
