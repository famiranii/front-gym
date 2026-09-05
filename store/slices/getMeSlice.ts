import { api } from "@/lib/api";
import { Me } from "@/types/usersType";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type MeState = {
  me: Me | null;
};

const initialState: MeState = {
  me: null,
};

export const GetMeApi = createAsyncThunk("categories/fetch", async () => {
  return await api.get<Me>("/users/me");
});

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMeApi.pending, (state) => {})
      .addCase(GetMeApi.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(GetMeApi.rejected, (state, action) => {});
  },
});

export default meSlice.reducer;
