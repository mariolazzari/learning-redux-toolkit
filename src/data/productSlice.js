import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productList from "./productList.json";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async apiUrl => {
    const res = await fetch(apiUrl);
    const data = await res.json();

    return data;
  }
);

const initialState = {
  data: [],
  fetchStatus: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchStatus = "success";
      })
      .addCase(fetchAllProducts.pending, state => {
        state.data = [];
        state.fetchStatus = "loading...";
      })
      .addCase(fetchAllProducts.rejected, state => {
        state.data = productList.products;
        state.fetchStatus = "error";
      });
  },
});

export default productSlice;
