import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice"; // Import CartSlice.reducer

interface RootState {
  cart: ReturnType<typeof CartReducer>; // Use ReturnType to infer the state type
  // Add other slice state types here
}

const Store = configureStore({
  reducer: {
    cart: CartReducer,
    // Add other slice reducers here
  },
});

export type { RootState }; // Export RootState type
export default Store;
