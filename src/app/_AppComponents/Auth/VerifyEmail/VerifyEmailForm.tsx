'use client'

import React, { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { codeInput } from '@/interfaces/auth/verifyEmailInput.types'
// import { useAppDispatch } from '@/lib/redux/hooks'
import { baseUrl } from '@/server/config'
import { useRouter, useSearchParams } from 'next/navigation'
import { showToast } from 'nextjs-toast-notify'
import { useMutation } from '@tanstack/react-query'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import ShowError from '../ShowError'
import { Button } from '@/components/ui/button'

const stepTwoSchema = yup
    .object({
        code: yup.string().required("Code is required").matches(/^[0-9]{6}$/, "Code must be 6 digits"),
    }).required();


export default function VerifyEmailForm() {
    // const dispatch = useAppDispatch()
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    async function verifyEmail(body: { code?: string; token?: string }) {
        const res = await fetch(`${baseUrl}/auth/verify-email`, {
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

    // Handle Input
    const { register, formState: { errors }, handleSubmit, reset } = useForm<codeInput>(
        { resolver: yupResolver(stepTwoSchema), }
    )

    const verifyMutation = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data) => {
            showToast.success(data.message || "Email Verification Successfully ✅", {
                duration: 3000,
                position: "top-center",
            });
            reset();
            setTimeout(() => {
                router.replace("/login");
            }, 3000);
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Verification failed";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    // Auto verify if token exists
    useEffect(() => {
        if (token) {
            verifyMutation.mutate({ token });
        }
    }, [token]);

    const onSubmit: SubmitHandler<codeInput> = async (data) => {
        verifyMutation.mutate({ code: data.code });
    };

    return (
        <>
            {token ? (
                <CardContent className="py-10 text-center">
                    {verifyMutation.isPending && (
                        <p className="text-blue-950 font-semibold">Verifying your email...</p>
                    )}
                    {verifyMutation.isSuccess && (
                        <p className="text-green-600 font-semibold">
                            Email Verification Successfully ✅
                        </p>
                    )}
                    {verifyMutation.isError && (
                        <p className="text-red-600 font-semibold">
                            Verification failed. Please try again.
                        </p>
                    )}
                </CardContent>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label
                                    className="text-blue-950 text-center py-3"
                                    htmlFor="signupCode"
                                >
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
                            disabled={verifyMutation.isPending}
                            className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900 disabled:opacity-50"
                        >
                            {verifyMutation.isPending ? "Verifying..." : "Send Code"}
                        </Button>
                    </CardFooter>
                </form>
            )}
        </>
    );
}
