import { api } from "@/lib/api";
import { CartItmeType } from "@/types/cartTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItmeType[];
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  loading: true,
  error: null,
};

export const getCartApi = createAsyncThunk<
  CartItmeType[],
  void,
  { rejectValue: string }
>("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<CartItmeType[]>("/cart");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ?? "خطا در دریافت سبد خرید",
    );
  }
});

export const updateCartQuantityApi = createAsyncThunk<
  CartItmeType,
  { id: string; quantity: number },
  { rejectValue: string }
>("cart/updateCartQuantity", async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const response = await api.patch<CartItmeType>(`/cart/${id}`, {
      quantity,
    });

    return response;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ?? "خطا در تغییر تعداد محصول",
    );
  }
});

export const removeCartItemApi = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("cart/removeFromCart", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/cart/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ?? "خطا در حذف محصول",
    );
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },

    setCartItems: (state, action: PayloadAction<CartItmeType[]>) => {
      state.items = action.payload;
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCartApi.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(getCartApi.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "خطا در دریافت سبد خرید";
      })

      .addCase(updateCartQuantityApi.pending, (state) => {
        state.error = null;
      })

      .addCase(updateCartQuantityApi.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(updateCartQuantityApi.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error.message ?? "خطا در تغییر تعداد محصول";
      })

      .addCase(removeCartItemApi.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      .addCase(removeCartItemApi.rejected, (state, action) => {
        state.error =
          action.payload ?? action.error.message ?? "خطا در حذف محصول";
      });
  },
});

export const { clearCart, setCartItems, updateCartQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
