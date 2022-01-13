import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import {
  SHOW_HIDE_CART,
  ADD_TO_CART,
  REMOVE_ITEM,
  SET_ITEM_LOCAL_STORAGE,
} from "../Types";

const CartState = ({ children }) => {
  const initialState = {
    showCart: false,
    cartItemsContext: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const showHideCart = () => {
    dispatch({ type: SHOW_HIDE_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };
  const setItemLocalStorage = (item) => {
    dispatch({ type: SET_ITEM_LOCAL_STORAGE, payload: item });
  };
  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItemsContext: state.cartItemsContext,
        addToCart,
        showHideCart,
        removeItem,
        setItemLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
