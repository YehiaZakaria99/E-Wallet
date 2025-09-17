// signupSlice.ts
import {
  codeInput,
  idCardInput,
  signUpInputs,
} from "@/interfaces/auth/signupInputs.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  step: number;
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
  country: string;
  code: string;
  idCard: File | null;
}

const initialState: initialStateType = {
  step: 1,
  fullName: "",
  email: "",
  password: "",
  rePassword: "",
  phoneNumber: "",
  country: "",
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
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.rePassword = action.payload.rePassword;
      state.phoneNumber = action.payload.phoneNumber;
      state.country = action.payload.country;
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
