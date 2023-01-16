import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  id: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
    },
    userLoggedOut: (state) => {
      localStorage.clear();
      state.accessToken = undefined;
      state.id = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
