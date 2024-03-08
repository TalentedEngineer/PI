import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  walletAddress: null,
  isWalletConnected: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsWalletConnected(state, action) {
      state.isWalletConnected = action.payload;
    },
    setWaletAddress(state, action) {
      state.walletAddress = action.payload;
    },
  },
});

export const { setUser, setIsWalletConnected, setWaletAddress } = userSlice.actions;
export default userSlice.reducer;
