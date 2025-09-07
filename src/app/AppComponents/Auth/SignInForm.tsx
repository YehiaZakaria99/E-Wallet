"use client"

import { Button } from '@/components/ui/button'
import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signInInputs } from '@/interfaces/auth/signInInputs.types'
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
        password: yup.string().required("Password is required"),
    })
    .required()

export default function SignInForm() {

// React Hook Form To Handle Inputs
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<signInInputs>(
        { resolver: yupResolver(schema), }
    )

    const onSubmit: SubmitHandler<signInInputs> = (data) => console.log(data)

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
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label className="text-stone-900" htmlFor="password">
                                    Password
                                </Label>
                                <Link
                                    href="reset-password"
                                    className=" text-blue-950 ml-auto inline-block text-sm underline-offset-4 transition-all duration-300 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                {...register("password")}
                                id="password"
                                type="password"
                            />
                            <ShowError error={errors.password} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Login
                    </Button>

                    <CardAction className="py-4 mx-auto">
                        Dont't Have An Account ?
                        <Link
                            className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                            href={"/signup"}
                        >
                            Sign Up
                        </Link>
                    </CardAction>
                </CardFooter>
            </form>
        </>
    )
}
