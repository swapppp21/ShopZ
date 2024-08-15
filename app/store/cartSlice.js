import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId } = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += 1;
      } else {
        state.items[productId] = { quantity: 1 };
      }
    },
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      state.items[productId].quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      if (state.items[productId].quantity > 1) {
        state.items[productId].quantity -= 1;
      } else {
        delete state.items[productId];
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
