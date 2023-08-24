import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// import { RootState } from "./Store"; // Import RootState type from your Redux store setup

interface CartItem {
  id: string;
  title: string;
  text: string;
  img: string;
  color: string;
  shadow: string;
  price: number;
  cartQuantity: number;
  btn: string;
  rating: string;
  // Add any other properties here
}

interface CartState {
  cartState: boolean;
  cartItems: CartItem[];
  // cartItems: [];
  cartTotalAmount: number;
  cartTotalQantity: number;
}

const initialState: CartState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [],
  cartTotalAmount: 0,
  cartTotalQantity: 0,
};

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action: PayloadAction<{ cartState: boolean }>) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action: PayloadAction<{ cartState: boolean }>) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item QTY Increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} added to Cart`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed From Cart`);
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item QTY Increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.success(`Item QTY Decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setClearCartItems: (state, action) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setGetTotals: (state) => {
      const { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          // const newPrice = price.to
          const totalPrice = price * cartQuantity;

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQTY += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQTY;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItems,
  setGetTotals,
} = CartSlice.actions;

export const selectCartState = (state: { cart: CartState }): boolean =>
  state.cart.cartState;
export const selectCartItems = (state: { cart: CartState }): CartItem[] =>
  state.cart.cartItems;

export const selectTotalAmount = (state: { cart: CartState }): number =>
  state.cart.cartTotalAmount;
export const selectTotalQTY = (state: { cart: CartState }): number =>
  state.cart.cartTotalQantity;



export type { CartState }; // Export CartState type

export default CartSlice.reducer;
