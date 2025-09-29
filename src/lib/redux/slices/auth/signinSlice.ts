import Cookies from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  token: string | null;
};

const initialState: initialStateType = {
  token: null,
};

const signinSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("userToken", state.token || "");
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
    },
  },
});

export default signinSlice.reducer;

export const { setUserToken, logout } = signinSlice.actions;
