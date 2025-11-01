import { localBase } from "@/server/config";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useEffect, useState } from "react";

type succesFinalRespType = {
  message?: string;
};

type ResetPasswordResponse = { message: string; status?: number };

//   Send Email to Reset Password
async function sendEmail(body: { email: string }) {
  const res = await fetch(`${localBase}/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

  return finalResp as succesFinalRespType;
}

// Reset Password
async function resetPassword(body: {
  token: string | null;
  newPassword: string;
}): Promise<ResetPasswordResponse> {
  const res = await fetch(`${localBase}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const finalResp = await res.json();
  if (!res.ok) {
    throw new Error(
      Array.isArray(finalResp.message)
        ? finalResp.message.join(", ")
        : finalResp.message || "Something went wrong"
    );
  }

  return finalResp;
}

export function useForgetPassword() {
  const [timer, setTimer] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (!token) {
      showToast.error("Enter Your Email", {
        duration: 5000,
        position: "top-center",
      });
      router.replace("/forget-password");
    }
  }, [token, router]);

  //   Send Email to Reset Password
  const sendEmailMutation = useMutation({
    mutationFn: sendEmail,
    retry: false,
    onSuccess: (data) => {
      if (!data) {
        showToast.error("Email is Not Valid", {
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      showToast.success(data.message || "Email Verification Successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
      setTimer(60);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Invalid Email";
      showToast.error(message, { duration: 5000, position: "top-center" });
    },
  });

  //   Reset Password and Set New Password
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.status === 400) {
        showToast.error(
          `${data.message} Try to Resend Your Email` ||
            "Try to Resend Your Email",
          { duration: 3000, position: "top-center" }
        );
        router.replace("/forget-password");
        return;
      }
      showToast.success(data.message || "Password Changed Successfully ✅", {
        duration: 3000,
        position: "top-center",
      });
      router.replace("/login");
      //   reset();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Verification failed";
      showToast.error(message, { duration: 5000, position: "top-center" });
    },
  });

  return { sendEmailMutation, resetPasswordMutation, timer, token } as {
    sendEmailMutation: UseMutationResult;
    resetPasswordMutation: UseMutationResult;
    timer: number;
    token: string | null;
  };
}
