import ShowError from '@/app/_AppComponents/Auth/ShowError'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useVerifyPhone } from '@/hooks/useVerifyPhone'
import { phoneInputType } from '@/interfaces/verification/verifications.types'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setPhone, setPhoneStep } from '@/lib/redux/slices/verification/verificationSlice'
import { baseUrl } from '@/server/config'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { showToast } from 'nextjs-toast-notify'
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

type PhoneStepOnePropsType = {
    phoneForm: UseFormReturn<phoneInputType>
}

// API


export default function PhoneStepOne({ phoneForm }: PhoneStepOnePropsType) {
    const dispatch = useAppDispatch();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = phoneForm;

    const {phoneMutation} = useVerifyPhone();

    const onSubmit: SubmitHandler<phoneInputType> =
        async (data) => {
            phoneMutation.mutate({ phone: data.phone });
        }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-stone-900" htmlFor="phone">
                            Phone
                        </Label>
                        <Input
                            {...register("phone")}
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                        />
                        <ShowError error={errors.phone} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                    disabled={phoneMutation.isPending}
                >
                    {phoneMutation.isPending ? "Verifying Phone..." : "Verify Phone"}
                </Button>
            </CardFooter>
        </form>
    )
}
