import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import meReducer from "./slices/getMeSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    cart: cartReducer,
    address:addressReducer,
    users:meReducer,
    order:orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
