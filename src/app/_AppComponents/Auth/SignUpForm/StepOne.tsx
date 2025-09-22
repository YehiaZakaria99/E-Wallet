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
import { showToast } from 'nextjs-toast-notify'


type StepOnePropsType = {
    formStepOne: UseFormReturn<signUpInputs, signUpInputs>;
    dispatch: AppDispatch;
}
export default function StepOne({ formStepOne, dispatch }: StepOnePropsType) {

    const { register, formState: { errors }, control, handleSubmit, reset } = formStepOne;


    // type UserResponse = {
    //     message?: string;
    //     // error?: string;
    // };


    async function sendStepOneData(userData: signUpInputs): Promise<boolean> {

        // http://fintech-alb-1517668020.us-east-1.elb.amazonaws.com
        try {
            const res = await fetch(`http://fintech-alb-1517668020.us-east-1.elb.amazonaws.com/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const finalResp = await res.json();

            if (!res.ok) {
                finalResp.message?.map((msg: string) => {
                    showToast.error(msg, {
                        duration: 10000,
                        progress: true,
                        position: "top-center",
                        transition: "topBounce",
                        icon: "",
                        sound: true,
                    });
                });
                return false;
            }

            showToast.success(finalResp.message, {
                duration: 10000,
                progress: true,
                position: "top-center",
                transition: "topBounce",
                icon: "",
                sound: true,
            });

            console.log(finalResp.message);

            return true;
        } catch (error) {
            showToast.error("Failed to sign up", {
                duration: 10000,
                progress: true,
                position: "top-center",
                transition: "topBounce",
                icon: "",
                sound: true,
            });
            return false;
        }
    }

    const onSubmit: SubmitHandler<signUpInputs> = async (data) => {
        const success = await sendStepOneData(data);
        if (success) {
            dispatch(setUserInfo(data));
            dispatch(setStep(2));
            reset();
        }
        else {
            console.log("error");
        }
    };



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
                                {...register('fullname')}
                                id="fullName"
                                type="text"
                                placeholder="your name"

                            />
                            <ShowError error={errors.fullname} />
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
                                {...register('password_hash')}
                                id="password"
                                type="password"
                            />
                            <ShowError error={errors.password_hash} />
                        </div>
                        {/* <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="rePassword">
                                RePassword
                            </Label>
                            <Input
                                {...register('rePassword')}
                                id="rePassword"
                                type="password"
                            />
                            <ShowError error={errors.rePassword} />
                        </div> */}
                        <div className="grid gap-2">
                            <Label className="text-stone-900" htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                {...register('phone')}
                                id="phone"
                                placeholder="phone"
                                type="tel"
                            />
                            <ShowError error={errors.phone} />
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
                        className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                    >
                        Next
                    </Button>
                </CardFooter>
            </form>

        </>
    )
}
