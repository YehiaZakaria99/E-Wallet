"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInInputs } from "@/interfaces/auth/signInInputs.types";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ShowError from "./ShowError";
import { useLogin } from "@/hooks/useLogin";

// Validation Schema
const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required"),
});


export default function SignInForm() {

    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<signInInputs>({ resolver: yupResolver(schema) });


    const onSubmit: SubmitHandler<signInInputs> = (data) => {
        loginMutation.mutate(data);
        reset()
    };

    return (
        <>
            {loginMutation.isError && (
                <div className="text-center">
                    <p className="text-red-500">
                        {loginMutation.error instanceof Error
                            ? loginMutation.error.message
                            : ""}
                    </p>

                    {loginMutation.isError && loginMutation.error instanceof Error &&
                        loginMutation.error?.message === "User not verified" && (
                            <div className="text-center mt-2">
                                <Link
                                    href="/email-verify"
                                    className="text-blue-950 hover:underline hover:underline-offset-4 transition-all duration-300"
                                >
                                    Verify here
                                </Link>
                            </div>
                        )}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        {/* Email */}
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

                        {/* Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label className="text-stone-900" htmlFor="password">
                                    Password
                                </Label>
                                <Link
                                    href="forget-password"
                                    className="ml-auto text-sm text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input {...register("password")} id="password" type="password" />
                            <ShowError error={errors.password} />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>

                    <div className="py-4 mx-auto">
                        Don’t have an account?{" "}
                        <Link
                            className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                            href={"/signup"}
                        >
                            Sign Up
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </>
    );
}
