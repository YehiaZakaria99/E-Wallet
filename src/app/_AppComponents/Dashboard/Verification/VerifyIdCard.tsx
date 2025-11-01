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
import { baseUrl, localBase } from "@/server/config";
import { setUserToken } from "@/lib/redux/slices/auth/signinSlice";
import { idInputsType } from "@/interfaces/verification/verifications.types";
import { useVerifyId } from "@/hooks/useVerifyId";




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



export default function VerifyIdCard() {
    const [isMounted, setIsMounted] = React.useState(false);
    const idMutation = useVerifyId();
    const { data, isLoading } = useKycStatus();
    const dispatch = useAppDispatch();
    const { isIdVerified } = useAppSelector((state) => state.verificationReducer);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

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
    } = useForm<idInputsType>({
        resolver: yupResolver(schema),
    });

    // ================= Submit Handler =================
    const onSubmit = (data: idInputsType) => {
        idMutation.mutate(data);
    };

    return (
        <Card className="shadow-md">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>ID Card Verification</CardTitle>
                {isMounted && (
                    <Badge
                        variant={isIdVerified ? "success" : "destructive"}
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
                    {idMutation.error && (
                        <p className="text-red-500 text-sm">
                            {(idMutation.error as Error).message}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end py-3 mt-3">
                    <Button
                        type="submit"
                        disabled={isIdVerified || idMutation.isPending}
                        className="cursor-pointer bg-blue-950 hover:bg-blue-900"
                    >
                        {idMutation.isPending
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

