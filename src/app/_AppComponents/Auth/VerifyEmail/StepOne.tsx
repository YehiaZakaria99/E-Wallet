import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import ShowError from '../ShowError'
import { Control, Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { CountrySelect } from '../../CountrySelect/CountrySelect'
import { Button } from '@/components/ui/button'
import { signUpInputs } from '@/interfaces/auth/signupInputs.types'
import { AppDispatch } from '@/lib/redux/store'
import { setStep, setUserInfo } from '@/lib/redux/slices/auth/signupSlice'
import { showToast } from 'nextjs-toast-notify'
import { baseUrl } from '@/server/config'
import { verifyEmailInput } from '@/interfaces/auth/verifyEmailInput.types'

type emailBodyType = {
    email: string
}

type StepOnePropsType = {
    formStepOne: UseFormReturn<verifyEmailInput>;
    dispatch: AppDispatch;
}

export default function StepOne({ formStepOne, dispatch }: StepOnePropsType) {
    const { register, formState: { errors }, control, handleSubmit } = formStepOne;
    /* 
        async function registerData(userData: signUpInputs): Promise<boolean> {
            try {
                const res = await fetch(`${baseUrl}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                })
    
                const finalResp = await res.json()
                const ok = await handleErrorResponse(res, finalResp)
                if (!ok) return false
    
                showToast.success(finalResp.message, { duration: 5000, position: "top-center" })
                return true
            } catch (error) {
                showToast.error("Failed to sign up", { duration: 5000, position: "top-center" })
                return false
            }
        }
     */

    /*  
    async function verifyEmail(email: emailBodyType): Promise<boolean> {
         try {
             const res = await fetch(`${baseUrl}/auth/email-verify`, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(email),
             })
 
             const finalResp = await res.json()
             const ok = await handleErrorResponse(res, finalResp)
             if (!ok) return false
             showToast.success(finalResp.message, { duration: 5000, position: "top-center" })
             return true
         } catch (error) {
             showToast.error("Failed to send verification email", { duration: 5000, position: "top-center" })
             return false
         }
     }
  */

    const onSubmit: SubmitHandler<verifyEmailInput> = async (data) => {
        // const successRegisterData = await registerData(data)
        // if (!successRegisterData) return

        // const sendVerification = await verifyEmail({ email: data.email })
        // if (!sendVerification) return

        // dispatch(setUserInfo())
        dispatch(setStep(2))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-stone-900" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                        />
                        <ShowError error={errors.email} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 py-4 ">
                <Button
                    type="submit"
                    className="w-full cursor-pointer  bg-blue-950 transition-all duration-300 hover:bg-blue-900"
                >
                    Verify
                </Button>
            </CardFooter>
        </form>
    )
}
