"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useAppSelector } from '@/lib/redux/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { phoneInputType } from '@/interfaces/verification/verifications.types'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { Label } from '@radix-ui/react-label'
import ShowError from '../../../Auth/ShowError'
import PhoneStepOne from './PhoneStepOne'


// type VerifyPhonePropsType = {
//     phoneVerified: boolean;
//     setPhoneVerified: React.Dispatch<React.SetStateAction<boolean>>;
// }


// Validation

// Step One
const phoneSchema = yup
    .object({
        phone: yup.string().required("Phone is required"),
    })
    .required()

// Step Two



export default function VerifyPhone() {
    // const [phoneVerified, setPhoneVerified] = useState(false);
    const { phoneStep } = useAppSelector((state) => state.verificationReducer)
    

    // React Hook Form To Handle Inputs
    // Step One
    const phoneForm = useForm<phoneInputType>(
        { resolver: yupResolver(phoneSchema), }
    )

    // Step Two


    return (
        <>
            <Card className="shadow-md">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Phone Verification</CardTitle>
                </CardHeader>

                {
                    phoneStep === 1 && <PhoneStepOne phoneForm={phoneForm} />
                }



            </Card>
        </>
    )
}
