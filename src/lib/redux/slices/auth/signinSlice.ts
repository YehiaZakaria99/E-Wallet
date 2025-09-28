import Cookies from "js-cookie";

import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

type initialStateType = {
  //   user: "string" | null;
  //   loading: boolean;
  //   error: string | null;
  token: string | null;
};

const initialState = {
  token: null,
};

const singinSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      Cookies.set("userToken", state.token || "");
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
      redirect("/home");
    },
  },
});

export default singinSlice.reducer;

export const { setUserToken, logout } = singinSlice.actions;
