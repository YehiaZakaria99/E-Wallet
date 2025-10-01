"use client"

import { CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { enterEmailType, setNewPasswordType } from '@/interfaces/auth/resetPassword.types'
import EnterEmail from './EnterEmail'
import SetNewPassword from './SetNewPassword'
import { useRouter, useSearchParams } from 'next/navigation'


// Validation

const enterEmailSchema = yup
    .object({
        email: yup.string().required("Email is required"),
    })
    .required()

// Step Two
const setNewPasswordSchema = yup
    .object({
        newPassword: yup.string().required("Password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z0-9]){2,}).{8,}$/,
            "Password must be at least 8 characters, include uppercase, lowercase, 2 numbers, and 2 special characters"
        ),
    })
    .required()



export default function ResetPasswordForm() {
    const router = useRouter();


    // const [step, setStep] = useState<number>(1);

    // React Hook Form To Handle Inputs


    // Step Two
    const setNewPasswordForm = useForm<setNewPasswordType>(
        { resolver: yupResolver(setNewPasswordSchema), }
    )

    return (
        <>
            <CardHeader>
                <CardTitle className="text-blue-950 text-center">
                    Reset Password
                </CardTitle>
            </CardHeader>
            {/* Step Two */}
            {/* Set New Password */}

            {
                <SetNewPassword setNewPasswordForm={setNewPasswordForm} />
            }

            <CardAction className="py-3 px-4">
                <Link
                    className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                    href={"/login"}
                >
                    Return to Login
                </Link>
            </CardAction>
        </>
    )
}
