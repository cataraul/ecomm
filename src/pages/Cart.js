import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CartContext from "../context/cart/CartContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  faAngleUp,
  faAngleDown,
  faMoneyBill,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItemsContext, removeItem } = useContext(CartContext);
  const [cartItemsCopy, setCartItemsCopy] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //CHECK IF USER IS LOGGED IN, IF IT IS AND IT HAS ITEMS IN THE CART, DISPLAY THEM

  const auth = getAuth();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        let cartItemsLocal = JSON.parse(
          localStorage.getItem("cartItemsContext")
        );
        if (cartItemsLocal.length > 0) {
          setCartItems([...cartItemsLocal]);
        } else {
          setCartItems([...cartItemsContext]);
        }
      }
    });
  };
  const getData = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems([...docSnap.data().cartItems]);
      setCartItemsCopy([...docSnap.data().cartItems]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //CHANGE ITEMS QUANTITY

  const changeQuantity = async (type, item) => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await (await getDoc(docRef)).data().cartItems;
    if (docSnap) {
      if (cartItemsCopy.length > 0) {
        cartItemsCopy.map((cartItem) => {
          if (cartItem.name === item.name) {
            if (type === "increment") {
              if (cartItem.quantity >= 3) {
                toast.warn(
                  "We're sorry but you can't add more than 3 items of the same type.",
                  {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                  }
                );
              } else {
                cartItem.quantity++;
                setItemToFirestore();
              }
            }
            if (type === "decrement") {
              cartItem.quantity--;
              setItemToFirestore();
            }
          }
        });
      }
    }
  };
  const setItemToFirestore = async () => {
    await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
      cartItems: deleteField(),
    });

    await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
      cartItems: [...cartItemsCopy],
    });

    getData();
  };
  const deleteItemFirestore = async (item) => {
    if (isLoggedIn) {
      await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
        cartItems: deleteField(),
      });

      let filteredArray = cartItems.filter(
        (copyItem) => copyItem.id !== item.id
      );
      setCartItems([...filteredArray]);

      await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
        cartItems: [...filteredArray],
      });
    } else {
      let cartItemsLocal = JSON.parse(localStorage.getItem("cartItemsContext"));
      let filteredCartItems = cartItemsLocal.filter(
        (cartItemLocal) => cartItemLocal.id !== item.id
      );
      localStorage.setItem(
        "cartItemsContext",
        JSON.stringify(filteredCartItems)
      );
      setCartItems(JSON.parse(localStorage.getItem("cartItemsContext")));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1>There are yet no products added to the cart.</h1>
        <GoBackBtn>
          <Link to="/shop" className="go-back-link">
            go back to shop
          </Link>
        </GoBackBtn>
      </div>
    );
  }
  if (!cartItems) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Cart Items</h1>
        <PageContainer>
          <ItemsContainer>
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
                  <div className="item-quantity">
                    <button
                      className="button-arrow"
                      onClick={() => changeQuantity("increment", item)}
                    >
                      <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => {
                        deleteItemFirestore(item);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    <button
                      className="button-arrow"
                      onClick={() => changeQuantity("decrement", item)}
                      disabled={item.quantity <= 1 ? true : false}
                    >
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                  </div>
                </Item>
              );
            })}
          </ItemsContainer>
          <TotalContainer>
            <p className="total">
              Total:
              {cartItems.reduce(
                (amount, item) => item.price * item.quantity + amount,
                0
              )}
              $
            </p>
            <Link to="/checkout">
              <GoBackBtn>
                checkout <FontAwesomeIcon icon={faMoneyBill} />
              </GoBackBtn>
            </Link>
          </TotalContainer>
        </PageContainer>
      </div>
    );
  }
};

export default Cart;

const GoBackBtn = styled.button`
  height: 3rem;
  width: 10rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #fefefe;
  color: black;
  border: 1px solid black;

  &:hover {
    border: 1px solid #fefefe;
    background-color: #030303;
    color: #fefefe;
    a {
      color: #fefefe;
    }
  }
  @media only screen and (max-width: 1024px) {
    height: 2.5rem;
    width: 8rem;
  }
`;

const PageContainer = styled.section`
  width: 100%;
  display: flex;
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const ItemsContainer = styled.div`
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 1160px) {
    width: 80%;
  }
  @media only screen and (max-width: 1024px) {
    width: 75%;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
const Item = styled.div`
  border: 1px solid gray;
  height: 20rem;
  margin: 0.4rem 0;
  display: flex;
  img {
    height: 100%;
    width: 20%;
  }
  .item-details {
    width: 60%;
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
  .item-quantity {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    button {
      font-size: 2rem;
      background: none;
      border: none;
      &:hover {
        cursor: pointer;
      }
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

const TotalContainer = styled.div`
  height: 20rem;
  width: 20%;
  border: 1px solid black;
  margin: 0.4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0;
  p {
    font-size: 3rem;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: row;
    width: 100%;
    height: 10rem;
    margin: 0;
    justify-content: space-around;
  }
  @media only screen and (max-width: 425px) {
    flex-direction: column;
    p {
      font-size: 2rem;
    }
  }
`;
