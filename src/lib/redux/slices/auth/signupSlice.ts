// signupSlice.ts
import { signUpInputs } from "@/interfaces/auth/signupInputs.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  step: number;
  email: string;
  password_hash: string;
  fullname: string;
  phone: string;
}

const initialState: initialStateType = {
  step: 1,
  email: "",
  password_hash: "",
  fullname: "",
  phone: "",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<signUpInputs>) => {
      state.email = action.payload.email;
      state.password_hash = action.payload.password_hash;
      state.fullname = action.payload.fullname;
      state.phone = action.payload.phone;
    },
    resetSignUp: () => initialState,
  },
});

export const { setStep, setUserInfo, resetSignUp } = signUpSlice.actions;
export default signUpSlice.reducer;
