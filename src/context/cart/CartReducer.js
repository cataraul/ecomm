import {
  SHOW_HIDE_CART,
  ADD_TO_CART,
  REMOVE_ITEM,
  SET_ITEM_LOCAL_STORAGE,
} from "../Types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case SHOW_HIDE_CART: {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartItemsContext: [...state.cartItemsContext, action.payload],
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        cartItemsContext: state.cartItemsContext.filter(
          (item) => item.id !== action.payload
        ),
      };
    }
    case SET_ITEM_LOCAL_STORAGE: {
      localStorage.setItem(
        "cartItemsContext",
        JSON.stringify(state.cartItemsContext)
      );
    }

    default:
      return state;
  }
};

export default CartReducer;
