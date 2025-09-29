'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { codeInput } from '@/interfaces/auth/verifyEmailInput.types'
import { useAppDispatch } from '@/lib/redux/hooks'
import StepTwo from './VerifyEmail/StepTwo'

const stepTwoSchema = yup
    .object({
        code: yup.string().required("Code is required").matches(/^[0-9]{6}$/, "Code must be 6 digits"),
    }).required();

export default function VerifyEmailForm() {

    const dispatch = useAppDispatch()


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
