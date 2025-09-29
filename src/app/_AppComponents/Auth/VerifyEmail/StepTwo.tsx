import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import ShowError from '../ShowError'
import { Control, Controller, FieldErrors, SubmitHandler, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { CountrySelect } from '../../CountrySelect/CountrySelect'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signUpInputs } from '@/interfaces/auth/signupInputs.types'
import { AppDispatch } from '@/lib/redux/store'
import { setStep, setUserInfo } from '@/lib/redux/slices/auth/signupSlice'
import { showToast } from 'nextjs-toast-notify'
import { baseUrl } from '@/server/config'
import { useAppSelector } from '@/lib/redux/hooks'
import { codeInput } from '@/interfaces/auth/verifyEmailInput.types'
import { useRouter } from 'next/navigation'


// type codeBodyType = {
//     code: string
// }

type StepTwoPropsType = {
    formStepTwo: UseFormReturn<codeInput>;
    dispatch: AppDispatch;
}
export default function StepTwo({ formStepTwo, dispatch }: StepTwoPropsType) {

    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = formStepTwo;

    // /auth/verify-email
    // async function handleErrorResponse(res: Response, finalResp: any): Promise<boolean> {
    //     if (!res.ok) {
    //         if (Array.isArray(finalResp.message)) {
    //             finalResp.message.forEach((msg: string) =>
    //                 showToast.error(msg, { duration: 5000, position: "top-center" })
    //             )
    //         } else {
    //             showToast.error(finalResp.message || "Something went wrong", {
    //                 duration: 5000,
    //                 position: "top-center",
    //             })
    //         }
    //         return false
    //     }
    //     return true
    // }



    async function sendCode(code: codeInput) {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/auth/verify-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(code),
            });

            const finalResp = await res.json();

            if (!res.ok) {
                showToast.error(finalResp.message || "Something went wrong", {
                    duration: 5000,
                    position: "top-center",
                });
                return false;
            }

            showToast.success(finalResp.message, { duration: 5000, position: "top-center" });
            return true;
        } catch (error) {
            showToast.error("Failed to send code", { duration: 5000, position: "top-center" });
            return false;
        } finally {
            setLoading(false);
        }
    }

    // Router 
    const router = useRouter()



    const onSubmit: SubmitHandler<codeInput> = async (code) => {
        // console.log(code);
        const successSendCode = await sendCode(code);
        if (!successSendCode) return;

        router.push("/login");
        // console.log(successSendCode);
        // dispatch(setCode(code));
        // dispatch(setStep(3));
        reset();
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label className="text-blue-950 text-center py-3" htmlFor="signupCode">
                                Please, enter code sent to your Email
                            </Label>
                            <Input
                                {...register("code", {
                                })}
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
                        disabled={loading}
                        className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-stone-700 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Code"}
                    </Button>
                </CardFooter>
            </form>


        </>
    )
}
