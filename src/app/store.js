import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "../redux/contactReducer";

export const store = configureStore({
  reducer: {
    contactReducer,
  },
});
