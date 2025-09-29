"use client";

import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpInputs } from "@/interfaces/auth/signupInputs.types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetSignUp, setUserInfo } from "@/lib/redux/slices/auth/signupSlice";
import { CardContent, CardFooter } from "@/components/ui/card";
import { showToast } from "nextjs-toast-notify";
import { baseUrl } from "@/server/config";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import ShowError from "../ShowError";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const signupSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password_hash: yup
        .string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z0-9]){2,}).{8,}$/,
            "Password must be at least 8 characters, include uppercase, lowercase, 2 numbers, and 2 special characters"
        ),
    fullname: yup.string().required("Full Name is required"),
    phone: yup.string().required("Phone is required"),
});

async function registerData(userData: signUpInputs) {
    const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    const finalResp = await res.json();

    if (!res.ok) {
        throw new Error(
            Array.isArray(finalResp.message)
                ? finalResp.message.join(", ")
                : finalResp.message || "Something went wrong"
        );
    }
    return finalResp;
}

async function verifyEmail(email: { email: string }) {
    const res = await fetch(`${baseUrl}/auth/email-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
    });
    const finalResp = await res.json();

    if (!res.ok) {
        throw new Error(
            Array.isArray(finalResp.message)
                ? finalResp.message.join(", ")
                : finalResp.message || "Something went wrong"
        );
    }
    return finalResp;
}

export default function SignUpForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(resetSignUp());
    }, [dispatch]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<signUpInputs>({
        resolver: yupResolver(signupSchema),
    });

    // Mutation for register
    const registerMutation = useMutation({
        mutationFn: registerData,
        onSuccess: async (data, variables) => {
            showToast.success(data.message, { duration: 5000, position: "top-center" });
            // Verify Email
            try {
                const verifyRes = await verifyEmail({ email: variables.email });
                showToast.success(verifyRes.message, {
                    duration: 5000,
                    position: "top-center",
                });

                dispatch(setUserInfo(variables));
                reset();
                router.push("/email-verify");
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Failed to sign up";
                showToast.error(message || "Failed to send verification email", {
                    duration: 5000,
                    position: "top-center",
                });
            }
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Failed to sign up";
            showToast.error(message || "Failed to sign up", {
                duration: 5000,
                position: "top-center",
            });
        },
    });

    const onSubmit: SubmitHandler<signUpInputs> = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    {/* Full Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input {...register("fullname")} id="fullName" placeholder="Your name" />
                        <ShowError error={errors.fullname} />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} id="email" type="email" placeholder="m@example.com" />
                        <ShowError error={errors.email} />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password_hash")} id="password" type="password" />
                        <ShowError error={errors.password_hash} />
                    </div>

                    {/* Phone */}
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input {...register("phone")} id="phone" type="tel" placeholder="Phone" />
                        <ShowError error={errors.phone} />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 py-4">
                <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900 disabled:opacity-50"
                >
                    {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
            </CardFooter>
        </form>
    );
}
