"use client"
import React, { useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useForm } from "react-hook-form"
import { codeInput, idCardInput, signUpInputs } from '@/interfaces/auth/signupInputs.types';
import StepOne from './StepOne';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { resetSignUp } from '@/lib/redux/slices/auth/signupSlice'
import { CardHeader, CardTitle } from '@/components/ui/card'
import SignUpHeader from './SignUpHeader'


// Validation
// setp 1 validation 
const stepOneSchema = yup
    .object({
        fullName: yup.string().required("Full Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        rePassword: yup.string().required("RePassword is required").oneOf([yup.ref("password")], "Password must match"),
        phoneNumber: yup.string().required("Phone is required"),
        country: yup.string().required("Country is required"),
    })


// setp 2 validation
const stepTwoSchema = yup.object({
    code: yup.string().required("")
})

// setp 3 validation
const stepThreeSchema = yup.object({
    idCard: yup
        .mixed<FileList>()
        .test("fileRequired", "ID Card is required", (value) => {
            return value && value.length > 0;
        })
        .required(),
});



export default function SignUpForm() {

    

    // Redux
    const { step } = useAppSelector((state) => state.signUpReducer);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(resetSignUp());
    }, [dispatch]);


    // React Hook Form To Handle Inputs
    // Handle Step 1
    const formStepOne = useForm<signUpInputs>(
        {
            resolver: yupResolver(stepOneSchema),
            defaultValues: {
                country: "eg"
            }
        }
    )
    // Handle Step 2
    const formStepTwo = useForm<codeInput>(
        {
            resolver: yupResolver(stepTwoSchema),
        }
    )

    // Handle Step 3
    const formStepThree = useForm<idCardInput>(
        {
            resolver: yupResolver(stepThreeSchema),
        }
    )


    return (
        <>

            <SignUpHeader step={step} />

            {
                step === 1 && <StepOne dispatch={dispatch} formStepOne={formStepOne} />
            }
            {
                step === 2 && <StepTwo dispatch={dispatch} formStepTwo={formStepTwo} />
            }
            {
                step === 3 && <StepThree dispatch={dispatch} formStepThree={formStepThree} />
            }
        </>
    )
}
