import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isPhoneVerified: boolean;
  phoneStep: number;
  isIdVerified: boolean;
  idCardStep: number;
  phone: string;
};

const initialState: initialStateType = {
  isPhoneVerified: false,
  phoneStep: 2,
  isIdVerified:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isIdVerified") || "false")
      : false,
  idCardStep: 1,
  phone: "",
};

const verificationSlice = createSlice({
  name: "verificationSlice",
  initialState,
  reducers: {
    // Phone
    setPhoneStep: (state, action) => {
      state.phoneStep = action.payload;
    },
    setIsPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    // id
    setIsIdVerified: (state, action) => {
      state.isIdVerified = action.payload;
      localStorage.setItem("isIdVerified", JSON.stringify(action.payload));
    },
  },
});

export default verificationSlice.reducer;

export const {
  // Phone
  setPhoneStep,
  setIsPhoneVerified,
  setPhone,
  // ID
  setIsIdVerified,
} = verificationSlice.actions;
