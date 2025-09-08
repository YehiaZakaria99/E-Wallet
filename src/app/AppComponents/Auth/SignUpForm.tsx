"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {
    CardAction,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { CountrySelect } from '../CountrySelect/CountrySelect';
import ShowError from './ShowError';
import { signUpInputs } from '@/interfaces/auth/signupInputs.types';


// Validation
const schema = yup
    .object({
        fullName: yup.string().required("Full Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        rePassword: yup.string().required("RePassword is required").oneOf([yup.ref("password")], "Password must match"),
        phoneNumber: yup.string().required("Phone is required"),
        country: yup.string().required("Country is required"),
    })
    .required()


export default function SignUpForm() {
    // React Hook Form To Handle Inputs
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<signUpInputs>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                country: "eg"
            }
        }
    )
    const onSubmit: SubmitHandler<signUpInputs> = (data) => {
        console.log(data);
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="fullName">
                                Full Name
                            </Label>
                            <Input
                                {...register('fullName')}
                                id="fullName"
                                type="text"
                                placeholder="your name"

                            />
                            <ShowError error={errors.fullName} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register('email')}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                            />
                            <ShowError error={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                            />
                            <ShowError error={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="rePassword">
                                RePassword
                            </Label>
                            <Input
                                {...register('rePassword')}
                                id="rePassword"
                                type="password"
                            />
                            <ShowError error={errors.rePassword} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                {...register('phoneNumber')}
                                id="phone"
                                placeholder="phone"
                                type="tel"
                            />
                            <ShowError error={errors.phoneNumber} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="phone">
                                Select Country
                            </Label>
                            <Controller
                                name="country"
                                control={control}
                                render={
                                    ({ field }) => (
                                        <CountrySelect
                                            field={{ ...field }}
                                            // value={country}
                                            // onChange={setCountry}
                                            placeholder="Select country"
                                            showFlagsInList={true}
                                        />
                                    )
                                }
                            />
                            <ShowError error={errors.country} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Sign Up
                    </Button>

                    <CardAction className="py-4 mx-auto">
                        Have An Account ?{" "}
                        <Link
                            className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                            href={"/login"}
                        >
                            Login
                        </Link>
                    </CardAction>
                </CardFooter>
            </form>
        </>
    )
}
