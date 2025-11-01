import { signInInputs } from "@/interfaces/auth/signInInputs.types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { baseUrl, localBase } from "@/server/config";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { setUserName, setUserToken } from "@/lib/redux/slices/auth/signinSlice";
import Cookies from "js-cookie";
import { showToast } from "nextjs-toast-notify";
import { jwtDecode } from "jwt-decode";
import { decodedTokenType } from "@/interfaces/token/decodedToken.types";


type errFinalRespType = {
  message: string;
  error: string;
  statusCode: number;
};

type successFinalRespType = {
  mfaRequired: boolean;
  accessToken: string;
  refreshToken: string;
};

async function login(userData: signInInputs) {
  const res = await fetch(`${localBase}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  let finalResp;

  try {
    finalResp = await res.json();
  } catch {
    throw new Error("Login failed");
  }

  if (!res.ok) {
    const { error, message, statusCode }: errFinalRespType = finalResp || {};
    if (statusCode === 403 && error === "Forbidden") {
      throw new Error("User not verified");
    }
    if (statusCode === 401) {
      throw new Error("Invalid Email or Password");
    }
    throw new Error(message || "Login failed");
  }

  // console.log(finalResp);

  return finalResp as successFinalRespType;
}

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  

  // Mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      
      dispatch(setUserToken(accessToken));
      Cookies.set("userToken", refreshToken);
      router.replace("/dashboard");
    },
    onError: (error: unknown) => {
      console.log(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      showToast.error(message, {
        duration: 5000,
        position: "top-center",
      });
    },
  });

  return loginMutation as UseMutationResult;
}
