"use client"
import { Button } from '@/components/ui/button'
import { CardAction, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { verifyCodeInputs } from '@/interfaces/auth/verifycode.types'
import SetNewPassword from './SetNewPassword'
import ShowError from './ShowError'
import { useRouter } from 'next/router'


// Validation
const schema = yup
    .object({
        code: yup.string().required("Code is required"),
    })
    .required()


type VerifyCodePropsType = {
    setEmailSent: Dispatch<SetStateAction<boolean>>
}

export default function VerifyCode({ setEmailSent }: VerifyCodePropsType) {
    const [codeSent, setCodeSent] = useState<boolean>(false);


    // React Hook Form To Handle Inputs
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<verifyCodeInputs>(
        { resolver: yupResolver(schema), }
    )
    const onSubmit: SubmitHandler<verifyCodeInputs> =
        (data) => {
            console.log(data)
            setCodeSent(true);
            reset();

        }

    return (
        <>
            {
                !codeSent &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label className="text-stone-900" htmlFor="code">
                                    Code
                                </Label>
                                <Input
                                    {...register("code")}
                                    id="code"
                                    type="text"
                                    placeholder=""
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
                            Submit
                        </Button>
                    </CardFooter>

                </form>
            }

            {
                codeSent &&
                <SetNewPassword />
            }
        </>
    )
}
