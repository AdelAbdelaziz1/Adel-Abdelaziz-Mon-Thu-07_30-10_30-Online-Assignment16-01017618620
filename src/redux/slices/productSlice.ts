import getAllProducts from "@/services/product.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProductI {
  _id: string;
  title?: string;
  [key: string]: unknown;
}

interface ProductStateI {
  products: ProductI[];
  isloading: boolean;
}

export const productAction = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await getAllProducts();

    return response.data;
  }
);

const initialState: ProductStateI = {
  products: [],
  isloading: true,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productAction.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(productAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isloading = false;
    });

    builder.addCase(productAction.rejected, (state) => {
      state.isloading = false;
    });
  },
});

export const productReducer = ProductSlice.reducer;