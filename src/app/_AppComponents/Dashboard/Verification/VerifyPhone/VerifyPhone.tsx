"use client"
import React from 'react'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from '@/lib/redux/hooks'
import { otpInputType, phoneInputType } from '@/interfaces/verification/verifications.types'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import PhoneStepOne from './PhoneStepOne'
import PhoneStepTwo from './PhoneStepTwo'

// Validation

// Step One
const phoneSchema = yup
    .object({
        phone: yup.string().required("Phone is required"),
    })
    .required()

// Step Two
const otpSchema = yup
    .object({
        otp: yup.string().required("OTP Code is required").matches(/^[0-9]{6}$/, "Code must be 6 digits"),
    })
    .required()



export default function VerifyPhone() {
    // const [phoneVerified, setPhoneVerified] = useState(false);
    const { phoneStep } = useAppSelector((state) => state.verificationReducer)


    // React Hook Form To Handle Inputs
    // Step One
    const phoneForm = useForm<phoneInputType>(
        { resolver: yupResolver(phoneSchema), }
    )

    // Step Two
    const otpForm = useForm<otpInputType>(
        { resolver: yupResolver(otpSchema), }
    )


    return (
        <>
            <Card className="shadow-md">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Phone Verification</CardTitle>
                </CardHeader>

                {
                    phoneStep === 1 && <PhoneStepOne phoneForm={phoneForm} />
                }
                {
                    phoneStep === 2 && <PhoneStepTwo otpForm={otpForm} />
                }



            </Card>
        </>
    )
}
