import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import CartItemReducer from "./features/cart/CartItemSlice";
import modelReducer from "./features/models/modelSlice";

const Store = configureStore({
  reducer: {
    cart: CartItemReducer,
    model: modelReducer,
  },
});

export default Store;
