import { ADD_TO_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from './actions';

const initialState = {
  cart: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { id } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          [id]: state.cart[id]
            ? { ...state.cart[id], quantity: state.cart[id].quantity + 1 }
            : { ...action.payload, quantity: 1 },
        },
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: {
            ...state.cart[action.payload],
            quantity: state.cart[action.payload].quantity + 1,
          },
        },
      };
    case DECREMENT_QUANTITY:
      if (state.cart[action.payload].quantity <= 1) {
        const newCart = { ...state.cart };
        delete newCart[action.payload];
        return { ...state, cart: newCart };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: {
            ...state.cart[action.payload],
            quantity: state.cart[action.payload].quantity - 1,
          },
        },
      };
    default:
      return state;
  }
}

export default rootReducer;
