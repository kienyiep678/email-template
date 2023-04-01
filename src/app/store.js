import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/email/emailSlice";
import fileReducer from "../features/file/fileSlice";
export const store = configureStore({
  reducer: {
    email: emailReducer,
    file: fileReducer,
  },
});
