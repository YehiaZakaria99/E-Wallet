import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/auth/signupSlice";
import signInReducer from "./slices/auth/signinSlice";

export const store = () => {
  return configureStore({
    reducer: {
      signUpReducer,
      signInReducer,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
