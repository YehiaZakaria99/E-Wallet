"use client"
import React, { useEffect } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { showToast } from "nextjs-toast-notify"
import { setNewPasswordType } from '@/interfaces/auth/resetPassword.types'
import ShowError from '../ShowError'
import { baseUrl } from '@/server/config'
import { useMutation } from '@tanstack/react-query'

type ResetPasswordResponse = { message: string }

async function resetPassword(body: { token: string | null, newPassword: string }): Promise<ResetPasswordResponse> {
    const res = await fetch(`${baseUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const finalResp = await res.json();
    if (!res.ok) {
        console.log(finalResp);
        throw new Error(Array.isArray(finalResp.message) ? finalResp.message.join(", ") : finalResp.message || "Something went wrong");
    }
    return finalResp;
}

type SetNewPasswordPropsType = { setNewPasswordForm: UseFormReturn<setNewPasswordType> }

export default function SetNewPassword({ setNewPasswordForm }: SetNewPasswordPropsType) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            showToast.error("Enter Your Email", { duration: 5000, position: "top-center" })
            router.replace("/forget-password");
        }
    }, [token, router]);

    const { register, handleSubmit, reset, formState: { errors } } = setNewPasswordForm;

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            showToast.success(data.message || "Password Changed Successfully ✅", { duration: 3000, position: "top-center" });
            reset();
            router.replace("/login");
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Verification failed";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    const onSubmit: SubmitHandler<setNewPasswordType> = (data) => {
        if (!token) {
            showToast.error("Invalid or missing token", { duration: 5000, position: "top-center" });
            return;
        }
        resetPasswordMutation.mutate({ newPassword: data.newPassword.trim(), token });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-blue-950" htmlFor="newPassword">New Password</Label>
                        <Input {...register("newPassword")} id="newPassword" type="password" />
                        <ShowError error={errors.newPassword} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 py-4">
                <Button
                    type="submit"
                    disabled={resetPasswordMutation.isPending}
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                >
                    {resetPasswordMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </CardFooter>
        </form>
    )
}
