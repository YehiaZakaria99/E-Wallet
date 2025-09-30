"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useKycStatus } from "@/hooks/useKycStatus";
import { setIsIdVerified } from "@/lib/redux/slices/verification/verificationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Cookies from "js-cookie";
import { baseUrl } from "@/server/config";
import { setUserToken } from "@/lib/redux/slices/auth/signinSlice";




type successFinalRespType = {
    accessToken: string;
    refreshToken: string;
    message: string;
}

// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NWNhZDNjMi0yMTM4LTQ1ZTQtOTFjYy01MTZmMjFmZjExY2MiLCJlbWFpbCI6InllaGlhemFrYXJpYTE2MTk5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwia3ljU3RhdHVzIjoiYXBwcm92ZWQiLCJpYXQiOjE3NTkyNDIzNTAsImV4cCI6MTc1OTI0OTU1MH0.9Q8u0g1rg6zHNUQEyeGFWGbpbArdNmFjjFMQ3EmRONQ",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NWNhZDNjMi0yMTM4LTQ1ZTQtOTFjYy01MTZmMjFmZjExY2MiLCJlbWFpbCI6InllaGlhemFrYXJpYTE2MTk5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwia3ljU3RhdHVzIjoiYXBwcm92ZWQiLCJpYXQiOjE3NTkyNDIzNTAsImV4cCI6MTc1OTg0NzE1MH0.oEC0S7RmWKaU77yI3B6dJ_bGOi0Qvswysh93UUmXULk",
//     "message": "KYC approved"
// }



// ================= Validation Schema =================
const schema = yup.object({
    documentType: yup
        .string()
        .required("Document type is required")
        .oneOf(["passport", "id", "driver_license"], "Invalid document type"),
    file: yup
        .mixed<FileList>()
        .required("File is required")
        .test("fileExist", "File is required", (value) => {
            return value instanceof FileList && value.length > 0;
        }),
});

type FormInputs = {
    documentType: string;
    file: FileList;
};

export default function VerifyIdCard() {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);



    const dispatch = useAppDispatch();
    const { isIdVerified } = useAppSelector((state) => state.verificationReducer);

    const { data, isLoading } = useKycStatus();

    React.useEffect(() => {
        if (data?.message === "KYC approved") {
            dispatch(setIsIdVerified(true));
        } else {
            dispatch(setIsIdVerified(false));
        }
    }, [data, dispatch]);

    // ================= Form Setup =================
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });

    // ================= Mutation Setup =================
    const mutation = useMutation({
        mutationFn:
            async (data: FormInputs) => {
                const token = Cookies.get("userToken");
                const formData = new FormData();
                formData.append("documentType", data.documentType);
                formData.append("file", data.file[0]);

                const res = await fetch(`${baseUrl}/auth/kyc/submit`, {
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
            },
        onSuccess: (data) => {
            const { refreshToken, accessToken } = data;
            dispatch(setUserToken(accessToken));
            Cookies.set("userToken", refreshToken);
            dispatch(setIsIdVerified(true));
            reset();
        },
    });

    // ================= Submit Handler =================
    const onSubmit = (data: FormInputs) => {
        mutation.mutate(data);
    };

    return (
        <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>ID Card Verification</CardTitle>
                {isMounted && (
                    <Badge
                        variant={isIdVerified ? "success" : "destructive"}
                        // className={`bg-green-500`}
                        >
                        {isLoading
                            ? "Checking..."
                            : isIdVerified
                                ? "Verified"
                                : "Not Verified"}
                    </Badge>
                )}
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-3">
                    {/* Document Type */}
                    <div>
                        <select
                            {...register("documentType")}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select document type</option>
                            <option value="passport">Passport</option>
                            <option value="id">ID Card</option>
                            <option value="driver_license">Driver License</option>
                        </select>
                        {errors.documentType && (
                            <p className="text-red-500 text-sm">
                                {errors.documentType.message}
                            </p>
                        )}
                    </div>

                    {/* File Input */}
                    <div>
                        <Input type="file" accept="image/*" {...register("file")} />
                        {errors.file && (
                            <p className="text-red-500 text-sm">{errors.file.message}</p>
                        )}
                    </div>

                    {/* Error Message from Mutation */}
                    {mutation.error && (
                        <p className="text-red-500 text-sm">
                            {(mutation.error as Error).message}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end py-3 mt-3">
                    <Button
                        type="submit"
                        disabled={isIdVerified || mutation.isPending}
                        className="cursor-pointer bg-blue-950 hover:bg-blue-900"
                    >
                        {mutation.isPending
                            ? "Verifying..."
                            : isIdVerified
                                ? "Verified"
                                : "Upload & Verify"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
