import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: null,
  searchedCategory: null,
};

const serviceSearchSlice = createSlice({
  name: "serviceSearch",
  initialState,
  reducers: {
    setServiceSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchedCategory(state, action) {
      state.searchedCategory = action.payload;
    },
  },
});

export const { setServiceSearchQuery, setSearchedCategory } =
  serviceSearchSlice.actions;
export default serviceSearchSlice.reducer;
