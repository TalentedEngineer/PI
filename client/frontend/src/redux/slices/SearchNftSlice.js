import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: null,
};

const nftSearchSlice = createSlice({
  name: "nftSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = nftSearchSlice.actions;
export default nftSearchSlice.reducer;
