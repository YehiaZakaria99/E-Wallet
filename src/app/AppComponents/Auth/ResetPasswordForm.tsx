"use client"

import { Button } from '@/components/ui/button'
import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { resetPasswordInputs } from '@/interfaces/auth/resetPasswordInputs.types'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ShowError from './ShowError'


// Validation
const schema = yup
    .object({
        email: yup.string().required("Email is required"),
    })
    .required()

export default function ResetPasswordForm() {

    // React Hook Form To Handle Inputs
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<resetPasswordInputs>(
        { resolver: yupResolver(schema), }
    )
    const onSubmit: SubmitHandler<resetPasswordInputs> = (data) => console.log(data)

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                            />
                            <ShowError error={errors.email} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Reset
                    </Button>

                    <CardAction className="pt-4 ">
                        <Link
                            className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                            href={"/login"}
                        >
                            Return to Login
                        </Link>
                    </CardAction>
                </CardFooter>
            </form>
        </>
    )
}
