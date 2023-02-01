import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import authSliceReducer from "../feature/auth/authSlice";

const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, auth: authSliceReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (geDefaultMiddlewares) =>
    geDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
