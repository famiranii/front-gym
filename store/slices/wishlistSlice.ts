import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type WishlistState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  return await api.get<Product[]>("/wishlist");
});

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId: string) => {
    const res: Product = await api.post(`/wishlist`, {
      product_id: productId,
    });
    return res;
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId: string) => {
    await api.delete(`/wishlist/${productId}`);
    return productId;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "خطا در دریافت علاقه‌مندی‌ها";
      })

      // add
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.error.message ?? "خطا در حذف";
      });
  },
});

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistLoading = (state: { wishlist: WishlistState }) =>
  state.wishlist.loading;

export const selectIsInWishlist =
  (productId: string) => (state: { wishlist: WishlistState }) =>
    state.wishlist.items.some((item) => item.id === productId);
