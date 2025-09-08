"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { setNewPasswordInputs } from "@/interfaces/auth/setNewPassword.types"
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ShowError from './ShowError'
import { useRouter } from 'next/navigation'
import { showToast } from "nextjs-toast-notify"

// Validation
const schema = yup
    .object({
        password: yup.string().required("Password is required"),
        rePassword: yup.string().required("Repassword is required").oneOf([yup.ref("password")], "Password Must Match"),
    })
    .required()


export default function SetNewPassword() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<setNewPasswordInputs>(
        { resolver: yupResolver(schema), }
    )
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const onSubmit: SubmitHandler<setNewPasswordInputs> =
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
                            <Label className="text-stone-900" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                {...register("password")}
                                id="password"
                                type="text"
                                placeholder=""
                            />
                            <ShowError error={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="rePassword">
                                RePassword
                            </Label>
                            <Input
                                {...register("rePassword")}
                                id="rePassword"
                                type="text"
                                placeholder=""
                            />
                            <ShowError error={errors.rePassword} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Submit
                    </Button>
                </CardFooter>

            </form>
        </>
    )
}
