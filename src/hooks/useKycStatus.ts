import { baseUrl, localBase } from "@/server/config";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

type successFinalRespType = {
  message: string;
};

export function useKycStatus() {
  const token = Cookies.get("userToken");

  return useQuery({
    queryKey: ["kycStatus"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/auth/kyc/status`, {
        method: "GET",
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

      console.log(finalResp);

      return finalResp as successFinalRespType;
    },
    enabled: !!token,
  });
}
