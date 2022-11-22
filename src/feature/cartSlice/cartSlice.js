import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //   console.log(existingItem);
      if (existingItem >= 0) {
        state.cartItems[existingItem] = {
          ...state.cartItems[existingItem],
          itemQuantity: state.cartItems[existingItem].itemQuantity + 1,
        };
        toast.info(`Card ${action.payload.name} increased`, {
          position: "bottom-right",
        });
      } else {
        const tempItems = { ...action.payload, itemQuantity: 1 };
        state.cartItems.push(tempItems);
        toast.success(`${action.payload.name} addded Successfullly`, {
          position: "bottom-right",
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    romoveFromCart: (state, action) => {
      const balanceItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = balanceItems;
      toast.error(`${action.payload.name} removed Successfullly`, {
        position: "bottom-right",
      });
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const decreaseSelect = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[decreaseSelect].itemQuantity > 1) {
        state.cartItems[decreaseSelect] = {
          ...state.cartItems[decreaseSelect],
          itemQuantity: state.cartItems[decreaseSelect].itemQuantity - 1,
        };
        toast.warning(`${action.payload.name} decreased`, {
          position: "bottom-right",
        });
      } else if (decreaseSelect === 0) {
        const balanceItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = balanceItems;
        toast.error(`${action.payload.name} removed Successfullly`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeAllItem: (state) => {
      state.cartItems = [];

      toast.error(` removed ALl Successfullly`, {
        position: "bottom-right",
      });

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    getTotal: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, itemQuantity } = cartItem;

          //   console.log(cartItem.price);
          const itemTotal = price * itemQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += itemQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  romoveFromCart,
  decreaseQuantity,
  removeAllItem,
  getTotal,
} = cartSlice.actions;
