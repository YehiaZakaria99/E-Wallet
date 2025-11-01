"use client"
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showToast } from "nextjs-toast-notify"
import { setNewPasswordType } from '@/interfaces/auth/resetPassword.types'
import ShowError from '../ShowError'
import { useForgetPassword } from '@/hooks/useForgetPassword'



type SetNewPasswordPropsType = { setNewPasswordForm: UseFormReturn<setNewPasswordType> }

export default function SetNewPassword({ setNewPasswordForm }: SetNewPasswordPropsType) {

    const { register, handleSubmit, reset, formState: { errors } } = setNewPasswordForm;


    const { resetPasswordMutation, token } = useForgetPassword()

    const onSubmit: SubmitHandler<setNewPasswordType> = (data) => {
        if (!token) {
            showToast.error("Invalid or missing token", { duration: 5000, position: "top-center" });
            return;
        }
        resetPasswordMutation.mutate({ newPassword: data.newPassword.trim(), token });
        reset();
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
