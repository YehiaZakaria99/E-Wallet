import { idInputsType } from "@/interfaces/verification/verifications.types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUserToken } from "@/lib/redux/slices/auth/signinSlice";
import { setIsIdVerified } from "@/lib/redux/slices/verification/verificationSlice";
import { baseUrl, localBase } from "@/server/config";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

type successFinalRespType = {
  accessToken: string;
  refreshToken: string;
  message: string;
};

async function verifyId(data: idInputsType) {
  const token = Cookies.get("userToken");
  const formData = new FormData();
  formData.append("documentType", data.documentType);
  formData.append("file", data.file[0]);

  const res = await fetch(`${localBase}/auth/kyc/submit`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

  return finalResp as successFinalRespType;
}

export function useVerifyId() {
  const dispatch = useAppDispatch();

  const idMutation = useMutation({
    mutationFn: verifyId,

    onSuccess: (data) => {
      const { refreshToken, accessToken } = data;
      dispatch(setUserToken(accessToken));
      Cookies.set("userToken", refreshToken);
      dispatch(setIsIdVerified(true));
    },
  });


  return idMutation;

}
