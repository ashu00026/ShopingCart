import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";
import axios from "axios";
import { openModel } from "../models/modelSlice";

const initialState = {
  // items: cartItems,
  items: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (name, ThunkApi) => {
    try {
      const resp = await axios.get(url);
      // const res = resp.json();
      console.log(name);
      console.log(ThunkApi);
      console.log(ThunkApi.getState());
      // ThunkApi.dispatch(openModel());
      // console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
      ThunkApi.rejectWithValue("There was Some Error");
    }
  }
);

const CartItemSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      //   console.log(action.payload);
      const { payload } = action;
      //   console.log(payload);
      const itemId = payload.id;
      //   console.log(itemId);
      //   console.log(state.items);
      const newItems = state.items.filter((item) => {
        return item.id !== itemId;
      });
      //   console.log(newItems);
      state.items = newItems;
    },
    increase: (state, action) => {
      const { payload } = action;
      const itemId = payload.id;
      const item = state.items.find((item) => item.id === itemId);
      item.amount = item.amount + 1;
    },
    decrease: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);
      item.amount = item.amount - 1;
    },
    calculateTotal: (state) => {
      let total = 0;
      let amount = 0;
      state.items.forEach((item) => {
        amount += item.amount;
        total += amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
  //this below version of extraReducers is depricated...
  // extraReducers: {
  //   [getCartItems.pending]: (state, action) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.items = action.payload;
  //   },
  //   [getCartItems.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     console.log(action);
  //   },
  // },
});
export const { clearCart, removeItem, decrease, increase, calculateTotal } =
  CartItemSlice.actions;

export default CartItemSlice.reducer;
