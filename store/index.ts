import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    cart: cartReducer,
    address:addressReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
