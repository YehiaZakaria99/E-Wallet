import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import ShowError from '../ShowError'
import { Control, Controller, FieldErrors, SubmitHandler, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { CountrySelect } from '../../CountrySelect/CountrySelect'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signUpInputs } from '@/interfaces/auth/signupInputs.types'
import { AppDispatch } from '@/lib/redux/store'
import { setStep, setUserInfo } from '@/lib/redux/slices/auth/signupSlice'


type StepOnePropsType = {
    formStepOne: UseFormReturn<signUpInputs, any, signUpInputs>;
    dispatch: AppDispatch;
}
export default function StepOne({ formStepOne, dispatch }: StepOnePropsType) {

    const { register, formState: { errors }, control, handleSubmit, reset } = formStepOne;

    const onSubmit: SubmitHandler<signUpInputs> = (data) => {
        console.log(data);
        dispatch(setUserInfo(data));
        dispatch(setStep(2));
        reset();
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="fullName">
                                Full Name
                            </Label>
                            <Input
                                {...register('fullName')}
                                id="fullName"
                                type="text"
                                placeholder="your name"

                            />
                            <ShowError error={errors.fullName} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register('email')}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                            />
                            <ShowError error={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                            />
                            <ShowError error={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="rePassword">
                                RePassword
                            </Label>
                            <Input
                                {...register('rePassword')}
                                id="rePassword"
                                type="password"
                            />
                            <ShowError error={errors.rePassword} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                {...register('phoneNumber')}
                                id="phone"
                                placeholder="phone"
                                type="tel"
                            />
                            <ShowError error={errors.phoneNumber} />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="phone">
                                Select Country
                            </Label>
                            <Controller
                                name="country"
                                control={control}
                                render={
                                    ({ field }) => (
                                        <CountrySelect
                                            field={{ ...field }}
                                            // value={country}
                                            // onChange={setCountry}
                                            placeholder="Select country"
                                            showFlagsInList={true}
                                        />
                                    )
                                }
                            />
                            <ShowError error={errors.country} />
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
