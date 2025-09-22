import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import ShowError from '../ShowError'
import { Control, Controller, FieldErrors, SubmitHandler, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { CountrySelect } from '../../CountrySelect/CountrySelect'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { codeInput, signUpInputs } from '@/interfaces/auth/signupInputs.types'
import { AppDispatch } from '@/lib/redux/store'
import { setCode, setStep, setUserInfo } from '@/lib/redux/slices/auth/signupSlice'


type StepTwoPropsType = {
    formStepTwo: UseFormReturn<codeInput, codeInput>;
    dispatch: AppDispatch;
}
export default function StepTwo({ formStepTwo, dispatch }: StepTwoPropsType) {

    const { register, formState: { errors }, handleSubmit, reset } = formStepTwo;

    const onSubmit: SubmitHandler<codeInput> = (code) => {
        console.log(code);
        dispatch(setCode(code));
        dispatch(setStep(3));
        reset();
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-stone-900 text-center" htmlFor="signupCode">
                                Please, enter code Sent to your Email
                            </Label>
                            <Input
                                {...register('code')}
                                id="signupCode"
                                type="text"
                                placeholder="Enter Code"

                            />
                            <ShowError error={errors.code} />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2 py-4">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
                    >
                        Next
                    </Button>
                </CardFooter>
            </form>

        </>
    )
}
