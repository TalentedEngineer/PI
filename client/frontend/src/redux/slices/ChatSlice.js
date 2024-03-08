import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatUser(state, action) {
      state.selectedChatUser = action.payload;
    },
  },
});

export const { setSelectedChatUser } = chatSlice.actions;
export default chatSlice.reducer;
