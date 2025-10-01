"use client"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { enterEmailType } from '@/interfaces/auth/resetPassword.types'
import EnterEmail from './EnterEmail'
import { CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'


// Validation
// Step One

const enterEmailSchema = yup
    .object({
        email: yup.string().required("Email is required"),
    })
    .required()



export default function ForgotPasswordForm() {
    // React Hook Form To Handle Inputs

    // Step One
    const enterEmailForm = useForm<enterEmailType>(
        { resolver: yupResolver(enterEmailSchema), }
    )


    return (
        <>
            <CardHeader>
                <CardTitle className="text-blue-950 text-center">
                    Forgot Password
                </CardTitle>
            </CardHeader>

            {/* Step One */}
            {/* Enter Email */}

            {
                <EnterEmail enterEmailForm={enterEmailForm} />
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
