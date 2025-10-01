"use client"

import { CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {  setNewPasswordType } from '@/interfaces/auth/resetPassword.types'
import SetNewPassword from './SetNewPassword'


// Validation

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
                <Suspense fallback={<div>Loading...</div>}>
                    <SetNewPassword setNewPasswordForm={setNewPasswordForm} />
                </Suspense>
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
