import {
  otpInputType,
  phoneInputType,
} from "@/interfaces/verification/verifications.types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setIsPhoneVerified,
  setPhone,
  setPhoneStep,
} from "@/lib/redux/slices/verification/verificationSlice";
import { localBase } from "@/server/config";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

// Send phone to get otp code
async function verifyPhone(body: phoneInputType) {
  const res = await fetch(`${localBase}/auth/phone-verify`, {
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

// Send otp code
async function sendOtp(body: { phone: string; otpCode: string }) {
  const res = await fetch(`${localBase}/auth/verify-phone`, {
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

export function useVerifyPhone() {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector((state) => state.verificationReducer);

  const phoneMutation = useMutation({
    mutationFn: verifyPhone,
    onSuccess: (data, variables) => {
      showToast.success(data.message || "Phone Verification Successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
      dispatch(setPhone(variables.phone));
      dispatch(setPhoneStep(2));
      //   reset();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Verification failed";
      showToast.error(message, { duration: 5000, position: "top-center" });
    },
  });

  const otpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data, variables) => {
      variables.phone = phone;
      showToast.success(data.message || "Phone Verified Successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
      dispatch(setIsPhoneVerified(true));
      //   reset();
      redirect("/dashboard");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Verification failed";
      showToast.error(message, { duration: 5000, position: "top-center" });
    },
  });

  return { phoneMutation, otpMutation } as {
    phoneMutation: UseMutationResult;
    otpMutation: UseMutationResult;
  };
}
