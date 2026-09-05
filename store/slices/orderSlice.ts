import { api } from "@/lib/api";
import { Order } from "@/types/orderTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type OrderState = {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const createOrderApi = createAsyncThunk<
  Order,
  { address_id: string },
  { rejectValue: string }
>("order/create", async (body, { rejectWithValue }) => {
  try {
    return await api.post<Order>("/orders", body);
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("خطا در ثبت سفارش");
  }
});

export const fetchMyOrdersApi = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("order/fetchMy", async (_, { rejectWithValue }) => {
  try {
    return await api.get<Order[]>("/orders");
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("خطا در دریافت سفارش‌ها");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderApi.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrderApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطا در ثبت سفارش";
      })
      .addCase(fetchMyOrdersApi.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default orderSlice.reducer;
