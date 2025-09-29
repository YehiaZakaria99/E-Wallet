'use client'

import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { codeInput, verifyEmailInput } from '@/interfaces/auth/verifyEmailInput.types'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import ShowError from './ShowError'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import StepOne from './VerifyEmail/StepOne'
import StepTwo from './VerifyEmail/StepTwo'

// Step One Validation
// const stepOneSchema = yup
//     .object({
//         email: yup.string().required("Email is required"),
//     }).required();
// Step Two Validation
const stepTwoSchema = yup
    .object({
        code: yup.string().required("Code is required").matches(/^[0-9]{6}$/, "Code must be 6 digits"),
    }).required();

export default function VerifyEmailForm() {

    const dispatch = useAppDispatch()

    // const { step } = useAppSelector((state) => state.signUpReducer)


    // React Hook Form To Handle Inputs
    // Handle Step One Input
    // const formStepOne = useForm<verifyEmailInput>(
    //     { resolver: yupResolver(stepOneSchema), }
    // )
    
    // Handle Step Two Input
    const formStepTwo = useForm<codeInput>(
        { resolver: yupResolver(stepTwoSchema), }
    )

    return (
        <>
            {
                <StepTwo dispatch={dispatch} formStepTwo={formStepTwo} />
            }
        </>
    )
}
