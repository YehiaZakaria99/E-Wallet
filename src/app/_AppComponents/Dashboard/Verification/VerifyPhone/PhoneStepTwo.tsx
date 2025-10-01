import ShowError from '@/app/_AppComponents/Auth/ShowError'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { otpInputType } from '@/interfaces/verification/verifications.types'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setIsPhoneVerified} from '@/lib/redux/slices/verification/verificationSlice'
import { baseUrl } from '@/server/config'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { showToast } from 'nextjs-toast-notify'
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

type PhoneStepTwoPropsType = {
    otpForm: UseFormReturn<otpInputType>
}

export default function PhoneStepTwo({ otpForm }: PhoneStepTwoPropsType) {
    const dispatch = useAppDispatch();
    const { phone } = useAppSelector((state) => state.verificationReducer)

    async function sendOtp(otpCode: otpInputType) {
        const body = {
            phone,
            ...otpCode
        };

        const res = await fetch(`${baseUrl}/auth/verify-phone`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        let finalResp;
        try {
            finalResp = await res.json();
        } catch {
            throw new Error("Verification failed");
        }

        if (!res.ok) {
            throw new Error(
                Array.isArray(finalResp.message)
                    ? finalResp.message.join(", ")
                    : finalResp.message || "Something went wrong"
            );
        }
        return finalResp;
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = otpForm;

    const otpMutation = useMutation({
        mutationFn: sendOtp,
        onSuccess: (data) => {
            showToast.success(data.message || "Phone Verified Successfully ✅", {
                duration: 3000,
                position: "top-center",
            });
            dispatch(setIsPhoneVerified(true));
            reset();
            redirect("/dashboard");
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Verification failed";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    })

    const onSubmit: SubmitHandler<otpInputType> =
        async (data) => {
            otpMutation.mutate({ otp: data.otp });
        }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-stone-900" htmlFor="otp">
                            Enter OTP Code Sent to your phone
                        </Label>
                        <Input
                            {...register("otp")}
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit code"
                        />
                        <ShowError error={errors.otp} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                    disabled={otpMutation.isPending}
                >
                    {otpMutation.isPending ? "Verifying..." : "Verify"}
                </Button>
            </CardFooter>
        </form>
    )
}
