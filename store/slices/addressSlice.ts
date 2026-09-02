// store/slices/addressSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "@/types/addressType";
import { api } from "@/lib/api";

type AddressState = {
  addresses: Address[];
  loading: boolean;
  error: string | null;
};

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

/* =========================
   دریافت آدرس‌ها
========================= */

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Address[]>(`/users/${userId}/addresses`);

      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue("خطا در دریافت آدرس‌ها");
    }
  },
);

/* =========================
   حذف آدرس
========================= */

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (
    { id, addr_id }: { id: string; addr_id: string },
    { rejectWithValue },
  ) => {
    try {
      await api.delete(`/users/${id}/addresses/${addr_id}`);

      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue("حذف آدرس با خطا مواجه شد");
    }
  },
);

/* =========================
   Slice
========================= */

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* GET */

    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* DELETE */

    builder
      .addCase(deleteAddress.pending, (state, action) => {
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        console.log("first")
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.meta.arg.addr_id,
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;
