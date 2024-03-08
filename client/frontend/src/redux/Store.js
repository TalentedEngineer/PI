import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import gigReducer from "./slices/NewGigSlice";
import chatReducer from "./slices/ChatSlice";
import nftSearchReducer from "./slices/SearchNftSlice";
import serviceSearchReducer from "./slices/SearchServiceSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    gig: gigReducer,
    chat: chatReducer,
    nftSearch: nftSearchReducer,
    serviceSearch: serviceSearchReducer,
  },
});
