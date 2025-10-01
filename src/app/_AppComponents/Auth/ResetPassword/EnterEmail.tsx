import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import ShowError from '../ShowError'
import { Button } from '@/components/ui/button'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enterEmailType } from '@/interfaces/auth/resetPassword.types'
import { useMutation } from '@tanstack/react-query'
import { showToast } from 'nextjs-toast-notify'
import { baseUrl } from '@/server/config'
import Link from 'next/link'

type EnterEmailPropsType = {
    enterEmailForm: UseFormReturn<enterEmailType>;
}

type succesFinalRespType = {
    message?: string;
}

async function sendEmail(body: { email: string }) {
    const res = await fetch(`${baseUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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

    return finalResp as succesFinalRespType;
}

export default function EnterEmail({ enterEmailForm }: EnterEmailPropsType) {
    const { register, handleSubmit, formState: { errors }, reset } = enterEmailForm;

    const [timer, setTimer] = useState<number>(0);

    const sendEmailMutation = useMutation({
        mutationFn: sendEmail,
        retry: false,
        onSuccess: (data) => {

            if (!data) {
                showToast.error("Email is Not Valid", { duration: 5000, position: "top-center" });
                return
            }

            showToast.success(data.message || "Email Verification Successfully ✅", {
                duration: 3000,
                position: "top-center",
            });
            reset();
            setTimer(60);
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Invalid Email";
            showToast.error(message, { duration: 5000, position: "top-center" });
        },
    });

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const onSubmit: SubmitHandler<enterEmailType> = ({ email }) => {
        sendEmailMutation.mutate({ email });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label className="text-blue-950" htmlFor="email">Enter Your Email</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                        />
                        {sendEmailMutation.isSuccess && (
                            <div className='flex py-3 items-center gap-2'>
                                <p className='text-sm'>
                                    {sendEmailMutation.data?.message}
                                </p>
                                {timer > 0 && (
                                    <span className="text-sm text-gray-600">
                                        Resend again after {timer}s
                                    </span>
                                )}
                            </div>
                        )}
                        {sendEmailMutation.isError && (
                            <div className='flex py-3 items-center gap-2'>
                                <p className='text-sm text-center text-red-500 font-semibold'>
                                    Make Sure You Entered A valid Email Or
                                    <Link className='inline-block text-blue-950 underline ' href={"/email-verify"}>Verify Your Email</Link>
                                    {/* {sendEmailMutation.data?.message} */}
                                </p>
                            </div>
                        )}
                        <ShowError error={errors.email} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button
                    type="submit"
                    disabled={sendEmailMutation.isPending || timer > 0}
                    className="w-full cursor-pointer bg-blue-950 transition-all duration-300 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {sendEmailMutation.isPending ? "Sending..." : "Reset"}
                </Button>
            </CardFooter>
        </form>
    );
}
