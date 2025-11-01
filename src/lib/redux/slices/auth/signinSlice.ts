import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodedTokenType } from "@/interfaces/token/decodedToken.types";


// dispatch(setUserName(userName));

type initialStateType = {
  token: string | null;
  // userName: string | null;
};

const initialState: initialStateType = {
  token: null,
  // userName,
};

const signinSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // accessToken
    },
    setUserName: (state, action: PayloadAction<string>) => {
      // state.userName = action.payload;
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("userToken");
    },
  },
});

export default signinSlice.reducer;

export const { setUserToken, setUserName, logout } = signinSlice.actions;
