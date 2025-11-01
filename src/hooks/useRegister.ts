import { signUpInputs } from "@/interfaces/auth/signupInputs.types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetSignUp, setUserInfo } from "@/lib/redux/slices/auth/signupSlice";
import { localBase } from "@/server/config";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useEffect } from "react";

async function registerData(userData: signUpInputs) {
  const res = await fetch(`${localBase}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  let finalResp;

  try {
    finalResp = await res.json();
  } catch {
    throw new Error("Register failed");
  }

  if (!res.ok) {
    throw new Error(
      Array.isArray(finalResp.message)
        ? finalResp.message.join(", ")
        : finalResp.message || "Something went wrong"
    );
  }
  return finalResp;
}

async function verifyEmail(email: { email: string }) {
  const res = await fetch(`${localBase}/auth/email-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  let finalResp;

  try {
    finalResp = await res.json();
  } catch {
    throw new Error("Verification failed");
  }

  if (!res.ok) {
    throw new Error(
      Array.isArray(finalResp.message)
        ? finalResp.message.join(", ")
        : finalResp.message || "Something went wrong"
    );
  }
  return finalResp;
}

async function getEmailCode(body: { code?: string; token?: string }) {
  const res = await fetch(`${localBase}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let finalResp;

  try {
    finalResp = await res.json();
  } catch {
    throw new Error("Verification failed");
  }

  if (!res.ok) {
    throw new Error(
      Array.isArray(finalResp.message)
        ? finalResp.message.join(", ")
        : finalResp.message || "Something went wrong"
    );
  }
  return finalResp;
}

export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resetSignUp());
  }, [dispatch]);

  const registerMutation = useMutation({
    mutationFn: registerData,
    onSuccess: async (data, variables) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-center",
      });
      // Verify Email
      try {
        const verifyRes = await verifyEmail({ email: variables.email });
        showToast.success(verifyRes.message, {
          duration: 5000,
          position: "top-center",
        });

        dispatch(setUserInfo(variables));
        // reset();
        router.push("/email-verify");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to sign up";
        showToast.error(message || "Failed to send verification email", {
          duration: 5000,
          position: "top-center",
        });
      }
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to sign up";
      showToast.error(message || "Failed to sign up", {
        duration: 5000,
        position: "top-center",
      });
    },
  });

  const getEmailCodeMutaion = useMutation({
    mutationFn: getEmailCode,
    onSuccess: (data) => {
      showToast.success(data.message || "Email Verification Successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
      //   reset();
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Verification failed";
      showToast.error(message, { duration: 5000, position: "top-center" });
    },
  });

  return { registerMutation, getEmailCodeMutaion } as {
    registerMutation: UseMutationResult;
    getEmailCodeMutaion: UseMutationResult;
  };
}
