// signupSlice.ts
import {
  codeInput,
  idCardInput,
  signUpInputs,
} from "@/interfaces/auth/signupInputs.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  step: number;
  email: string;
  password_hash: string;
  fullname: string;
  phone: string;
  country: string;
  // repassword_hash: string;
  code: string;
  idCard: File | null;
}

const initialState: initialStateType = {
  step: 1,
  email: "",
  password_hash: "",
  fullname: "",
  phone: "",
  country: "",
  // repassword_hash: "",
  code: "",
  idCard: null,
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
      state.country = action.payload.country;
      // state.rePassword = action.payload.rePassword;
    },
    setCode: (state, action: PayloadAction<codeInput>) => {
      state.code = action.payload.code;
    },

    setIdCard: (state, action: PayloadAction<File>) => {
      state.idCard = action.payload;
    },
    resetSignUp: () => initialState,
  },
});

export const { setStep, setUserInfo, setCode, setIdCard, resetSignUp } =
  signUpSlice.actions;
export default signUpSlice.reducer;
