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
import { showToast } from "nextjs-toast-notify";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUserToken } from "@/lib/redux/slices/auth/signinSlice";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/server/config";
import { useMutation } from "@tanstack/react-query";

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

type errFinalRespType = {
    message: string;
    error: string;
    statusCode: number;
};

type successFinalRespType = {
    mfaRequired: boolean;
    accessToken: string;
    refreshToken: string;
};

// API Function
async function login(userData: signInInputs) {
    const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    let finalResp: any;

    try {
        finalResp = await res.json();
    } catch {
        throw new Error("Login failed");
    }

    if (!res.ok) {
        const { error, message, statusCode }: errFinalRespType = finalResp || {};
        throw new Error(
            statusCode === 403 && error === "Forbidden"
                ? message
                : "Invalid Email or Password"
        );
    }

    return finalResp as successFinalRespType;
}


export default function SignInForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<signInInputs>({ resolver: yupResolver(schema) });

    // Mutation
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const { accessToken } = data;
            dispatch(setUserToken(accessToken));
            reset();
            router.replace("/dashboard");
        },
        onError: (error: unknown) => {
            console.log(error);
            const message =
                error instanceof Error ? error.message : "Something went wrong";
            showToast.error(message, {
                duration: 5000,
                position: "top-center",
            });
        },
    });

    const onSubmit: SubmitHandler<signInInputs> = (data) => {
        loginMutation.mutate(data);
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

                    {loginMutation.error instanceof Error
                        ? loginMutation.error.message !== "Invalid Email or Password" &&
                        <Link
                            href="/email-verify"
                            className="text-blue-950 hover:underline hover:underline-offset-4 transition-all duration-300"
                        >
                            Verify here
                        </Link>
                        : ""
                    }
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
                                    href="reset-password"
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
