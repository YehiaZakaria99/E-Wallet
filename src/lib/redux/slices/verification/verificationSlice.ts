import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isPhoneVerified: boolean;
  phoneStep: number;
  isIdVerified: boolean;
  idCardStep: number;
};

const initialState: initialStateType = {
  isPhoneVerified: false,
  phoneStep: 1,
  isIdVerified: false,
  idCardStep: 1,
};

const verificationSlice = createSlice({
  name: "verificationSlice",
  initialState,
  reducers: {
    setPhoneStep: (state, action) => {
      state.phoneStep = action.payload;
    },
    setIsPhoneVerified: (state) => {
      state.isPhoneVerified = true;
    },
    // setPhoneVerificationStatus
  },
});

export default verificationSlice.reducer;

export const { setPhoneStep, setIsPhoneVerified } = verificationSlice.actions;
