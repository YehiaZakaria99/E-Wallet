"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import ShowError from "../ShowError";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/lib/redux/store";
import { showToast } from "nextjs-toast-notify";
import { baseUrl } from "@/server/config";
import { codeInput } from "@/interfaces/auth/verifyEmailInput.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type StepTwoPropsType = {
    formStepTwo: UseFormReturn<codeInput>;
    dispatch: AppDispatch;
};

async function sendCode(code: codeInput) {
    const res = await fetch(`${baseUrl}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(code),
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

async function verifyWithToken(token: string) {
    const res = await fetch(`${baseUrl}/auth/email-verify-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
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

export default function StepTwo({ formStepTwo, dispatch }: StepTwoPropsType) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, formState: { errors }, handleSubmit, reset } = formStepTwo;

    // Mutation for manual code
    const codeMutation = useMutation({
        mutationFn: sendCode,
        onSuccess: (data) => {
            showToast.success(data.message, { duration: 5000, position: "top-center" });
            reset();
            router.push("/login");
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Failed To Send Code";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    // Mutation for token verification
    const tokenMutation = useMutation({
        mutationFn: verifyWithToken,
        onSuccess: (data) => {
            showToast.success(data.message, { duration: 5000, position: "top-center" });
            router.push("/login");
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Invalid or expired token";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    // Auto verify if token in URL
    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            tokenMutation.mutate(token);
        }
    }, [searchParams, tokenMutation]);

    const onSubmit: SubmitHandler<codeInput> = async (data) => {
        codeMutation.mutate(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-blue-950 text-center py-3" htmlFor="signupCode">
                                Please, enter code sent to your Email
                            </Label>
                            <Input
                                {...register("code")}
                                id="signupCode"
                                type="text"
                                placeholder="Enter Code"
                            />
                            <ShowError error={errors.code} />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        disabled={codeMutation.isPending || tokenMutation.isPending}
                        className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-stone-700 disabled:opacity-50"
                    >
                        {codeMutation.isPending || tokenMutation.isPending
                            ? "Verifying..."
                            : "Send Code"}
                    </Button>
                </CardFooter>
            </form>
        </>
    );
}
