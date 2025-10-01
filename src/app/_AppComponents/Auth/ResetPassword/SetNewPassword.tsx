"use client"
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { showToast } from "nextjs-toast-notify"
import { setNewPasswordType } from '@/interfaces/auth/resetPassword.types'
import ShowError from '../ShowError'

// Validation

type SetNewPasswordPropsType = {
    setNewPasswordForm: UseFormReturn<setNewPasswordType>
}

// Step Three
export default function SetNewPassword({ setNewPasswordForm }: SetNewPasswordPropsType) {

    // const searchParams = useSearchParams();
    // const token = searchParams.get("token");

    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = setNewPasswordForm

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit: SubmitHandler<setNewPasswordType> =
        async (data) => {
            console.log(data)
            showToast.success("Your Password has changed successfully", {
                duration: 4000,
                progress: true,
                position: "top-center",
                transition: "topBounce",
                icon: '',
                sound: true,
            });

            await sleep(4000)
            reset();
            router.push("/login")
        }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-blue-950" htmlFor="newPassword">
                                New Password
                            </Label>
                            <Input
                                {...register("newPassword")}
                                id="newPassword"
                                type="password"
                                placeholder=""
                            />
                            <ShowError error={errors.newPassword} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                    >
                        Submit
                    </Button>
                </CardFooter>

            </form>
        </>
    )
}
